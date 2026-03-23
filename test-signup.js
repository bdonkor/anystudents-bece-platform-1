const supabaseUrl = 'https://wtvdkmtmjevcimmpjcmg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0dmRrbXRtamV2Y2ltbXBqY21nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyMjg3MzYsImV4cCI6MjA4ODgwNDczNn0.Tl6KWb7iMCCFj0-aF9MraluxwyHSV08ZFxpKF21rTyY';

async function testSignup() {
  console.log('Testing signup process... creating a new fake account.');
  const uniqueEmail = `ai.bot.${Math.floor(Math.random() * 10000)}@anystudents.test.com`;
  
  const res = await fetch(`${supabaseUrl}/auth/v1/signup`, {
    method: 'POST',
    headers: {
      'apikey': supabaseKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: uniqueEmail,
      password: 'Password123!',
      data: {
        full_name: 'Robot Tester (AI Bot)',
        role: 'student',
        level: 'shs',
        program: 'Science'
      }
    })
  });

  const rawText = await res.text();
  if (!res.ok) {
    console.error('Signup failed:', rawText);
  } else {
    console.log('✅ Signup successful! Response received.');
    console.log('Data:', rawText);
  }
}

testSignup();
