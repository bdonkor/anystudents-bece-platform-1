# AnyStudents BECE Platform — Complete Setup Guide
# For cPanel hosting at bece.anystudents.com
# ================================================

## WHAT YOU NEED TO SET UP (5 services, all free tiers available)

1. Supabase account (free) — database + auth
2. Anthropic API key — AI exam generation
3. Paystack account — Ghana payments
4. cPanel subdomain — bece.anystudents.com
5. Node.js on your local computer — to build the files

---

## STEP 1 — SET UP SUPABASE (10 minutes)

1. Go to https://supabase.com and create a free account
2. Click "New Project" — name it "anystudents-bece"
3. Choose a region close to Ghana (Europe West is fine)
4. Set a strong database password — save it somewhere
5. Wait 2 minutes for project to start

Then set up the database:
6. In your Supabase project, click "SQL Editor" in the left menu
7. Click "New Query"
8. Copy and paste the entire contents of: supabase/schema.sql
9. Click "Run" — you should see "Success"

Get your API keys:
10. Go to Settings > API in Supabase
11. Copy "Project URL" — this is your VITE_SUPABASE_URL
12. Copy "anon public" key — this is your VITE_SUPABASE_ANON_KEY

Create your admin account:
13. Go to Authentication > Users in Supabase
14. Click "Invite User" — enter your email
15. After registering, go to SQL Editor and run:
    UPDATE profiles SET role = 'admin' WHERE email = 'your@email.com';

---

## STEP 2 — GET ANTHROPIC API KEY (5 minutes)

1. Go to https://console.anthropic.com
2. Create account or log in
3. Go to "API Keys" in left menu
4. Click "Create Key" — name it "bece-platform"
5. Copy the key (starts with sk-ant-...)
6. Add billing — minimum $5 credit to start
   (Each exam generation costs ~$0.02–0.05 with Claude)

---

## STEP 3 — SET UP PAYSTACK (15 minutes)

1. Go to https://paystack.com and register a business account
2. Use your Ghana business details
3. Complete KYC/verification
4. Go to Settings > API Keys
5. Copy your "Public Key" (starts with pk_live_...)
   Use TEST key (pk_test_...) while testing

---

## STEP 4 — CONFIGURE YOUR PROJECT

1. In the project folder, copy .env.example to .env:
   cp .env.example .env

2. Open .env and fill in all values:

   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGc...
   VITE_ANTHROPIC_API_KEY=sk-ant-...
   VITE_PAYSTACK_PUBLIC_KEY=pk_live_...
   VITE_APP_URL=https://bece.anystudents.com

3. IMPORTANT: Never commit .env to git or share it publicly

---

## STEP 5 — BUILD THE PROJECT

You need Node.js installed on your computer.
Download from: https://nodejs.org (choose LTS version)

Then in your terminal/command prompt:

   cd bece-platform
   npm install
   npm run build

This creates a "dist" folder with all the files ready to upload.

---

## STEP 6 — CREATE SUBDOMAIN IN CPANEL (5 minutes)

1. Log into your cPanel (usually yourdomain.com/cpanel)
2. Find "Subdomains" or "Domains"
3. Create subdomain: bece
4. Document root: /public_html/bece (or wherever cPanel suggests)
5. If you have an SSL certificate, add it to the subdomain

---

## STEP 7 — UPLOAD FILES TO CPANEL (5 minutes)

Option A — Using File Manager:
1. In cPanel, open "File Manager"
2. Navigate to /public_html/bece (your subdomain folder)
3. Upload ALL contents of your local "dist" folder
4. The folder should contain: index.html, assets/, .htaccess

Option B — Using FTP (FileZilla):
1. Download FileZilla from https://filezilla-project.org
2. Connect with your cPanel FTP credentials
3. Navigate to /public_html/bece
4. Upload everything from your local "dist" folder

CRITICAL: Make sure .htaccess is included in the upload.
Some FTP clients hide dotfiles — enable "Show hidden files".

---

## STEP 8 — TEST YOUR PLATFORM

Visit: https://bece.anystudents.com

Test these in order:
☐ Homepage loads correctly
☐ Register a new account
☐ Check email and confirm account
☐ Login works
☐ Generate a free exam
☐ Exam displays correctly with 40 questions
☐ Timed mode works
☐ Marking scheme shows
☐ Subscribe page loads
☐ Paystack payment opens (use test card: 4084080840808081)
☐ After payment, subscription activates
☐ Admin login works at /admin

---

## STEP 9 — CONNECT TO ANYSTUDENTS.COM WORDPRESS

Add to your WordPress site homepage or menu:
- Link to https://bece.anystudents.com
- Text: "BECE Mock Exams"

For SEO, also add a WordPress page at:
anystudents.com/bece-mock-exam
With content about your BECE platform and a link to the subdomain.

---

## MONTHLY MAINTENANCE

- Check Supabase usage (free tier: 500MB database, 50,000 users)
- Check Anthropic API billing (auto-charges your card)
- Review suspicious activity in Admin dashboard
- Download payment records from Admin > Revenue

---

## TROUBLESHOOTING

Problem: White screen / 404 on page refresh
Fix: Check that .htaccess uploaded correctly to subdomain root

Problem: "Cannot find module" errors
Fix: Delete node_modules folder, run npm install again, then npm run build

Problem: Exam generation fails
Fix: Check VITE_ANTHROPIC_API_KEY in .env, ensure billing is active

Problem: Payment doesn't activate subscription
Fix: Verify VITE_PAYSTACK_PUBLIC_KEY matches your Paystack dashboard

Problem: Login says "email not confirmed"
Fix: In Supabase > Authentication > Settings, you can disable email confirmation for testing

---

## COSTS ESTIMATE

Supabase: FREE (up to 500MB, 50,000 users)
Anthropic API: ~GH₵0.25–0.50 per exam generated
Paystack: 1.5% + GH₵0.60 per transaction (taken from the GH₵100)
Hosting: Included in your existing cPanel plan

Monthly at 100 paying students:
Revenue: GH₵10,000
API costs: ~GH₵50–100 (200–400 exams)
Paystack fees: ~GH₵210
Net: ~GH₵9,600+
