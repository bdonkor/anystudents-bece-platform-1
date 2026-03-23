# 🐵 Mailchimp Integration Setup Guide

I have updated your **`signup-notification`** Edge Function to automatically sync new students to your Mailchimp Audience. Follow these steps to activate it.

---

### Step 1: Get your Mailchimp Details

1.  **API Key:**
    *   Go to Mailchimp > Profile Icon > Extras > **API Keys**.
    *   Create a new key and copy it.
2.  **Audience ID (List ID):**
    *   Go to Audience > All Contacts > Settings > **Audience name and defaults**.
    *   Copy the **Audience ID** (a string of letters and numbers like `a1b2c3d4`).
3.  **Server Prefix:**
    *   Look at your browser's URL while logged into Mailchimp (e.g., `https://us21.admin.mailchimp.com/`).
    *   The prefix is the **`us21`** part.

---

### Step 2: Set the Secrets in Supabase

Run these commands in your terminal (inside the project folder) to give Supabase the keys to talk to Mailchimp:

```bash
# Set your Mailchimp API Key
npx supabase secrets set MAILCHIMP_API_KEY=your_mailchimp_api_key_here

# Set your Audience/List ID
npx supabase secrets set MAILCHIMP_LIST_ID=your_audience_id_here

# Set your Server Prefix (e.g. us1, us21)
npx supabase secrets set MAILCHIMP_SERVER=your_server_prefix
```

---

### Step 3: Deploy the Updated Function

```bash
npx supabase functions deploy signup-notification
```

---

### Step 4: Triggering Automations in Mailchimp

When a student joins, they will arrive in Mailchimp with:
*   **Merge Fields:** First Name (FNAME), Last Name (LNAME), Level (LEVEL), and Program (PROGRAM).
*   **Tags:** Every new student gets a tag **`Platform Signup`** and their level (e.g., **`JHS`** or **`SHS`**).

**To start your emails automatically:**
1.  In Mailchimp, go to **Automations**.
2.  Create a "Customer Journey" or "Classic Automation".
3.  Set the **Trigger** to: *"A tag is added"* (choose **`Platform Signup`**).
4.  Now, the moment they sign up on AnyStudents, they will instantly get your Mailchimp welcome email!

---

### 💡 Pro Tip for "JHS vs SHS" Emails
If you want to send different emails to BECE (JHS) vs WASSCE (SHS) students, set your Mailchimp trigger to:
*   Trigger 1: *"A tag is added"* -> **`JHS`**
*   Trigger 2: *"A tag is added"* -> **`SHS`**

This ensures they get the exact practice tips they need for their specific level!
