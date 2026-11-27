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

## 2.1 Week 3 readiness

- Every page is registered in React Router, including protected dashboards, admin sections, a compatibility redirect for `/admin-login`, and a 404 page. Page modules are lazy-loaded.
- Zustand separates event, career, community, mentorship, and authentication state. Mock factories return independent copies, preventing a store from mutating a shared fixture.
- Shared TypeScript contracts distinguish persisted entities from onboarding and create-form payloads. Mock timestamps use ISO 8601 values and are formatted only at render time.
- The typed Supabase client activates only when its public environment variables are present; the application otherwise uses the local mock fallback.

The layout uses mobile-first Tailwind breakpoints (`sm`, `md`, and `lg`) for page grids, headers, form rows, and navigation. Horizontal filters remain scrollable on narrow screens instead of forcing the page to overflow.

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

### Week 3 files at a glance

| Area | Main files | Purpose |
| :--- | :--- | :--- |
| Routing | `src/App.tsx`, `src/pages/NotFoundPage.tsx` | Lazy-loaded page registration, role guards, redirects, and the 404 experience. |
| Shared contracts | `src/types/index.ts` | Domain models plus explicit `RegistrationInput`, `CreateEventInput`, and `CreateJobInput` payloads. |
| Client state | `src/store/*`, `src/data/mockState.ts` | Zustand state and clone-based mock factories. |
| Supabase bridge | `src/lib/supabase/*` | Client initialization, generated-style database contract, and profile mappers. |
| Database | `supabase/migrations/*` | Baseline schema followed by the Week 3 auth, relation, index, trigger, and RLS refinement. |

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

## 6. Demo Accounts & Role-Based Access Control

CAMPLY uses credential-based demo login on `/login` with role-based access control (`ProtectedRoute` and `PermissionGate`) and Dark/Light mode support. Use the exact username/ID and password below. These accounts are available only while Supabase credentials are not configured.

| Role | Username / ID | Password | Dashboard Route |
| :--- | :--- | :--- | :--- |
| **STUDENT** | `23100001` | `mahasiswa123` | `/dashboard/student` |
| **ALUMNI** | `ALM-2021-001` | `alumni123` | `/dashboard/alumni` |
| **LECTURER** | `DSN-001` | `dosen123` | `/dashboard/lecturer` |
| **ADMIN** | `ADM-001` | `admin123` | `/admin` |

> **Pro Tip:** On `/login`, expand **Use a demo account** to auto-fill the Student, Alumni, or Lecturer account. Enter the Admin credentials manually; the Admin option is deliberately hidden from the public quick-fill menu.

---

## 7. Supabase Database Setup

When ready to connect to a live Supabase instance:

1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Apply both migrations in filename order:
   - `supabase/migrations/20261113000000_create_camply_schema.sql`
   - `supabase/migrations/20261127000000_refine_backend_ready_schema.sql`
4. (Optional) Run `supabase/seed.sql` to populate sample campus data.
5. In your `.env.local` file, enter your credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

The refinement migration links `profiles` to Supabase Auth, creates a profile when a new account signs up, adds indexes and ownership-aware RLS policies, and prevents role escalation. Alumni and lecturer sign-ups start as students while their requested role awaits administrator verification; admin access cannot be self-requested.

After connecting a live project, regenerate `src/lib/supabase/database.types.ts` with `supabase gen types typescript` whenever the schema changes.

---

## 8. Routes and access rules

| Route group | Paths | Access |
| :--- | :--- | :--- |
| Public ecosystem | `/`, `/community`, `/faculties`, `/events`, `/events/:id`, `/calendar`, `/careers`, `/alumni`, `/alumni/:id`, `/profile/:id`, `/mentorship` | Public; actions still follow the active user role. |
| Authentication | `/login`, `/register`, `/forgot-password`, `/admin-login`, `/unauthorized` | Public. `/admin-login` redirects to the unified login page. |
| Dashboards | `/dashboard`, `/dashboard/student`, `/dashboard/alumni`, `/dashboard/lecturer` | `/dashboard` selects the current role dashboard; individual dashboards are role-protected. |
| Administration | `/admin`, `/admin/users`, `/admin/events`, `/admin/careers`, `/admin/verification`, `/admin/moderation`, `/admin/analytics`, `/admin/settings` | `ADMIN` only. |
| Account workspace | `/settings`, `/announcements` | Authenticated members only. |
| Fallback | Any unknown path | Renders the CAMPLY 404 page. |

`ProtectedRoute` redirects unauthenticated visitors to `/login` and unauthorized roles to `/unauthorized`. The original destination is retained in router state so future sign-in flows can return the user appropriately.

---

## 9. State, mock data, and API boundaries

| Store | Owns | Persistence / initial data |
| :--- | :--- | :--- |
| `useAuthStore` | Session profile, active role, sign-in, registration, profile edits | Session profile is stored locally for the prototype; live sign-out also closes the Supabase session. |
| `useEventStore` | Events, search/category/date filters, registration and save actions | Event mutations use local storage and begin from `createMockEvents()`. |
| `useCareerStore` | Job listings, filters, saved jobs, applications, job publishing | Job mutations use local storage and begin from `createMockJobs()`. |
| `useCommunityStore` | Member filters, connections, follows, messages, notifications | Starts from cloned member and notification fixtures. |
| `useMentorshipStore` | Mentorship requests and mentor decisions | Starts from `createMockMentorshipRequests()`. |

`mockData.ts` is the read-only source fixture. `mockState.ts` clones fixture arrays before they enter a store, preventing interactions such as registration, saving, or filtering from leaking into another feature's initial data. UI-only flags such as `is_saved`, `is_registered`, and `is_applied` remain in the frontend model until their corresponding backend tables are wired in.

---

## 10. Supabase integration behavior

The app remains usable without Supabase credentials. When `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` contain valid values, the typed client is enabled; both `https://` hosted projects and a local `http://` Supabase stack are supported.

- Sign-in uses Supabase email/password authentication and resolves the application profile through `profiles.auth_user_id`.
- Sign-up sends profile metadata to Supabase Auth. The database trigger creates the linked profile, and email confirmation is handled before the application treats the session as authenticated.
- Student registrations are created as verified students. Alumni and lecturer selections are recorded as requested roles and remain student accounts until an administrator verifies them.
- The migration enables RLS for application tables. Policies are ownership-aware for profiles, events, jobs, registrations, applications, saved items, connections, mentorship, notifications, and reports.
- `src/lib/supabase/mappers.ts` is the boundary between nullable database rows and stable UI models. Extend this layer rather than casting database rows directly in page components.

Do not place a Supabase service-role key in any `VITE_` variable. Browser code must use only the anon/publishable key.

---

## 11. Verification checklist

Run these checks before handing the project to the next integration phase:

```bash
npm run build
```

The command runs TypeScript project checking and creates the production Vite bundle. For local route smoke testing, run `npm run dev` and open a public route, a protected dashboard route, an admin route, and an unknown URL. The SPA server should return the app shell; React Router then enforces access or renders the 404 page.

For a live backend, apply both migrations, configure `.env.local`, register a test student account, and verify that a `profiles.auth_user_id` value is created. Test an alumni or lecturer sign-up separately to confirm it remains pending until an administrator changes the role.

---

## 12. License

This project was developed for the CAMPLY platform under the MIT License.
