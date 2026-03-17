# AnyStudents BECE Platform - Progress Documentation

## Project Overview

**Project Name:** AnyStudents Mock Exams  
**Purpose:** An online exam preparation platform for Ghanaian students preparing for BECE (JHS) and WASSCE (SHS) national examinations  
**Tech Stack:** React 18, React Router, Tailwind CSS, Supabase (Auth + Database), Recharts  
**API:** Anthropic Claude API (for AI-generated exam questions), Paystack (payments)

---

## App Architecture

### Core Structure

```
src/
├── App.jsx              # Main app with routing and protected routes
├── main.jsx            # Entry point with HelmetProvider
├── index.css           # Global styles, Tailwind, custom components
├── contexts/
│   └── AuthContext.jsx # Authentication state management
├── lib/
│   ├── supabase.js     # Supabase client + database helpers
│   └── examGenerator.js # AI exam generation using Claude API
├── components/
│   ├── Navbar.jsx      # Navigation with auth-aware menu
│   └── Footer.jsx      # Site footer with links
└── pages/
    ├── HomePage.jsx          # Landing page
    ├── LoginPage.jsx         # User login
    ├── RegisterPage.jsx      # User registration
    ├── StudentDashboard.jsx  # Student dashboard (core feature)
    ├── TeacherDashboard.jsx  # Teacher dashboard (multiple exam versions)
    ├── AdminDashboard.jsx    # Admin dashboard (user management)
    ├── ExamPage.jsx         # View/take exam with timer
    ├── PricingPage.jsx      # Subscription/payment page
    ├── PaymentSuccessPage.jsx
    ├── PrivacyPolicyPage.jsx
    ├── TermsOfUsePage.jsx
    ├── RefundPolicyPage.jsx
    ├── DisclaimerPage.jsx
    ├── UserGuidePage.jsx
    └── NotFoundPage.jsx
```

---

## Database Schema (Supabase)

### Tables

1. **profiles** - User profiles
   - id (UUID, FK to auth.users)
   - email, full_name, role (student/teacher/admin)
   - level (jhs/shs), program (for SHS)
   - free_exam_used (boolean)
   - subscription_status (inactive/active/suspended)
   - subscription_expiry (timestamp)
   - exam_count_today, exam_count_reset_date
   - is_suspended

2. **exams** - Generated exam papers
   - id, user_id, subject, level, version
   - exam_content (JSONB - full exam structure)
   - exam_seed (unique identifier)
   - is_validated, score, time_taken, completed_at

3. **exam_results** - Student exam results
   - exam_id, student_id, subject
   - score, total_marks, percentage
   - weak_topics (array)

4. **payments** - Payment records
   - user_id, paystack_reference
   - amount, currency (GHS), status
   - subscription_months

5. **device_sessions** - Device tracking
   - user_id, session_token
   - browser_fingerprint, ip_address, user_agent

6. **suspicious_activity** - Security monitoring
   - user_id, activity_type, details (JSONB)
   - ip_address, resolved

7. **class_assignments** - Teacher class assignments
   - teacher_id, exam_id, class_name
   - assigned_to (array), due_date

---

## Features

### Authentication
- Supabase Auth (email/password)
- Role-based access (student, teacher, admin)
- Protected routes based on role
- Device session tracking (max 2 devices)
- Suspicious activity monitoring

### Student Features
- **Exam Generation:** Generate unique AI-created BECE/WASSCE exams
- **Exam Taking:** Timed mode (2 hours), auto-submit
- **Results & Grading:** Auto-grading with WAEC-style grades
- **Performance Tracking:** Charts, averages, weak topics
- **Exam History:** View past exams
- **Focus Timer:** Pomodoro technique (25min study, 5/15min breaks)
- **Share:** WhatsApp sharing, copy link
- **Guardian Reports:** Email weekly progress to parent/guardian

### Teacher Features
- Generate multiple exam versions (A, B, C) for same subject
- Prevent answer sharing in class
- Exam library/history

### Admin Features
- **Revenue Tracking:** Real-time revenue charts with secure server-side verification Handshake
- **Secure Payments:** Server-side verification via Supabase Edge Functions (prevents URL manipulation fraud)
- **Suspend/Unsuspend Users:** Account control for admins
- Security alerts (suspicious activity)
- Contact users via email

### Exam Generation
- Uses Anthropic Claude API
- 40 multiple choice questions (Section A)
- 5 structured questions (Section B)
- Full marking scheme included
- Topics pulled from Ghanaian curriculum
- Ghana-relevant context (names, currency, towns)
- Unique every time (seed-based)

### Subscriptions
- Free first exam
- GH₵100/month subscription (via Paystack)
- MTN Mobile Money, Vodafone Cash, AirtelTigo Money supported
- 30-day access, no auto-renewal

---

## Subject Coverage

### JHS (BECE) - 10 Subjects
- Mathematics, English Language
- Integrated Science, Social Studies
- ICT, Religious and Moral Education
- Career Technology, Creative Arts
- Ghanaian Language (Asante Twi), French

### SHS (WASSCE) - All Programs

**Core (All Students):**
- Core Mathematics, English Language
- Integrated Science, Social Studies

**Science Program:**
- Elective Mathematics, Physics, Chemistry, Biology

**Business Program:**
- Financial Accounting, Cost Accounting
- Business Management, Economics

**General Arts:**
- Government, Geography, History
- Literature, Christian Religious Studies, Islamic Religious Studies

**Visual Arts:**
- General Knowledge in Art, Graphic Design
- Picture Making, Textiles, Sculpture, Ceramics

**Home Economics:**
- Management in Living, Food and Nutrition
- Clothing and Textiles

**Technical:**
- Technical Drawing, Building Construction
- Metalwork, Woodwork, Applied Electricity

---

## Design System

### Colors
- Brand Dark: `#0f172a` (slate-900)
- Brand: `#1e293b` (slate-800)
- Gold: `#f5b400`
- Cream Background: `#fffdf7`
- Ink: `#1a1a2e`

### Components
- `btn-primary` - Dark brand background, gold text
- `btn-gold` - Gold background, dark text
- `btn-outline` - Bordered, dark text
- `card` - White background, shadow, rounded
- `input-field` - Form inputs
- `badge-active`, `badge-inactive` - Status badges

### Fonts
- Headings: Playfair Display (serif)
- Body: Source Serif 4 (serif)

---

## API Keys Required

```
VITE_SUPABASE_URL=           # Supabase project URL
VITE_SUPABASE_ANON_KEY=      # Supabase anon key
VITE_ANTHROPIC_API_KEY=     # Anthropic Claude API key
VITE_PAYSTACK_PUBLIC_KEY=   # Paystack public key
VITE_APP_URL=               # Platform URL (e.g., https://mockexams.anystudents.com)
VITE_SUBSCRIPTION_AMOUNT=   # Amount in kobo (default: 10000 = GH₵100)
```

---

## Current State

- Initial commit complete
- Full frontend built with React + Tailwind
- Supabase schema ready
- All pages implemented
- Exam generation functional (requires API key)
- WASSCE (SHS) fully integrated into all programs
- Paystack payment flow with automated success banner
- Domain transition to mockexams.anystudents.com complete
- Admin dashboard functional with fixed Exam Logs and premium Revenue Chart
- Secure Server-Side Payment Verification (Edge Functions + Paystack API) fully deployed
- Platform-wide rebranding to 'AnyStudents Mock Exams' complete
- Fixed Exam Logs bug (missing icon import)
- Optimized Home Page testimonials (First names + Cities) and Hero messaging ("Create Mock Exams Anytime")
- High-performance UI with code splitting and SEO optimization for BECE & WASSCE keywords
- Weekly progress reports for guardians/parents (via Resend Edge Function)

---

## Known Limitations / TODO

1. **Live Paystack Key:** Ensure live keys are swapped in for production deployment
2. **Email System:** Transitioned from mailto to Resend API for automated reports; further transactional emails can be added
3. **Exam Validation:** Ongoing AI tuning to ensure high-quality Section B marking schemes

---

## Build Commands

```bash
npm run dev     # Development server
npm run build   # Production build
npm run preview # Preview production build
```

---

## March 17, 2026 - WASSCE Integration, Paystack Domain Setup, Automated Reports, Secure Payment Logic, and Rebranding to 'AnyStudents Mock Exams' completed.
