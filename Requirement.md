# 📄 PRODUCT REQUIREMENTS DOCUMENT (PRD)

## 📌 Product Name


**MoltbotCommunity**

---

## 🎯 Vision

Build the **#1 independent, modern community, help, guides & Q&A platform** for:

* Moltbot
* Clawdbot

With:

* ⚡ Fast
* 📱 Mobile-first
* 🔍 SEO-optimized
* 🧠 Community-driven
* 🎨 Modern UI

---

## 🧑‍🤝‍🧑 Target Users

* New Moltbot users
* Developers
* Non-technical users
* People searching:

  * “Moltbot not working”
  * “How to install Moltbot”
  * “Clawdbot vs Moltbot”

---

## 🏗️ Tech Stack

### Frontend

* **Next.js (App Router)**
* React
* Tailwind CSS
* Shadcn UI

### Hosting

* **Vercel (Free tier)**

### Backend

* Next.js Server Actions / API Routes

### Database & Auth

* **Supabase (Free tier)**

  * Postgres DB
  * Auth
  * Storage

---

## 🧩 Core Features

---

### 1️⃣ SEO Content System (Phase 1)

Content types:

* Guides
* Fixes / Troubleshooting
* FAQs
* Clawdbot section
* Alternatives

Each content page:

* SEO-friendly URL
* Server-side rendered or statically generated
* Schema:

  * FAQ
  * HowTo
* Shareable

---

### 2️⃣ Community Q&A System (Phase 2)

* User signup / login
* Ask a question
* Post answers
* Comment
* Upvote / Downvote
* User profiles
* Reputation points

---

### 3️⃣ Moderation & Admin

* Admin dashboard
* Delete / edit posts
* Ban users
* Mark answers as accepted
* Report spam

---

## 🗂️ Data Models

### User

* id (uuid)
* username
* avatar
* reputation
* created_at

### Post

* id
* type: guide | fix | faq | question
* title
* slug
* content
* views
* author_id
* created_at

### Answer

* id
* post_id
* user_id
* content
* votes
* created_at

### Comment

* id
* parent_type (post/answer)
* parent_id
* user_id
* content

---

## 🔍 SEO Requirements

* SSR / SSG everywhere
* Sitemap.xml
* Robots.txt
* Meta tags
* OpenGraph tags
* Schema:

  * FAQPage
  * HowTo
  * QAPage
* Clean URLs:

  * /guides/how-to-install-moltbot
  * /fix/moltbot-not-working
  * /clawdbot/what-is-clawdbot

---

## 🎨 UI / UX Requirements

* Modern UI
* Clean typography
* Fast loading
* Dark mode
* Mobile-first
* Shadcn UI components
* Tailwind CSS

Pages:

* Home
* Guides
* Fixes
* FAQ
* Clawdbot
* Q&A
* Profile
* Ask Question
* Admin

---

## 🏠 Homepage Layout

* Hero: “Moltbot Community – Guides, Help & Q&A”
* Search bar
* Popular guides
* Latest questions
* Categories
* CTA: Ask a Question

---

## 💰 Monetization (Phase 3)

* Google AdSense
* Affiliate links

---

## ⚖️ Legal

* Disclaimer: “Not affiliated with Moltbot”
* Privacy Policy
* Terms of Service

---

## 🗺️ Roadmap

---

### Phase 1 (Week 1–2): SEO Launch

* Setup Next.js + Supabase
* Build:

  * Guides
  * Fixes
  * FAQ
  * Clawdbot pages
* 30–50 articles

---

### Phase 2 (Week 3–4): Community

* Auth
* Ask / Answer
* Profiles
* Comments
* Voting

---

### Phase 3 (Month 2+): Scale

* Search
* Tags
* Reputation
* Moderation tools
* Monetization

---

## 📊 Success Metrics

* 100 articles in 3 months
* 10k monthly visitors in 6 months
* 100+ community users

---

## 🔐 Security

* Supabase RLS
* Server-only DB access
* Rate limiting
* CAPTCHA on signup

---

## 📦 Deployment

* GitHub → Vercel auto deploy
* Supabase hosted separately
* Env vars in Vercel dashboard

---

## 🧠 Why This Stack

* Free
* Scalable
* SEO perfect
* Fast
* Modern dev experience

---

# ✅ Final Summary

You will build:

> A **modern, fast, SEO-first community platform** using:

* Next.js
* Vercel
* Supabase
* Tailwind + Shadcn

