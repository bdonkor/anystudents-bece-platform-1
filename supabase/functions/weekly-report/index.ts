import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0"

// Configure this Edge Function with your Supabase keys and Resend API Key
const supabaseUrl = Deno.env.get("SUPABASE_URL")!
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
const resendApiKey = Deno.env.get("RESEND_API_KEY")!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

serve(async (req) => {
  try {
    // 1. Get all students who have a guardian_email set and an active subscription
    const { data: profiles, error: profileErr } = await supabase
      .from('profiles')
      .select('id, full_name, guardian_email, subscription_status')
      .not('guardian_email', 'is', null)
      .eq('subscription_status', 'active')

    if (profileErr) throw profileErr
    if (!profiles || profiles.length === 0) {
      return new Response("No active users with guardian emails found.", { status: 200 })
    }

    // 2. Calculate the date 7 days ago
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    const startDateISO = oneWeekAgo.toISOString()

    let emailsSent = 0;

    // 3. Loop through students and calculate their weekly progress
    for (const profile of profiles) {
      if (!profile.guardian_email || !profile.guardian_email.includes('@')) continue;

      const { data: results, error: resultsErr } = await supabase
        .from('exam_results')
        .select('subject, percentage, created_at')
        .eq('student_id', profile.id)
        .gte('created_at', startDateISO)

      if (resultsErr || !results || results.length === 0) {
        // Option: Send an email saying they didn't study this week
        continue;
      }

      // Calculate stats
      const examsTaken = results.length
      const avgScore = Math.round(results.reduce((sum, r) => sum + r.percentage, 0) / examsTaken)
      
      // Find weakest subject
      const subjectScores = {}
      results.forEach(r => {
        if (!subjectScores[r.subject]) subjectScores[r.subject] = { total: 0, count: 0 }
        subjectScores[r.subject].total += r.percentage
        subjectScores[r.subject].count += 1
      })

      let weakestSubject = ''
      let lowestAvg = 101
      Object.entries(subjectScores).forEach(([subject, stats]) => {
        const avg = stats.total / stats.count
        if (avg < lowestAvg) {
          lowestAvg = avg
          weakestSubject = subject
        }
      })

      const studentFirstName = profile.full_name ? profile.full_name.split(' ')[0] : 'Your student'
      weakestSubject = weakestSubject || 'their core subjects'

      // 4. Send the email via Resend
      const emailHtml = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-w: 600px; margin: 0 auto; color: #1e293b; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #0f172a; padding: 30px; text-align: center;">
            <img src="https://mockexams.anystudents.com/images/anystudents-logo-light.png" alt="AnyStudents" style="height: 50px; margin-bottom: 15px;">
            <h1 style="color: #f5b400; font-size: 24px; margin: 0; letter-spacing: 0.025em;">Weekly Progress Report</h1>
          </div>
          
          <div style="padding: 40px 30px;">
            <p style="font-size: 18px; line-height: 1.6; margin-bottom: 25px;">Hello,</p>
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
              Here is the latest update on <strong>${studentFirstName}'s</strong> academic performance on the AnyStudents platform for the past 7 days.
            </p>
            
            <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 30px; border-radius: 12px; margin: 30px 0; border: 1px solid #e2e8f0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding-bottom: 15px;">
                    <span style="font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; font-weight: bold;">Exams Taken</span><br>
                    <span style="font-size: 28px; color: #0f172a; font-weight: bold;">${examsTaken}</span>
                  </td>
                  <td style="padding-bottom: 15px; text-align: right;">
                    <span style="font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; font-weight: bold;">Average Score</span><br>
                    <span style="font-size: 28px; color: #f5b400; font-weight: bold;">${avgScore}%</span>
                  </td>
                </tr>
              </table>
            </div>

            <div style="background-color: #fffbeb; border-left: 4px solid #f5b400; padding: 20px; border-radius: 8px; margin-bottom: 35px;">
              <p style="margin: 0; font-size: 15px; color: #92400e; line-height: 1.6;">
                <strong>Study Recommendation:</strong> Based on this week's data, we suggest ${studentFirstName} focuses more on <strong>${weakestSubject}</strong>. Mastering this subject will significantly boost their overall exam readiness score.
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 40px;">
              <p style="font-size: 15px; color: #64748b; margin-bottom: 30px;">Thank you for your continued support in ${studentFirstName}'s education journey.</p>
              <div style="height: 1px; background-color: #e2e8f0; width: 100%; margin-bottom: 25px;"></div>
              <p style="font-size: 13px; color: #94a3b8; font-style: italic;">
                Sent with ❤️ by the AnyStudents Team<br>
                Empowering JHS & SHS Students in Ghana
              </p>
            </div>
          </div>
        </div>
      `;

      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'AnyStudents Reports <onboarding@resend.dev>',
            to: [profile.guardian_email],
            subject: `${studentFirstName}'s Weekly Progress Report - AnyStudents 📈`,
            html: emailHtml
          })
        });
        emailsSent++;
      } catch (err) {
        console.error(`Failed to send email to ${profile.guardian_email}:`, err);
      }
    }

    return new Response(JSON.stringify({ success: true, emailsSent }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    })
  }
})
