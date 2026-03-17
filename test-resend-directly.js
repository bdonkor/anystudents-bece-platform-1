// Test Resend API directly to see if emails are being sent
const RESEND_API_KEY = 're_Qw153ZV2_7GXLcQu5DPx4dC9m5Ubk4EBL';

async function testResend() {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'AnyStudents <onboarding@resend.dev>',
        to: ['anystudentsemail@gmail.com'],
        subject: 'Test Email - AnyStudents Weekly Report',
        html: '<h1>Test Email</h1><p>This is a test email to verify Resend is working.</p>'
      })
    });

    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));

    if (response.ok) {
      console.log('\n✅ Email sent successfully!');
      console.log('Email ID:', data.id);
    } else {
      console.log('\n❌ Error sending email:');
      console.log(data);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testResend();
