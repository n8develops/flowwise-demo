# Flowwise: AI Savings Coach Onboarding Demo (First-Time User Journey)

This was the first of our *lovable prompts* — the one where three of us had no idea what we were doing but somehow made something that actually worked.  
We iterated on this thing a *lot*. Like, way too much. But it was the start of how we learned to build stuff that feels warm, useful, and a little human.

---

## Goal

Build a **mobile-first clickable prototype** called **Flowwise** that shows what a brand-new user experiences on Day 1.

1. They see trust messaging.  
2. They connect a mock bank account.  
3. They see a personalized dashboard.  
4. They get some gentle AI coaching.  
5. They confirm an adjustment.  
6. They figure out how it all works.

### What We Were Trying to Do

- Make it actually clickable — real screen flow, not a slideshow.  
- Fake the bank connection (no APIs, no credentials).  
- Script the AI chat so it feels alive.  
- Store a few fake data points (“car repair,” “behind goal,” etc.) to make it personal.  
- Keep the writing friendly and human — 8th-grade reading level, no fintech buzzwords.

---

## App Branding and Style

**Name:** Flowwise  
**Tone:** Warm, human, encouraging — never guilt-trippy.  
**Colors:** Soft blues, gentle greens, lots of white space.  
**Font:** Inter, Poppins, or Nunito (rounded sans).  
**Layout:** Mobile-first. Feels like a real savings app, not a prototype.

**Accessibility stuff we actually remembered:**
- High contrast text  
- Big tap targets  
- `aria-labels` on key controls  
- Clear “English / Español” toggle visible on every screen

---

## Core Screens

### 1. Welcome / Trust Screen (`WelcomeScreen`)

**Header:** “Welcome to Flowwise”  
**Subheader:** “Your AI-powered savings coach that adapts to your life.”  

**Trust Box:**  
“Your data is private and secure. We’ll never move your money without permission.”

**Primary Button:** “Connect Your Bank”  
- Opens a fake modal with a few pretend banks.  
- On click → show “Connected Successfully!”  
- Save mock financial data (income, spending, goals).

**Secondary Link:** “Prefer to talk to a human advisor?”  

Goal: make it feel safe and calm — not like another finance app yelling at you.

---

### 2. Dashboard / Home (`DashboardScreen`)

**Top Bar:** Flowwise logo + “English | Español”

**Card 1 – Goal Overview:**  
“My Goal: Emergency Fund”  
“$500 target / $120 saved”

**Card 2 – This Month’s Snapshot:**  
“Income: $1,140 | Spending: $960”  
“You’re $35 behind your goal because of a $180 car repair.”  
“That’s okay — life happens. Let’s adjust together.”

**Card 3 – Top Spending Category:**  
“Food Delivery — $96 this week”

**Button:** “Talk to Flowwise AI Coach” → goes to `CoachScreen`.

The data should come from whatever fake “connection” happened earlier, not just hardcoded text.

---

### 3. AI Coach Chat (`CoachScreen`)

**Header:** “Flowwise AI Coach”

**Scripted Messages:**
1. “Hi Alex! I noticed your $180 car repair. That’s why you’re $35 behind this month.”  
2. “Want to adjust your plan?”

**Options:**
- Option A: “Pause this week’s $25 auto-save.”  
- Option B: “Lower to $10/week for 4 weeks.”

Each one has a “Preview this plan” button that takes you to `PreviewScreen`.

**Footer:**  
“AI Coach: I can suggest ideas, but you decide. I’ll never move your money without permission.”

Bonus points: add a fake typing animation so it feels alive.  
Also: remember which option was picked — it matters later.

---

### 4. Preview & Confirm (`PreviewScreen`)

**Header:** “Preview Adjustment”

**If Option A:**  
“If you pause $25 this week, you’ll hit your goal one week later — April 12 instead of April 5.”

**If Option B:**  
“If you drop to $10/week for 4 weeks, you’ll stay on track without skipping your goal.”

Buttons:  
- “Confirm Adjustment”  
- “Go Back”

After confirm:  
Show something like:  
“Adjustment saved. You’re still 80% on track — nice work staying consistent!”

Then update the mock dashboard data so it looks real.

---

### 5. Transparency / How It Works (`TransparencyScreen`)

**Header:** “How Flowwise Keeps You in Control”

Little cards explaining:
- “Secure mock connection — we never see your credentials.”  
- “AI coach learns from your patterns.”  
- “You approve every action — always.”  
- “Built mobile-first for accessibility.”

Button: “Back to Dashboard”

---

### 6. Pitch / Tagline Screen (`PitchScreen`) [Optional]

Big headline: “Flowwise: AI that keeps saving human.”  
Subtext: “We help hourly, gig, and freelance workers stay on track with savings — even when life throws a curveball.”  
Button: “See the Dashboard”

---

## Navigation Flow

| From | Action | To |
|------|--------|----|
| WelcomeScreen | Connect mock bank | DashboardScreen |
| DashboardScreen | Talk to Coach | CoachScreen |
| CoachScreen | Select Option | PreviewScreen |
| PreviewScreen | Confirm | DashboardScreen |
| DashboardScreen | View Transparency | TransparencyScreen |
| TransparencyScreen | Return | DashboardScreen |
| PitchScreen | See Dashboard | DashboardScreen |

---

## Technical and Content Notes

- Every screen should actually click through — no dead ends.  
- Use mock data like:
  - Income: $1,140  
  - Spending: $960  
  - Goal: $500 target / $120 saved  
  - Setback: $180 car repair  
  - Category: “Food Delivery — $96 this week”  
- The user’s name is Alex.  
- No APIs, no databases. Everything’s fake but wired up like it’s real.  

**Copy we liked enough to keep:**
- “That’s okay — life happens. Let’s adjust together.”  
- “You’re still 80% on track — nice work staying consistent.”

**Tiny details that made it feel alive:**
- Slide/fade transitions  
- Button press animations  
- Chat typing dots  
- Rounded cards and soft shadows

---

## Expected Output

A clickable, mobile-first prototype that tells the story of a first-time Flowwise user — warm, functional, and kind of real for something we hacked together at 2 a.m.  

This was where it all started. The first prompt we really cared about. The first one we loved enough to keep improving until it finally felt like *us*.


