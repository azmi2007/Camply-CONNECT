import { Profile, EventItem, JobVacancy, PlatformStats, FacultyInfo, NotificationItem } from '../types';

export const DEMO_USERS: Record<string, Profile> = {
  student: {
    id: 'user-student-01',
    full_name: 'Alex Rivera',
    email: 'alex.student@camply.edu',
    role: 'STUDENT',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=256&auto=format&fit=crop&q=80',
    cover_url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80',
    headline: 'Undergraduate CS Student | Full-Stack & UI Enthusiast',
    bio: 'Senior computer science student passionate about distributed systems and interactive web design. Lead organizer of the annual Campus Hackathon and active contributor to open-source student developer tooling.',
    university: 'Universitas Indonesia',
    faculty: 'Computer Science',
    major: 'Informatics Engineering',
    location: 'Depok, Indonesia',
    industry: 'Software Engineering',
    interests: ['Distributed Systems', 'UI Architecture', 'AI Agents', 'Open Source'],
    student_id: 'CS-2023-8891',
    enrollment_year: 2023,
    expected_graduation_year: 2027,
    is_innovator: true,
    project_title: 'Camply OpenCourse AI',
    achievement: '1st Place National Campus Hackathon 2026',
    activity_indicator: '14 events hosted • 28 contributions',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Figma'],
    connections_count: 142,
    mutual_connections: 18,
    linkedin_url: 'https://linkedin.com/in/alex-rivera-camply',
    github_url: 'https://github.com/alex-rivera',
    experiences: [
      {
        id: 'exp-s1',
        role: 'Software Engineering Intern',
        company: 'GoTo Financial',
        duration: 'Jun 2026 - Sep 2026',
        location: 'Jakarta, Indonesia',
        description: 'Built internal settlement monitoring dashboards in React and TypeScript, reducing triage latency by 32%.'
      },
      {
        id: 'exp-s2',
        role: 'Lead Frontend Developer',
        company: 'RISTEK Fasilkom UI',
        duration: 'Jan 2025 - Present',
        location: 'Depok, Indonesia',
        description: 'Mentored 12 junior student engineers and shipped campus course planning web apps serving 4,500+ students.'
      }
    ],
    education: [
      {
        id: 'edu-s1',
        institution: 'Universitas Indonesia',
        degree: 'B.Sc. in Computer Science',
        field: 'Informatics Engineering',
        period: '2023 - 2027 (Expected)'
      }
    ],
    created_at: '2024-09-01T08:00:00Z'
  },
  alumni: {
    id: 'user-alumni-01',
    full_name: 'Sarah Jenkins',
    email: 'sarah.alumni@camply.edu',
    role: 'ALUMNI',
    avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=256&auto=format&fit=crop&q=80',
    cover_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80',
    headline: 'Senior Product Designer @ Stripe • Alum 2021',
    bio: 'Class of 2021. Senior Product Designer helping early-career students transition into product strategy and design systems. Previously led checkout accessibility initiatives across APAC.',
    university: 'Universitas Indonesia',
    faculty: 'Design & Creative',
    major: 'Visual Communication Design',
    location: 'Singapore',
    industry: 'Financial Technology',
    interests: ['Design Systems', 'Accessibility', 'Typography', 'Product Strategy'],
    graduation_year: 2021,
    current_company: 'Stripe',
    current_position: 'Senior Product Designer',
    is_innovator: true,
    project_title: 'APAC Student Design Fellowship',
    achievement: 'Mentored 45+ UI/UX graduates into global teams',
    activity_indicator: 'Active Mentor • 12 sessions this month',
    is_mentor_available: true,
    mentor_expertise: ['Portfolio Review', 'Design Systems', 'Interview Prep', 'Career Transition'],
    skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping', 'Product Strategy'],
    connections_count: 384,
    mutual_connections: 32,
    linkedin_url: 'https://linkedin.com/in/sarah-jenkins-design',
    portfolio_url: 'https://sarahjenkins.design',
    experiences: [
      {
        id: 'exp-a1',
        role: 'Senior Product Designer',
        company: 'Stripe',
        duration: 'Mar 2024 - Present',
        location: 'Singapore',
        description: 'Leading design systems and merchant onboarding experiences across Southeast Asia.'
      },
      {
        id: 'exp-a2',
        role: 'Product Designer',
        company: 'Traveloka',
        duration: 'Jul 2021 - Feb 2024',
        location: 'Jakarta, Indonesia',
        description: 'Redesigned multi-city flight booking flow increasing mobile conversion by 14%.'
      }
    ],
    education: [
      {
        id: 'edu-a1',
        institution: 'Universitas Indonesia',
        degree: 'Bachelor of Design (S.Ds.)',
        field: 'Visual Communication Design',
        period: '2017 - 2021'
      }
    ],
    created_at: '2023-01-15T10:00:00Z'
  },
  lecturer: {
    id: 'user-lecturer-01',
    full_name: 'Dr. Marcus Vance',
    email: 'marcus.lecturer@camply.edu',
    role: 'LECTURER',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&auto=format&fit=crop&q=80',
    cover_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80',
    headline: 'Associate Professor of Computer Science | Lab Director',
    bio: 'Associate Professor in Computer Systems & Cloud Architectures. Faculty advisor for Student Innovation Lab and mentor for graduate research.',
    university: 'Universitas Indonesia',
    faculty: 'Computer Science',
    major: 'Computer Engineering',
    location: 'Depok, Indonesia',
    industry: 'Higher Education & Research',
    interests: ['Cloud Architecture', 'Edge AI', 'Distributed Consensus', 'Academic Publishing'],
    department: 'Computer Systems & Architecture',
    lecturer_id: 'LEC-40918',
    is_innovator: true,
    project_title: 'Campus Edge Compute Grid',
    achievement: 'Published 24 IEEE peer-reviewed papers with students',
    activity_indicator: 'Lab Director • 6 research grants active',
    is_mentor_available: true,
    mentor_expertise: ['Academic Research', 'Master/PhD Guidance', 'Cloud Architecture'],
    skills: ['Distributed Systems', 'Cloud Computing', 'Research Methodology', 'Kubernetes'],
    connections_count: 512,
    mutual_connections: 45,
    linkedin_url: 'https://linkedin.com/in/dr-marcus-vance',
    experiences: [
      {
        id: 'exp-l1',
        role: 'Associate Professor & Lab Director',
        company: 'Universitas Indonesia',
        duration: '2019 - Present',
        location: 'Depok, Indonesia',
        description: 'Directing the Cloud & Distributed Systems Research Lab with 18 active undergraduate and master researchers.'
      }
    ],
    education: [
      {
        id: 'edu-l1',
        institution: 'ETH Zürich',
        degree: 'Ph.D. in Computer Science',
        field: 'Distributed Systems',
        period: '2014 - 2018'
      }
    ],
    created_at: '2022-08-10T09:00:00Z'
  },
  admin: {
    id: 'user-admin-01',
    full_name: 'Elena Rostova',
    email: 'admin@camply.edu',
    role: 'ADMIN',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=256&auto=format&fit=crop&q=80',
    cover_url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&auto=format&fit=crop&q=80',
    headline: 'CAMPLY Ecosystem Director & University Partnerships',
    bio: 'Platform Administrator & Director of University Corporate Partnerships overseeing student development and alumni networking programs.',
    university: 'Universitas Indonesia',
    faculty: 'Business & Management',
    department: 'University Relations',
    location: 'Jakarta, Indonesia',
    industry: 'Education Leadership',
    lecturer_id: 'ADM-001',
    skills: ['Community Governance', 'University Relations', 'Data Analytics'],
    connections_count: 1240,
    linkedin_url: 'https://linkedin.com/in/elena-rostova-edu',
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
    cover_url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop&q=80',
    headline: 'Staff Software Engineer @ Google • Alum 2019',
    bio: 'Former hackathon winner. Tech Lead working on Google Cloud networking infrastructure. Happy to review student code and share technical interview strategies.',
    university: 'Institut Teknologi Bandung',
    faculty: 'Engineering',
    major: 'Electrical & Informatics Engineering',
    location: 'Mountain View, CA',
    industry: 'Cloud Infrastructure',
    interests: ['High-Throughput Networking', 'Go & Rust', 'Mentoring', 'Competitive Programming'],
    graduation_year: 2019,
    current_company: 'Google',
    current_position: 'Staff Software Engineer',
    is_innovator: true,
    project_title: 'OpenNet Telemetry SDK',
    achievement: 'ICPC World Finalist & Google Cloud Top Contributor',
    activity_indicator: '8 technical workshops led',
    is_mentor_available: true,
    mentor_expertise: ['System Design', 'FAANG Interview Prep', 'Cloud Infrastructure', 'Go/Rust'],
    skills: ['Go', 'Kubernetes', 'GCP', 'Distributed Systems'],
    connections_count: 620,
    mutual_connections: 24,
    linkedin_url: 'https://linkedin.com/in/david-chen-cloud',
    experiences: [
      {
        id: 'exp-dc1',
        role: 'Staff Software Engineer',
        company: 'Google',
        duration: '2022 - Present',
        location: 'Mountain View, CA',
        description: 'Architecting software-defined load balancers for Google Cloud Platform.'
      },
      {
        id: 'exp-dc2',
        role: 'Software Engineer',
        company: 'Traveloka',
        duration: '2019 - 2021',
        location: 'Jakarta, Indonesia',
        description: 'Scaled core search microservice handling 25k RPS during peak holiday travel.'
      }
    ],
    education: [
      {
        id: 'edu-dc1',
        institution: 'Institut Teknologi Bandung',
        degree: 'B.Eng. in Informatics',
        field: 'Electrical & Informatics Engineering',
        period: '2015 - 2019'
      }
    ]
  },
  {
    id: 'user-student-02',
    full_name: 'Maya Putri',
    email: 'maya.putri@student.camply.edu',
    role: 'STUDENT',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&auto=format&fit=crop&q=80',
    cover_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    headline: 'Economics Major | President of Finance Student Club',
    bio: 'Junior studying Business Economics. Passionate about venture capital, fintech adoption, and ESG sustainable investing across ASEAN.',
    university: 'Universitas Indonesia',
    faculty: 'Economics',
    major: 'Finance & Banking',
    location: 'Jakarta, Indonesia',
    industry: 'Financial Services',
    interests: ['Venture Capital', 'ESG Finance', 'Quantitative Macro', 'Fintech'],
    student_id: 'BE-2024-1102',
    enrollment_year: 2024,
    expected_graduation_year: 2028,
    is_innovator: true,
    project_title: 'ASEAN Youth Micro-Venture Fund',
    achievement: 'CFA Research Challenge National Finalist',
    activity_indicator: 'Organized 5 FinTech panels',
    skills: ['Financial Modeling', 'Data Analysis', 'Market Research', 'Valuation'],
    connections_count: 210,
    mutual_connections: 14,
    linkedin_url: 'https://linkedin.com/in/maya-putri-econ'
  },
  {
    id: 'user-alumni-03',
    full_name: 'Clarissa Wong',
    email: 'clarissa.w@alum.camply.edu',
    role: 'ALUMNI',
    avatar_url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=256&auto=format&fit=crop&q=80',
    cover_url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&auto=format&fit=crop&q=80',
    headline: 'Product Marketing Manager @ Linear • Alum 2020',
    bio: 'Bridging technical engineering and high-impact storytelling. Passionate about developer tooling, brand clarity, and product-led growth.',
    university: 'Universitas Indonesia',
    faculty: 'Communication',
    major: 'Strategic Communications',
    location: 'San Francisco, CA',
    industry: 'Developer Tools & SaaS',
    interests: ['Product Positioning', 'Editorial Design', 'Developer Advocacy', 'SaaS Growth'],
    graduation_year: 2020,
    current_company: 'Linear',
    current_position: 'Product Marketing Manager',
    is_mentor_available: true,
    mentor_expertise: ['Go-To-Market', 'Developer Marketing', 'Resume Polish'],
    skills: ['GTM Strategy', 'Brand Architecture', 'Copywriting', 'SaaS Growth'],
    connections_count: 430,
    mutual_connections: 29,
    linkedin_url: 'https://linkedin.com/in/clarissa-wong-pmm',
    experiences: [
      {
        id: 'exp-cw1',
        role: 'Product Marketing Manager',
        company: 'Linear',
        duration: '2023 - Present',
        location: 'San Francisco, CA',
        description: 'Driving global launches and developer community storytelling for Linear.'
      }
    ],
    education: [
      {
        id: 'edu-cw1',
        institution: 'Universitas Indonesia',
        degree: 'B.A. in Communication Science',
        field: 'Strategic Communications',
        period: '2016 - 2020'
      }
    ]
  },
  {
    id: 'user-lecturer-02',
    full_name: 'Prof. Anindya Wardhana',
    email: 'anindya.w@camply.edu',
    role: 'LECTURER',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&auto=format&fit=crop&q=80',
    cover_url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&auto=format&fit=crop&q=80',
    headline: 'Professor of Bioengineering & Medical Informatics',
    bio: 'Leading genomics computational research at the Medical Informatics Center. Passionate about multidisciplinary healthtech projects.',
    university: 'Universitas Indonesia',
    faculty: 'Medicine & Health',
    major: 'Medical Informatics',
    location: 'Jakarta, Indonesia',
    industry: 'Healthcare & Biotech',
    interests: ['Precision Medicine', 'Genomics AI', 'Bioengineering'],
    department: 'Biomedical Informatics',
    lecturer_id: 'LEC-99214',
    is_innovator: true,
    project_title: 'OpenGenomics Diagnostic Hub',
    achievement: 'National Biotech Innovation Award 2025',
    activity_indicator: 'Mentoring 10 HealthTech startups',
    is_mentor_available: true,
    mentor_expertise: ['HealthTech Startups', 'Grant Applications', 'Research Publishing'],
    skills: ['Bioinformatics', 'Machine Learning', 'Clinical Data', 'Python'],
    connections_count: 310,
    mutual_connections: 8,
    linkedin_url: 'https://linkedin.com/in/anindya-wardhana'
  },
  {
    id: 'user-alumni-04',
    full_name: 'Rafi Pratama',
    email: 'rafi.pratama@alum.camply.edu',
    role: 'ALUMNI',
    avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=256&auto=format&fit=crop&q=80',
    cover_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80',
    headline: 'Management Consultant @ McKinsey & Company • Alum 2020',
    bio: 'Helping enterprises navigate digital transformation across Southeast Asia. Former president of the Business & Strategy Case Club.',
    university: 'Universitas Gadjah Mada',
    faculty: 'Business & Management',
    major: 'Strategic Management',
    location: 'Jakarta, Indonesia',
    industry: 'Management Consulting',
    interests: ['Corporate Strategy', 'Digital Transformation', 'Case Competitions'],
    graduation_year: 2020,
    current_company: 'McKinsey & Company',
    current_position: 'Engagement Manager',
    is_mentor_available: true,
    mentor_expertise: ['Case Interview Prep', 'Strategy Consulting', 'Leadership'],
    skills: ['Corporate Strategy', 'Financial Valuation', 'Executive Storytelling'],
    connections_count: 495,
    mutual_connections: 19,
    linkedin_url: 'https://linkedin.com/in/rafi-pratama',
    experiences: [
      {
        id: 'exp-rp1',
        role: 'Engagement Manager',
        company: 'McKinsey & Company',
        duration: '2022 - Present',
        location: 'Jakarta, Indonesia',
        description: 'Advising regional banking and telco leaders on AI transformation.'
      }
    ],
    education: [
      {
        id: 'edu-rp1',
        institution: 'Universitas Gadjah Mada',
        degree: 'B.B.A. in Management',
        field: 'Strategic Management',
        period: '2016 - 2020'
      }
    ]
  },
  {
    id: 'user-alumni-05',
    full_name: 'Nadia Kusuma',
    email: 'nadia.kusuma@alum.camply.edu',
    role: 'ALUMNI',
    avatar_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=256&auto=format&fit=crop&q=80',
    cover_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&auto=format&fit=crop&q=80',
    headline: 'Technology & Venture Counsel @ AC Ventures • Alum 2018',
    bio: 'Corporate & tech venture counsel specializing in cross-border startup financing, IP law, and Southeast Asia regulatory frameworks.',
    university: 'Universitas Indonesia',
    faculty: 'Law',
    major: 'Technology & Corporate Law',
    location: 'Jakarta, Indonesia',
    industry: 'Legal & Venture Capital',
    interests: ['Startup Law', 'IP Strategy', 'Tech Policy'],
    graduation_year: 2018,
    current_company: 'AC Ventures',
    current_position: 'Senior Legal Counsel',
    is_mentor_available: true,
    mentor_expertise: ['Tech Law Careers', 'Venture Term Sheets', 'Bar Prep'],
    skills: ['Venture Financing', 'IP Law', 'M&A', 'Regulatory Compliance'],
    connections_count: 356,
    mutual_connections: 11,
    linkedin_url: 'https://linkedin.com/in/nadia-kusuma-law'
  },
  {
    id: 'user-student-03',
    full_name: 'Dimas Aditya',
    email: 'dimas.aditya@student.camply.edu',
    role: 'STUDENT',
    avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=256&auto=format&fit=crop&q=80',
    headline: 'Sociology & Urban Policy Senior | Campus Civic Lab Lead',
    bio: 'Researching smart-city transit equity and public digital infrastructure. Organizing weekly campus civic-tech roundtables.',
    university: 'Universitas Gadjah Mada',
    faculty: 'Social Sciences',
    major: 'Public Policy & Sociology',
    location: 'Yogyakarta, Indonesia',
    industry: 'Public Policy & Research',
    interests: ['Urban Policy', 'Civic Tech', 'Social Impact'],
    student_id: 'SS-2023-4420',
    enrollment_year: 2023,
    expected_graduation_year: 2027,
    is_innovator: true,
    project_title: 'TransitEquity Map Indonesia',
    achievement: 'ASEAN Civic Innovation Fellow 2026',
    activity_indicator: 'Led 9 civic-tech roundtables',
    skills: ['Policy Analysis', 'Qualitative Research', 'GIS Mapping', 'Public Speaking'],
    connections_count: 175,
    mutual_connections: 9
  }
];

export const COMMUNITY_CATEGORIES = [
  { name: 'Engineering', count: '2.8k members', icon: 'Cpu' },
  { name: 'Computer Science', count: '3.4k members', icon: 'Terminal' },
  { name: 'Business & Management', count: '2.5k members', icon: 'Briefcase' },
  { name: 'Communication', count: '1.4k members', icon: 'MessageSquare' },
  { name: 'Design & Creative', count: '1.9k members', icon: 'Palette' },
  { name: 'Medicine & Health', count: '1.2k members', icon: 'Stethoscope' },
  { name: 'Law', count: '980 members', icon: 'Scale' },
  { name: 'Economics', count: '1.6k members', icon: 'TrendingUp' },
  { name: 'Social Sciences', count: '1.1k members', icon: 'Globe' }
];

export const FACULTIES_DATA: FacultyInfo[] = [
  {
    id: 'fac-cs',
    name: 'Faculty of Computer Science',
    short_name: 'Fasilkom',
    category_key: 'Computer Science',
    description: 'Pioneering software engineering, artificial intelligence, cybersecurity, and human-computer interaction research.',
    member_count: 3420,
    alumni_count: 980,
    career_count: 112,
    departments: ['Informatics Engineering', 'Information Systems', 'Artificial Intelligence Lab', 'Data Science'],
    featured_communities: ['RISTEK Open Source', 'AI & Robotics Society', 'Competitive Programming Guild'],
    accent_color: '#7865F5'
  },
  {
    id: 'fac-eng',
    name: 'Faculty of Engineering',
    short_name: 'FT',
    category_key: 'Engineering',
    description: 'Advancing sustainable infrastructure, electrical systems, robotics, and clean energy engineering.',
    member_count: 2840,
    alumni_count: 1120,
    career_count: 84,
    departments: ['Electrical Engineering', 'Mechanical Engineering', 'Civil & Environmental', 'Industrial Engineering'],
    featured_communities: ['Autonomous Robotics Team', 'Solar Car Collective', 'IEEE Student Branch'],
    accent_color: '#2563EB'
  },
  {
    id: 'fac-eb',
    name: 'Faculty of Economics and Business',
    short_name: 'FEB',
    category_key: 'Business & Management',
    description: 'Developing global leaders in corporate strategy, venture capital, quantitative finance, and entrepreneurship.',
    member_count: 2510,
    alumni_count: 1340,
    career_count: 96,
    departments: ['Strategic Management', 'Finance & Banking', 'Accounting', 'Development Economics'],
    featured_communities: ['Campus Venture Fund', 'Management Consulting Club', 'Capital Markets Society'],
    accent_color: '#F5A623'
  },
  {
    id: 'fac-comm',
    name: 'Faculty of Communication',
    short_name: 'Fikom',
    category_key: 'Communication',
    description: 'Shaping digital media strategy, brand storytelling, journalism, and strategic public communications.',
    member_count: 1420,
    alumni_count: 540,
    career_count: 42,
    departments: ['Strategic Communications', 'Digital Journalism', 'Media & Cultural Studies'],
    featured_communities: ['Campus Editorial Press', 'Product Marketing Guild', 'Broadcast Studio'],
    accent_color: '#EC4899'
  },
  {
    id: 'fac-design',
    name: 'Faculty of Design & Creative Arts',
    short_name: 'FSRD',
    category_key: 'Design & Creative',
    description: 'Crafting visual communication, product UI/UX design systems, industrial design, and interactive digital art.',
    member_count: 1910,
    alumni_count: 670,
    career_count: 58,
    departments: ['Visual Communication Design', 'Product & Industrial Design', 'Interactive Media'],
    featured_communities: ['Design Systems Collective', 'Typography Workshop', 'Motion & 3D Lab'],
    accent_color: '#8B5CF6'
  },
  {
    id: 'fac-med',
    name: 'Faculty of Medicine',
    short_name: 'FK',
    category_key: 'Medicine & Health',
    description: 'Advancing clinical excellence, genomics, medical informatics, and public health innovation.',
    member_count: 1210,
    alumni_count: 490,
    career_count: 29,
    departments: ['Clinical Medicine', 'Biomedical Informatics', 'Public Health Policy'],
    featured_communities: ['HealthTech Innovators', 'Genomics Research Forum', 'Medical Volunteer Corps'],
    accent_color: '#16A36A'
  },
  {
    id: 'fac-law',
    name: 'Faculty of Law',
    short_name: 'FH',
    category_key: 'Law',
    description: 'Training legal scholars in corporate law, intellectual property, digital privacy, and international arbitration.',
    member_count: 980,
    alumni_count: 410,
    career_count: 24,
    departments: ['Corporate & Tech Law', 'International Law', 'Constitutional Studies'],
    featured_communities: ['Moot Court Society', 'Startup Legal Clinic', 'Tech Policy Initiative'],
    accent_color: '#0F172A'
  },
  {
    id: 'fac-econ',
    name: 'School of Economics',
    short_name: 'SE',
    category_key: 'Economics',
    description: 'Quantitative macroeconomics, econometrics, fintech research, and sustainable development policy.',
    member_count: 1620,
    alumni_count: 590,
    career_count: 47,
    departments: ['Applied Econometrics', 'Monetary Economics', 'Quantitative Finance'],
    featured_communities: ['Economic Policy Lab', 'Quant Research Group'],
    accent_color: '#059669'
  },
  {
    id: 'fac-ss',
    name: 'Faculty of Social Sciences',
    short_name: 'FISIP',
    category_key: 'Social Sciences',
    description: 'Exploring urban sociology, international relations, public policy, and civic innovation.',
    member_count: 1120,
    alumni_count: 380,
    career_count: 21,
    departments: ['Public Policy', 'International Relations', 'Sociology & Urban Studies'],
    featured_communities: ['Civic Tech Lab', 'Model United Nations', 'Urban Equity Forum'],
    accent_color: '#EA580C'
  }
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
    agenda: [
      '13:30 — Keynote: Autonomous Agents in Production',
      '14:30 — Panel: Research Lab to Venture-Backed Startup',
      '15:15 — Live Q&A & Faculty Coffee Networking'
    ],
    banner_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    category: 'Seminar',
    faculty: 'Computer Science',
    event_date: '2026-11-26',
    start_time: '13:30',
    end_time: '16:00',
    location: 'Auditorium Gd. A, Lt. 3 & Live Zoom',
    is_online: true,
    online_link: 'https://meet.camply.edu/ai-summit',
    registration_deadline: '2026-11-26',
    max_participants: 250,
    current_participants: 184,
    status: 'UPCOMING',
    is_featured: true,
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
      faculty: 'Design & Creative'
    },
    title: 'Product Design Sprint: From Zero to Pitch',
    description: 'Hands-on interactive workshop crafting design systems in Figma with real-time feedback from alumni lead designers at Stripe and Linear.',
    agenda: [
      '09:00 — Design Token Foundations & Typography',
      '10:15 — Rapid Component Prototyping Challenge',
      '11:15 — Live Critique with Stripe & Linear Designers'
    ],
    banner_url: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&auto=format&fit=crop&q=80',
    category: 'Workshop',
    faculty: 'Design & Creative',
    event_date: '2026-11-28',
    start_time: '09:00',
    end_time: '12:00',
    location: 'Design Innovation Lab 204',
    is_online: false,
    max_participants: 50,
    current_participants: 42,
    status: 'UPCOMING',
    is_featured: true,
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
      faculty: 'Business & Management'
    },
    title: 'Annual University Career & Internship Fair 2026',
    description: 'Connect with over 40+ leading tech startups, multinational consultancies, and unicorn tech employers looking for student talent.',
    agenda: [
      '10:00 — Opening & Partner Booth Showcase',
      '13:00 — On-the-spot Resume Clinic & Speed Interviews',
      '15:30 — Alumni Recruiter Fireside Chat'
    ],
    banner_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
    category: 'Career Fair',
    faculty: 'Business & Management',
    event_date: '2026-11-30',
    start_time: '10:00',
    end_time: '17:00',
    location: 'Main University Convention Center',
    is_online: false,
    max_participants: 1000,
    current_participants: 740,
    status: 'UPCOMING',
    is_featured: true,
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
    agenda: [
      '18:30 — Welcome Drinks & Icebreaker',
      '19:15 — Lightning Talks: Working Across Global Timezones',
      '20:00 — Open Rooftop Networking'
    ],
    banner_url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop&q=80',
    category: 'Networking',
    faculty: 'Engineering',
    event_date: '2026-12-02',
    start_time: '18:30',
    end_time: '21:00',
    location: 'The Alumni Club Lounge & Rooftop',
    is_online: false,
    max_participants: 80,
    current_participants: 68,
    status: 'UPCOMING',
    is_featured: true,
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
    agenda: [
      '08:00 — Team Formation & Problem Statement Briefing',
      '12:00 — Technical Mentor Office Hours',
      '16:00 — Demo Day Pitches & Award Ceremony'
    ],
    banner_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80',
    category: 'Competition',
    faculty: 'Computer Science',
    event_date: '2026-12-05',
    start_time: '08:00',
    end_time: '18:00',
    location: 'Innovation Hall & Discord',
    is_online: true,
    online_link: 'https://hackathon.camply.edu',
    max_participants: 120,
    current_participants: 95,
    status: 'UPCOMING',
    is_featured: true,
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
    category: 'Academic',
    faculty: 'Communication',
    event_date: '2026-11-27',
    start_time: '19:00',
    end_time: '20:30',
    location: 'CAMPLY Live Stage (Online)',
    is_online: true,
    online_link: 'https://live.camply.edu/masterclass-pmm',
    max_participants: 300,
    current_participants: 215,
    status: 'UPCOMING',
    is_featured: false,
    tags: ['Marketing', 'Product', 'SaaS', 'CareerTips'],
    is_registered: false
  },
  {
    id: 'event-07',
    organizer_id: 'user-lecturer-02',
    organizer: {
      full_name: 'Prof. Anindya Wardhana',
      avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&auto=format&fit=crop&q=80',
      role: 'LECTURER',
      faculty: 'Medicine & Health'
    },
    title: 'Symposium: AI in Precision Genomics & HealthTech',
    description: 'Faculty research showcase presenting recent clinical data science breakthroughs and undergraduate thesis opportunities.',
    banner_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80',
    category: 'Academic',
    faculty: 'Medicine & Health',
    event_date: '2026-11-18',
    start_time: '10:00',
    end_time: '12:30',
    location: 'Medical Research Auditorium',
    is_online: false,
    max_participants: 150,
    current_participants: 148,
    status: 'COMPLETED',
    is_featured: false,
    tags: ['HealthTech', 'Genomics', 'Research'],
    is_registered: true
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
    location: 'Jakarta / Global',
    work_mode: 'Remote',
    faculty: 'Computer Science',
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
    location: 'Singapore / APAC',
    work_mode: 'Hybrid',
    faculty: 'Design & Creative',
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
    location: 'Jakarta HQ',
    work_mode: 'Hybrid',
    faculty: 'Economics',
    employment_type: 'Internship',
    salary_range: 'IDR 7,500,000 - 10,000,000 / mo',
    deadline: '2026-12-05',
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
    location: 'Depok / On-Campus',
    work_mode: 'On-site',
    faculty: 'Communication',
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

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-01',
    user_id: 'user-student-01',
    title: 'Mentorship Request Accepted',
    message: 'Sarah Jenkins accepted your Portfolio Review mentorship request for Thursday.',
    type: 'MENTORSHIP',
    link: '/mentorship',
    is_read: false,
    created_at: '10m ago'
  },
  {
    id: 'notif-02',
    user_id: 'user-student-01',
    title: 'Event Starting Today',
    message: 'AI Engineering & Future of Campus Tech 2026 starts at 13:30 in Auditorium Gd. A.',
    type: 'EVENT',
    link: '/events/event-01',
    is_read: false,
    created_at: '1h ago'
  },
  {
    id: 'notif-03',
    user_id: 'user-student-01',
    title: 'New Internship Match',
    message: 'Linear posted Frontend Software Engineer Intern (Summer 2027) matching your skills.',
    type: 'JOB',
    link: '/careers',
    is_read: true,
    created_at: '5h ago'
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
