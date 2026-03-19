import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0"

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!

// Add as many email addresses as you'd like to this list
const ADMIN_EMAILS = [
  "calebendk@gmail.com",
  // "another-email@example.com", 
]

serve(async (req) => {
  try {
    const { record } = await req.json()
    
    // Extract info from the new profile record
    const { full_name, email, role, level, program } = record

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

    const res = await fetch('https://api.resend.com/emails', {
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

    const data = await res.json()
    return new Response(JSON.stringify(data), { 
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
