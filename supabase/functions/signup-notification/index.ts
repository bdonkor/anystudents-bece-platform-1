import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0"

// --- Environment Variables ---
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!
const MAILCHIMP_API_KEY = Deno.env.get("MAILCHIMP_API_KEY") // Optional if not set yet
const MAILCHIMP_LIST_ID = Deno.env.get("MAILCHIMP_LIST_ID")
const MAILCHIMP_SERVER = Deno.env.get("MAILCHIMP_SERVER") // e.g. 'us1'

// Add as many email addresses as you'd like to this list
const ADMIN_EMAILS = [
  "calebendk@gmail.com",
]

serve(async (req) => {
  try {
    const { record } = await req.json()
    
    // Extract info from the new profile record
    const { full_name, email, role, level, program } = record

    // --- 1. SEND ADMIN NOTIFICATION (RESEND) ---
    const emailHtml = `
      <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; color: #334155;">
        <div style="background-color: #0f172a; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: #f5b400; margin: 0; font-size: 20px;">New Lead Alert! 🚀</h1>
        </div>
        
        <div style="padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
          <p style="font-size: 16px; line-height: 1.5;">Hello Admin,</p>
          <p style="font-size: 16px; line-height: 1.5;">A new user just joined the AnyStudents platform:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; width: 30%;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">${full_name || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Role:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; text-transform: capitalize;">${role || 'Student'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Level:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; text-transform: uppercase;">${level || 'JHS'}</td>
            </tr>
            ${program ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Program:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">${program}</td>
            </tr>
            ` : ''}
          </table>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://mockexams.anystudents.com/admin" style="background-color: #f5b400; color: #0f172a; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">View in Admin Dashboard</a>
          </div>
        </div>
        
        <p style="text-align: center; font-size: 12px; color: #94a3b8; margin-top: 20px;">
          AnyStudents Platform Automation
        </p>
      </div>
    `

    // Fire off the Resend email
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'AnyStudents Alerts <onboarding@resend.dev>',
        to: ADMIN_EMAILS,
        subject: `New Lead: ${full_name || email} joined AnyStudents! 🎓`,
        html: emailHtml
      })
    })

    // --- 2. SYNC TO MAILCHIMP (IF CONFIGURED) ---
    if (MAILCHIMP_API_KEY && MAILCHIMP_LIST_ID && MAILCHIMP_SERVER) {
      try {
        // Split name for Mailchimp
        const nameParts = (full_name || '').split(' ')
        const firstName = nameParts[0] || ''
        const lastName = nameParts.slice(1).join(' ') || ''

        const mailchimpData = {
          email_address: email,
          status: 'subscribed',
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
            LEVEL: (level || 'JHS').toUpperCase(),
            PROGRAM: program || 'N/A'
          },
          // Adding a tag helps with automation triggers
          tags: ['Platform Signup', (level || 'JHS').toUpperCase()]
        }

        // Basic Auth for Mailchimp: 'any-string:api-key' encoded in Base64
        const auth = btoa(`user:${MAILCHIMP_API_KEY}`)

        const mcRes = await fetch(
          `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Basic ${auth}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(mailchimpData)
          }
        )

        const mcResult = await mcRes.json()
        console.log('Mailchimp sync result:', mcResult.status === 'subscribed' ? 'Success' : mcResult.title || 'Unknown')
      } catch (mcError) {
        console.error('Mailchimp Sync failed:', mcError.message)
      }
    }

    return new Response(JSON.stringify({ success: true }), { 
      status: 200, 
      headers: { "Content-Type": "application/json" } 
    })

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 400, 
      headers: { "Content-Type": "application/json" } 
    })
  }
})

