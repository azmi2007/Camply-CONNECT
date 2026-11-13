import { Profile, EventItem, JobVacancy, PlatformStats } from '../types';

export const DEMO_USERS: Record<string, Profile> = {
  student: {
    id: 'user-student-01',
    full_name: 'Alex Rivera',
    email: 'alex.student@camply.edu',
    role: 'STUDENT',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=256&auto=format&fit=crop&q=80',
    headline: 'Undergraduate CS Student | Full-Stack & UI Enthusiast',
    bio: 'Senior computer science student passionate about distributed systems and interactive web design. Looking for frontend engineering and product internships.',
    university: 'Universitas Indonesia',
    faculty: 'Computer Science',
    major: 'Informatics Engineering',
    student_id: 'CS-2023-8891',
    enrollment_year: 2023,
    expected_graduation_year: 2027,
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Figma'],
    connections_count: 142,
    mutual_connections: 18,
    created_at: '2024-09-01T08:00:00Z'
  },
  alumni: {
    id: 'user-alumni-01',
    full_name: 'Sarah Jenkins',
    email: 'sarah.alumni@camply.edu',
    role: 'ALUMNI',
    avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=256&auto=format&fit=crop&q=80',
    headline: 'Senior Product Designer @ Stripe • Alum 2021',
    bio: 'Class of 2021. Senior Product Designer helping early-career students transition into product strategy and design systems.',
    university: 'Universitas Indonesia',
    faculty: 'Art & Design',
    major: 'Visual Communication Design',
    graduation_year: 2021,
    current_company: 'Stripe',
    current_position: 'Senior Product Designer',
    is_mentor_available: true,
    mentor_expertise: ['Portfolio Review', 'Design Systems', 'Interview Prep', 'Career Transition'],
    skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping', 'Product Strategy'],
    connections_count: 384,
    mutual_connections: 32,
    created_at: '2023-01-15T10:00:00Z'
  },
  lecturer: {
    id: 'user-lecturer-01',
    full_name: 'Dr. Marcus Vance',
    email: 'marcus.lecturer@camply.edu',
    role: 'LECTURER',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&auto=format&fit=crop&q=80',
    headline: 'Associate Professor of Computer Science | Lab Director',
    bio: 'Associate Professor in Computer Systems & Cloud Architectures. Faculty advisor for Student Innovation Lab and mentor for graduate research.',
    university: 'Universitas Indonesia',
    faculty: 'Computer Science',
    department: 'Computer Systems & Architecture',
    lecturer_id: 'LEC-40918',
    is_mentor_available: true,
    mentor_expertise: ['Academic Research', 'Master/PhD Guidance', 'Cloud Architecture'],
    skills: ['Distributed Systems', 'Cloud Computing', 'Research Methodology', 'Kubernetes'],
    connections_count: 512,
    mutual_connections: 45,
    created_at: '2022-08-10T09:00:00Z'
  },
  admin: {
    id: 'user-admin-01',
    full_name: 'Elena Rostova',
    email: 'admin@camply.edu',
    role: 'ADMIN',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=256&auto=format&fit=crop&q=80',
    headline: 'CAMPLY Ecosystem Director & University Partnerships',
    bio: 'Platform Administrator & Director of University Corporate Partnerships overseeing student development and alumni networking programs.',
    university: 'Universitas Indonesia',
    faculty: 'Administration',
    department: 'University Relations',
    lecturer_id: 'ADM-001',
    skills: ['Community Governance', 'University Relations', 'Data Analytics'],
    connections_count: 1240,
    created_at: '2022-01-01T00:00:00Z'
  }
};

export const INITIAL_MEMBERS: Profile[] = [
  DEMO_USERS.student,
  DEMO_USERS.alumni,
  DEMO_USERS.lecturer,
  {
    id: 'user-alumni-02',
    full_name: 'David Chen',
    email: 'david.chen@alum.camply.edu',
    role: 'ALUMNI',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=256&auto=format&fit=crop&q=80',
    headline: 'Staff Software Engineer @ Google • Alum 2019',
    bio: 'Former hackathon winner. Tech Lead working on Google Cloud networking. Happy to review student code and share FAANG interview tips.',
    university: 'Institut Teknologi Bandung',
    faculty: 'Engineering',
    major: 'Electrical & Informatics',
    graduation_year: 2019,
    current_company: 'Google',
    current_position: 'Staff Software Engineer',
    is_mentor_available: true,
    mentor_expertise: ['System Design', 'FAANG Interview Prep', 'Cloud Infrastructure', 'Go/Rust'],
    skills: ['Go', 'Kubernetes', 'GCP', 'Distributed Systems'],
    connections_count: 620,
    mutual_connections: 24
  },
  {
    id: 'user-student-02',
    full_name: 'Maya Putri',
    email: 'maya.putri@student.camply.edu',
    role: 'STUDENT',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&auto=format&fit=crop&q=80',
    headline: 'Economics Major | President of Finance Student Club',
    bio: 'Junior studying Business Economics. Passionate about venture capital, fintech adoption, and ESG investing.',
    university: 'Universitas Indonesia',
    faculty: 'Business',
    major: 'Finance & Banking',
    student_id: 'BE-2024-1102',
    enrollment_year: 2024,
    expected_graduation_year: 2028,
    skills: ['Financial Modeling', 'Data Analysis', 'Market Research', 'Valuation'],
    connections_count: 210,
    mutual_connections: 14
  },
  {
    id: 'user-alumni-03',
    full_name: 'Clarissa Wong',
    email: 'clarissa.w@alum.camply.edu',
    role: 'ALUMNI',
    avatar_url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=256&auto=format&fit=crop&q=80',
    headline: 'Product Marketing Manager @ Linear • Alum 2020',
    bio: 'Bridging technical engineering and high-impact storytelling. Passionate about developer tooling and product-led growth.',
    university: 'Universitas Indonesia',
    faculty: 'Communication',
    major: 'Strategic Communications',
    graduation_year: 2020,
    current_company: 'Linear',
    current_position: 'Product Marketing Manager',
    is_mentor_available: true,
    mentor_expertise: ['Go-To-Market', 'Developer Marketing', 'Resume Polish'],
    skills: ['GTM Strategy', 'Brand Architecture', 'Copywriting', 'SaaS Growth'],
    connections_count: 430,
    mutual_connections: 29
  },
  {
    id: 'user-lecturer-02',
    full_name: 'Prof. Anindya Wardhana',
    email: 'anindya.w@camply.edu',
    role: 'LECTURER',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&auto=format&fit=crop&q=80',
    headline: 'Professor of Bioengineering & Medical Informatics',
    bio: 'Leading genomics computational research at the Medical Informatics Center. Passionate about multidisciplinary healthtech projects.',
    university: 'Universitas Indonesia',
    faculty: 'Medicine',
    department: 'Biomedical Informatics',
    lecturer_id: 'LEC-99214',
    is_mentor_available: true,
    mentor_expertise: ['HealthTech Startups', 'Grant Applications', 'Research Publishing'],
    skills: ['Bioinformatics', 'Machine Learning', 'Clinical Data', 'Python'],
    connections_count: 310,
    mutual_connections: 8
  }
];

export const COMMUNITY_CATEGORIES = [
  { name: 'Computer Science', count: '3.4k members', icon: 'Terminal' },
  { name: 'Engineering', count: '2.8k members', icon: 'Cpu' },
  { name: 'Business', count: '2.5k members', icon: 'Briefcase' },
  { name: 'Design', count: '1.9k members', icon: 'Palette' },
  { name: 'Communication', count: '1.4k members', icon: 'MessageSquare' },
  { name: 'Medicine', count: '1.2k members', icon: 'Stethoscope' },
  { name: 'Law', count: '980 members', icon: 'Scale' },
  { name: 'Economics', count: '1.6k members', icon: 'TrendingUp' },
  { name: 'Environment', count: '850 members', icon: 'Leaf' }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'event-01',
    organizer_id: 'user-lecturer-01',
    organizer: {
      full_name: 'Dr. Marcus Vance',
      avatar_url: DEMO_USERS.lecturer.avatar_url,
      role: 'LECTURER',
      faculty: 'Computer Science'
    },
    title: 'AI Engineering & Future of Campus Tech 2026',
    description: 'Join top engineering leaders and faculty members for a deep-dive into LLM agents, scalable architectures, and next-generation student startups. Free refreshments and networking session provided.',
    banner_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    category: 'Seminar',
    event_date: '2026-11-16',
    start_time: '13:30',
    end_time: '16:00',
    location: 'Auditorium Gd. A, Lt. 3 & Live Zoom',
    is_online: true,
    online_link: 'https://meet.camply.edu/ai-summit',
    registration_deadline: '2026-11-15',
    max_participants: 250,
    current_participants: 184,
    status: 'UPCOMING',
    tags: ['AI', 'Engineering', 'Keynote', 'Research'],
    is_registered: true
  },
  {
    id: 'event-02',
    organizer_id: 'user-alumni-01',
    organizer: {
      full_name: 'Sarah Jenkins',
      avatar_url: DEMO_USERS.alumni.avatar_url,
      role: 'ALUMNI',
      faculty: 'Art & Design'
    },
    title: 'Product Design Sprint: From Zero to Pitch',
    description: 'Hands-on interactive workshop crafting design systems in Figma with real-time feedback from alumni lead designers at Stripe and Linear.',
    banner_url: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&auto=format&fit=crop&q=80',
    category: 'Workshop',
    event_date: '2026-11-18',
    start_time: '09:00',
    end_time: '12:00',
    location: 'Design Innovation Lab 204',
    is_online: false,
    max_participants: 50,
    current_participants: 42,
    status: 'UPCOMING',
    tags: ['UI/UX', 'Product', 'Portfolio', 'Mentorship'],
    is_registered: false
  },
  {
    id: 'event-03',
    organizer_id: 'user-admin-01',
    organizer: {
      full_name: 'Elena Rostova',
      avatar_url: DEMO_USERS.admin.avatar_url,
      role: 'ADMIN',
      faculty: 'Administration'
    },
    title: 'Annual University Career & Internship Fair 2026',
    description: 'Connect with over 40+ leading tech startups, multinational consultancies, and unicorn tech employers looking for student talent.',
    banner_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
    category: 'Career Fair',
    event_date: '2026-11-20',
    start_time: '10:00',
    end_time: '17:00',
    location: 'Main University Convention Center',
    is_online: false,
    max_participants: 1000,
    current_participants: 740,
    status: 'UPCOMING',
    tags: ['Career', 'Internship', 'Networking', 'Hiring'],
    is_registered: true
  },
  {
    id: 'event-04',
    organizer_id: 'user-alumni-02',
    organizer: {
      full_name: 'David Chen',
      avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=256&auto=format&fit=crop&q=80',
      role: 'ALUMNI',
      faculty: 'Engineering'
    },
    title: 'Alumni Night: Global Tech Engineering Meetup',
    description: 'Exclusive casual evening networking connecting current seniors with alumni working abroad at Google, Stripe, and Meta.',
    banner_url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop&q=80',
    category: 'Networking',
    event_date: '2026-11-25',
    start_time: '18:30',
    end_time: '21:00',
    location: 'The Alumni Club Lounge & Rooftop',
    is_online: false,
    max_participants: 80,
    current_participants: 68,
    status: 'UPCOMING',
    tags: ['Alumni', 'Networking', 'SiliconValley', 'GlobalCareers'],
    is_registered: false
  },
  {
    id: 'event-05',
    organizer_id: 'user-lecturer-01',
    organizer: {
      full_name: 'Dr. Marcus Vance',
      avatar_url: DEMO_USERS.lecturer.avatar_url,
      role: 'LECTURER',
      faculty: 'Computer Science'
    },
    title: 'National Campus Hackathon: Build for Impact',
    description: '48-hour sprint building applications addressing climate, education, and campus efficiency. Mentored by faculty and alumni.',
    banner_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80',
    category: 'Competition',
    event_date: '2026-12-05',
    start_time: '08:00',
    end_time: '18:00',
    location: 'Innovation Hall & Discord',
    is_online: true,
    online_link: 'https://hackathon.camply.edu',
    max_participants: 120,
    current_participants: 95,
    status: 'UPCOMING',
    tags: ['Hackathon', 'Coding', 'Prizes', 'Innovation'],
    is_registered: false
  },
  {
    id: 'event-06',
    organizer_id: 'user-alumni-03',
    organizer: {
      full_name: 'Clarissa Wong',
      avatar_url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=256&auto=format&fit=crop&q=80',
      role: 'ALUMNI',
      faculty: 'Communication'
    },
    title: 'Masterclass: Breaking Into Product Marketing',
    description: 'Learn the exact framework for crafting product narratives, positioning features, and standing out in competitive SaaS hiring rounds.',
    banner_url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80',
    category: 'Webinar',
    event_date: '2026-11-28',
    start_time: '19:00',
    end_time: '20:30',
    location: 'CAMPLY Live Stage (Online)',
    is_online: true,
    online_link: 'https://live.camply.edu/masterclass-pmm',
    max_participants: 300,
    current_participants: 215,
    status: 'UPCOMING',
    tags: ['Marketing', 'Product', 'SaaS', 'CareerTips'],
    is_registered: false
  }
];

export const INITIAL_JOBS: JobVacancy[] = [
  {
    id: 'job-01',
    company_id: 'comp-01',
    company: {
      id: 'comp-01',
      name: 'Linear',
      logo_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&auto=format&fit=crop&q=80',
      industry: 'Software & DevTools',
      location: 'San Francisco & Remote',
      website: 'https://linear.app'
    },
    poster_id: 'user-alumni-01',
    poster: {
      full_name: 'Sarah Jenkins',
      role: 'ALUMNI',
      avatar_url: DEMO_USERS.alumni.avatar_url
    },
    title: 'Frontend Software Engineer Intern (Summer 2027)',
    description: 'Join our frontend core product team. You will build user-facing performance-first features using React, TypeScript, and elegant micro-animations.',
    requirements: [
      'Strong foundations in modern React and TypeScript',
      'Understanding of DOM performance, accessibility, and CSS variables',
      'Passion for craft and thoughtful interaction details',
      'Active student enrolled in CS, Software Engineering, or related fields'
    ],
    location: 'Remote / Hybrid',
    employment_type: 'Internship',
    salary_range: 'IDR 8,500,000 - 12,000,000 / mo',
    deadline: '2026-12-15',
    application_url: 'https://linear.app/careers',
    status: 'ACTIVE',
    created_at: '2026-11-10T08:00:00Z',
    is_saved: true,
    is_applied: false
  },
  {
    id: 'job-02',
    company_id: 'comp-02',
    company: {
      id: 'comp-02',
      name: 'Stripe',
      logo_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=128&auto=format&fit=crop&q=80',
      industry: 'Financial Infrastructure',
      location: 'Global / Singapore / Remote',
      website: 'https://stripe.com'
    },
    poster_id: 'user-alumni-01',
    poster: {
      full_name: 'Sarah Jenkins',
      role: 'ALUMNI',
      avatar_url: DEMO_USERS.alumni.avatar_url
    },
    title: 'Associate Product Designer (Fresh Graduate)',
    description: 'Design elegant payment flows, dashboard experiences, and design system components for businesses around the globe.',
    requirements: [
      'Portfolio showing end-to-end design thinking and typography craft',
      'Mastery of Figma components, tokens, and auto-layout',
      'Excellent verbal and visual communication skills',
      'Graduating 2026 or recent alumni'
    ],
    location: 'Singapore / Jakarta Remote',
    employment_type: 'Full-time',
    salary_range: 'Competitive Global Package',
    deadline: '2026-12-30',
    application_url: 'https://stripe.com/jobs',
    status: 'ACTIVE',
    created_at: '2026-11-08T12:00:00Z',
    is_saved: false,
    is_applied: false
  },
  {
    id: 'job-03',
    company_id: 'comp-03',
    company: {
      id: 'comp-03',
      name: 'Gojek (GoTo)',
      logo_url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=128&auto=format&fit=crop&q=80',
      industry: 'SuperApp & On-Demand',
      location: 'Jakarta HQ (Hybrid)',
      website: 'https://gojek.com'
    },
    poster_id: 'user-alumni-02',
    poster: {
      full_name: 'David Chen',
      role: 'ALUMNI',
      avatar_url: DEMO_USERS.alumni.avatar_url
    },
    title: 'Data Analyst Intern — FinTech & Growth',
    description: 'Analyze campus payment adoption metrics, run SQL queries, and construct visualization dashboards for executive review.',
    requirements: [
      'Strong SQL skills (joins, window functions, aggregations)',
      'Familiarity with Python (Pandas) or R for exploratory data analysis',
      'Experience building dashboards with Tableau, Metabase, or PowerBI',
      'Available for a 6-month full-time internship program'
    ],
    location: 'Jakarta HQ (Hybrid)',
    employment_type: 'Internship',
    salary_range: 'IDR 7,500,000 - 10,000,000 / mo',
    deadline: '2026-11-28',
    application_url: 'https://goto.company/careers',
    status: 'ACTIVE',
    created_at: '2026-11-05T09:30:00Z',
    is_saved: false,
    is_applied: true
  },
  {
    id: 'job-04',
    company_id: 'comp-04',
    company: {
      id: 'comp-04',
      name: 'Traveloka',
      logo_url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=128&auto=format&fit=crop&q=80',
      industry: 'Travel & Lifestyle Tech',
      location: 'Jakarta & Remote',
      website: 'https://traveloka.com'
    },
    poster_id: 'user-admin-01',
    poster: {
      full_name: 'Elena Rostova',
      role: 'ADMIN',
      avatar_url: DEMO_USERS.admin.avatar_url
    },
    title: 'Campus Brand Ambassador & Growth Lead',
    description: 'Lead community activations, organize campus popups, and drive university student engagement for lifestyle travel tech.',
    requirements: [
      'Enthusiastic student communicator active in campus student organizations',
      'Creative social media content skills (Shorts, Reels, TikTok)',
      'Strong leadership and event organizing capabilities',
      'Commitment of 12-15 hours per week'
    ],
    location: 'On-Campus / Remote',
    employment_type: 'Part-time',
    salary_range: 'IDR 4,000,000 - 6,000,000 + Travel Credits',
    deadline: '2026-12-10',
    application_url: 'https://traveloka.com/careers',
    status: 'ACTIVE',
    created_at: '2026-11-09T14:15:00Z',
    is_saved: true,
    is_applied: false
  }
];

export const INITIAL_PLATFORM_STATS: PlatformStats = {
  total_users: 12450,
  total_students: 8920,
  total_alumni: 2840,
  total_lecturers: 690,
  total_events: 512,
  total_jobs: 328,
  monthly_active_users: 9430,
  connection_count: 34120
};

export const UNIVERSITY_PARTNERS = [
  { name: 'Universitas Indonesia', abbr: 'UI' },
  { name: 'Institut Teknologi Bandung', abbr: 'ITB' },
  { name: 'Universitas Gadjah Mada', abbr: 'UGM' },
  { name: 'Institut Teknologi Sepuluh Nopember', abbr: 'ITS' },
  { name: 'Universitas Airlangga', abbr: 'UNAIR' },
  { name: 'BINUS University', abbr: 'BINUS' }
];

