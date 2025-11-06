# 🥖 Capital District Food Scout

A simple web application to track and compare local bakeries in the Capital District area.

## Features

- **Add & Manage Bakeries**: Store bakery details including name, address, phone, website, and personal notes
- **Score & Rate**: Rate bakeries on 4 key criteria (1-5 stars):
  - Product Quality
  - Pricing (lower price = higher score)
  - Product Variety
  - Location Convenience
- **List View**: See all bakeries with their average scores at a glance
- **Compare**: Select any 2 bakeries to view their scores side-by-side
- **Edit & Delete**: Full CRUD operations on bakery entries

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Netlify

## Quick Start

See [SETUP.md](./SETUP.md) for detailed setup instructions.

### TL;DR

1. Clone this repo
2. Run the SQL schema in your Supabase project
3. Copy `.env.example` to `.env` and add your Supabase credentials
4. `npm install`
5. `npm run dev`

## Project Structure

```
bakery-scout/
├── src/
│   ├── components/         # React components (coming soon)
│   ├── lib/
│   │   ├── supabase.ts    # Supabase client setup
│   │   └── utils.ts       # Helper functions
│   ├── types/
│   │   └── bakery.ts      # TypeScript type definitions
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Tailwind CSS imports
├── supabase-schema.sql    # Database schema
├── SETUP.md               # Detailed setup guide
└── .env.example           # Environment variables template
```

## Database Schema

The app uses a single `bakeries` table with the following structure:

- `id` (UUID, primary key)
- `name` (text, required)
- `address`, `phone`, `website`, `notes` (text, optional)
- `quality_score`, `pricing_score`, `variety_score`, `location_score` (integer, 1-5)
- `created_at`, `updated_at` (timestamps)

See `supabase-schema.sql` for the complete schema with indexes and triggers.

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Deployment

This app is configured for easy deployment to Netlify with automatic deployments from GitHub.

See [NETLIFY.md](./NETLIFY.md) for detailed deployment instructions.

**Quick steps:**
1. Push your code to GitHub
2. Connect repository to Netlify
3. Add environment variables (Supabase URL and key)
4. Deploy!

Every push to your branch will automatically deploy to Netlify.

## License

MIT
