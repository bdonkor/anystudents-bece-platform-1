import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { reference, userId } = await req.json()

    if (!reference || !userId) {
      throw new Error('Missing reference or userId')
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const paystackSecret = Deno.env.get('PAYSTACK_SECRET_KEY')!

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // 1. Verify with Paystack
    console.log(`Verifying payment: ${reference}`)
    const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: {
        Authorization: `Bearer ${paystackSecret}`,
      },
    })

    const paystackData = await paystackRes.json()

    if (!paystackData.status || paystackData.data.status !== 'success') {
      console.error('Paystack verification failed:', paystackData)
      return new Response(JSON.stringify({ error: 'Payment verification failed at Paystack' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    const amountInGHS = paystackData.data.amount / 100
    const customerEmail = paystackData.data.customer.email

    // 2. Check if this reference has already been processed to prevent duplicates
    const { data: existingPayment } = await supabase
      .from('payments')
      .select('id')
      .eq('paystack_reference', reference)
      .maybeSingle()

    if (existingPayment) {
      return new Response(JSON.stringify({ success: true, message: 'Already processed' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    // 3. Record the payment in our database
    const { error: paymentErr } = await supabase
      .from('payments')
      .insert({
        user_id: userId,
        paystack_reference: reference,
        amount: amountInGHS,
        status: 'success',
        currency: 'GHS'
      })

    if (paymentErr) throw paymentErr

    // 4. Activate the subscription for 30 days
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 30)

    const { error: profileErr } = await supabase
      .from('profiles')
      .update({
        subscription_status: 'active',
        subscription_expiry: expiryDate.toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)

    if (profileErr) throw profileErr

    console.log(`Successfully activated subscription for user: ${userId}`)

    return new Response(JSON.stringify({ success: true, amount: amountInGHS }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Server error:', error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
