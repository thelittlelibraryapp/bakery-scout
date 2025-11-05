# Capital District Food Scout - Setup Guide

## 🥖 About
A simple web app to track and compare local bakeries in the Capital District area.

## 📋 Prerequisites
- Node.js (v18 or higher)
- A Supabase account (free tier works fine)

## 🚀 Setup Instructions

### 1. Supabase Database Setup

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for your project to finish setting up (usually takes 2-3 minutes)
3. Once ready, go to the **SQL Editor** in your Supabase dashboard
4. Copy the contents of `supabase-schema.sql` and paste it into the SQL Editor
5. Click **Run** to execute the schema
6. Your database is now ready!

### 2. Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. You'll need two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (a long string under "Project API keys")

### 3. Configure Environment Variables

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_project_url_here
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

### 4. Install Dependencies

```bash
npm install
```

### 5. Start the Development Server

```bash
npm run dev
```

The app should now be running at `http://localhost:5173`

## 📦 Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Netlify (coming soon)

## 🎯 Features (Phase 1)

- ✅ Add bakeries with name, address, phone, website, and notes
- ✅ Score bakeries on 4 criteria (1-5 stars):
  - Product Quality
  - Pricing (lower price = higher score)
  - Product Variety
  - Location Convenience
- ✅ List view with average scores
- ✅ Edit and delete bakeries
- ✅ Side-by-side comparison of 2 bakeries

## 📁 Project Structure

```
bakery-scout/
├── src/
│   ├── components/      # React components
│   ├── lib/            # Utilities and Supabase client
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── supabase-schema.sql # Database schema
└── .env                # Environment variables (not in git)
```
