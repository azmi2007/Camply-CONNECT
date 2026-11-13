# CAMPLY

> **"Your Campus. Your People. Your Future."**

**CAMPLY** is a premium university digital ecosystem designed to connect university students, distinguished alumni, faculty lecturers, and platform administrators. It unifies professional networking, campus event discovery, career opportunities, fellowships, and 1-on-1 alumni mentorship in an editorial light aesthetic inspired by modern creative platforms and high-craft SaaS products like Linear, Luma, and ADPList.

---

## 1. Key Features

- **Editorial Homepage with Interactive Calendar Sidebar**:
  - Distinctive two-column landing experience placing a rich interactive event calendar directly alongside featured campus workshops, summits, and alumni profiles.
  - Category-based indicators, month/year navigation, real-time date filtering, and quick event creation for authorized users.
- **Role-Based Authentication & Verification**:
  - Split-screen authentication experience with multi-step role onboarding (Student, Alumni, Lecturer).
  - Distinctive visual role badges:
    - **Student** (`Blue`)
    - **Alumni** (`Purple`)
    - **Lecturer / Faculty** (`Green`)
    - **Administrator** (`Dark`)
  - Instant 1-click demo role simulator to evaluate and switch between all 4 dashboards.
- **Role-Dedicated Dashboards**:
  - **Student Dashboard**: Upcoming registered events, recommended internships, portfolio review requests, saved opportunities.
  - **Alumni Dashboard**: Profile views, student mentorship inquiries with accept/decline flows, published job vacancies, workshop hosting.
  - **Lecturer Dashboard**: Department seminars, student attendee engagement metrics, campus announcements.
  - **Admin Dashboard**: Real-time ecosystem analytics powered by Recharts (Monthly Active Users, faculty distribution), verification queue, and user moderation.
- **Campus Community & Directory**:
  - Filter by faculty, major, graduation year, company, or skill set.
  - Instant connection request flows with celebratory micro-animations.
- **Event Management**:
  - Academic seminars, student hackathons, career fairs, webinars, and networking meetups.
  - Single source of truth synchronized between the event management page, homepage calendar sidebar, and user dashboards.
- **Career & Internship Marketplace**:
  - Filter by internship, full-time, part-time, remote, or freelance.
  - One-click application tracking and publishing modal for alumni and faculty.
- **Alumni Mentorship System**:
  - 1-on-1 portfolio review, mock interview, and career guidance booking with verified alumni.

---

## 2. Technology Stack

- **Core**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, CSS Variables, Plus Jakarta Sans & Inter typography
- **Animation & Micro-interactions**: React Bits inspired components, Framer Motion, Canvas Confetti
- **Icons**: Lucide React
- **Routing**: React Router DOM (v7)
- **State Management**: Zustand (with persistent local storage fallback)
- **Forms**: React Hook Form, Zod
- **Data Visualization**: Recharts
- **Database & Backend**: Supabase (PostgreSQL, Row Level Security, Storage ready) with mock-first fallback store

---

## 3. Project Structure

```
camply/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── animations/          # SplitText, SpotlightCard, Counter (React Bits inspired)
│   │   ├── calendar/            # Dedicated homepage CalendarSidebar
│   │   ├── cards/               # EventCard, AlumniCard, JobCard, MentorCard
│   │   ├── forms/               # CreateEventModal, PostJobModal, RequestMentorshipModal
│   │   ├── layout/              # Navbar, Footer, AppLayout
│   │   └── ui/                  # Button, Modal, RoleBadge
│   ├── data/
│   │   └── mockData.ts          # Rich realistic campus mock dataset
│   ├── lib/
│   │   ├── supabase/            # Client initialization with fallback detection
│   │   └── utils.ts             # Tailwind merge, date formatting, badge colors
│   ├── pages/
│   │   ├── Alumni/              # Alumni directory & company search
│   │   ├── Auth/                # LoginPage, RegisterPage (multi-step), ForgotPassword
│   │   ├── Careers/             # Job & Internship marketplace
│   │   ├── Community/           # Campus networking directory
│   │   ├── Dashboard/           # Role-based dashboards (Student, Alumni, Lecturer, Admin)
│   │   ├── Events/              # Event management & registration
│   │   └── Home/                # Editorial hero, stats, partners, category pills, calendar
│   ├── store/
│   │   ├── useAuthStore.ts      # Authentication & demo role switching
│   │   ├── useCareerStore.ts    # Job applications & vacancy posting
│   │   ├── useCommunityStore.ts # Connections & member directory
│   │   ├── useEventStore.ts     # Single source of truth for events & calendar
│   │   └── useMentorshipStore.ts# Mentorship requests & mentor scheduling
│   ├── types/
│   │   └── index.ts             # Comprehensive TypeScript interface definitions
│   ├── App.tsx                  # Application routes & layout wrapper
│   ├── index.css                # Tailwind CSS v4 configuration & tokens
│   └── main.tsx                 # Entrypoint
├── supabase/
│   ├── migrations/              # Production PostgreSQL schema migration
│   │   └── 20261113000000_create_camply_schema.sql
│   └── seed.sql                 # Comprehensive database seed data
├── .env.example
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 4. Prerequisites

- **Node.js**: `v18.0.0` or higher (Tested on Node `v24.x`)
- **npm**: `v9.0.0` or higher

---

## 5. Installation & Getting Started

1. **Clone or navigate into the repository**:
   ```bash
   cd Camply-CONNECT
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   *(Note: The application includes a built-in mock fallback store, so all features, dashboards, event creation, job posting, and calendar interactions work right out of the box even before entering Supabase credentials!)*

4. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

5. **Build for production**:
   ```bash
   npm run build
   ```

6. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## 6. Demo Accounts (1-Click Simulator)

CAMPLY includes 4 pre-configured demo accounts corresponding to the required user roles:

| Role | Name | Email | Headline / Description |
| :--- | :--- | :--- | :--- |
| **STUDENT** | Alex Rivera | `alex.student@camply.edu` | Undergraduate CS Student • Class of 2027 |
| **ALUMNI** | Sarah Jenkins | `sarah.alumni@camply.edu` | Senior Product Designer @ Stripe • Class of 2021 |
| **LECTURER** | Dr. Marcus Vance | `marcus.lecturer@camply.edu` | Associate Professor of Computer Science • NIDN: LEC-40918 |
| **ADMIN** | Elena Rostova | `admin@camply.edu` | Director of University Ecosystem & Governance |

> **Pro Tip:** In the top navigation bar or directly on the `/dashboard` route, use the **Role Simulator** pill selector to switch between all 4 dashboards with one click.

---

## 7. Supabase Database Setup

When ready to connect to a live Supabase instance:

1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Run the migration script in `supabase/migrations/20261113000000_create_camply_schema.sql`.
4. (Optional) Run `supabase/seed.sql` to populate sample campus data.
5. In your `.env.local` file, enter your credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

---

## 8. License

This project was developed for the CAMPLY platform under the MIT License.
