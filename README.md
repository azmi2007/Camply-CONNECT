# CAMPLY

**Your Campus. Your People. Your Future.**

CAMPLY is a university networking platform designed to connect students, alumni, lecturers, and university communities.

## Features

- Community networking
- Alumni directory
- Event creation and management
- Job and internship marketplace
- Mentorship system
- User authentication and role management
- Personalized dashboards
- Admin dashboard

## Tech Stack

- Next.js
- TypeScript
- React
- Tailwind CSS
- Shadcn/UI
- Supabase
- PostgreSQL
- Lucide React
- Framer Motion

## Requirements

- Node.js (LTS)
- npm
- Git
- Supabase account

## Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
cd camply
```

Install dependencies:

```bash
npm install
```

Create your environment file:

```bash
cp .env.example .env.local
```

Configure your Supabase credentials inside `.env.local`.

## Database Setup

1. Create a new Supabase project.
2. Copy your project URL and API keys.
3. Configure environment variables.
4. Apply the SQL migrations located in `supabase/migrations`.
5. Run seed data if available.

## Development

```bash
npm run dev
```

Open:

http://localhost:3000

## Production Build

```bash
npm run build
npm run start
```

## Deployment

Deploy the application using Vercel.

Configure all required environment variables in the Vercel project settings before deployment.

## Security

- Never expose service role keys in client-side code.
- Use Supabase Row Level Security.
- Validate all user input.
- Enforce role-based authorization.
- Protect private routes and sensitive operations.

## Project Status

Development in progress.

## License

Choose an appropriate license before public distribution.