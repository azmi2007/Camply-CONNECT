-- CAMPLY SEED DATA
-- Comprehensive demo dataset for university networking, events, jobs, and mentorship

-- 1. Insert Universities
INSERT INTO public.universities (id, name, short_name, logo_url, city, website)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'Universitas Indonesia', 'UI', 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=128&auto=format&fit=crop&q=80', 'Depok', 'https://ui.ac.id'),
    ('22222222-2222-2222-2222-222222222222', 'Institut Teknologi Bandung', 'ITB', 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=128&auto=format&fit=crop&q=80', 'Bandung', 'https://itb.ac.id'),
    ('33333333-3333-3333-3333-333333333333', 'Universitas Gadjah Mada', 'UGM', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=128&auto=format&fit=crop&q=80', 'Yogyakarta', 'https://ugm.ac.id')
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Profiles (Key Demo Roles)
INSERT INTO public.profiles (
    id, full_name, email, role, avatar_url, bio, headline,
    university, faculty, major,
    student_id, enrollment_year, expected_graduation_year,
    graduation_year, current_company, current_position,
    department, lecturer_id, is_mentor_available, mentor_expertise, skills
)
VALUES
    -- Student Demo Account
    (
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        'Alex Rivera',
        'alex.student@camply.edu',
        'STUDENT',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=256&auto=format&fit=crop&q=80',
        'Senior CS student passionate about distributed systems and interactive web applications. Lead organizer of Campus Hackathon.',
        'Undergraduate CS Student | Full-Stack & UI Enthusiast',
        'Universitas Indonesia', 'Computer Science', 'Informatics Engineering',
        'CS-2023-8891', 2023, 2027,
        NULL, NULL, NULL,
        NULL, NULL, FALSE, '{}', ARRAY['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS']
    ),
    -- Alumni Demo Account (Active Mentor)
    (
        'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        'Sarah Jenkins',
        'sarah.alumni@camply.edu',
        'ALUMNI',
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=256&auto=format&fit=crop&q=80',
        'Class of 2021. Senior Product Designer helping early-career students transition into product strategy and design systems.',
        'Senior Product Designer @ Stripe • Alum 2021',
        'Universitas Indonesia', 'Art & Design', 'Visual Communication Design',
        NULL, NULL, NULL,
        2021, 'Stripe', 'Senior Product Designer',
        NULL, NULL, TRUE, ARRAY['Portfolio Review', 'Design Systems', 'Interview Prep', 'Career Transition'], ARRAY['Figma', 'Design Systems', 'User Research', 'Prototyping']
    ),
    -- Lecturer Demo Account
    (
        'cccccccc-cccc-cccc-cccc-cccccccccccc',
        'Dr. Marcus Vance',
        'marcus.lecturer@camply.edu',
        'LECTURER',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&auto=format&fit=crop&q=80',
        'Associate Professor in Computer Systems & Cloud Architectures. Faculty advisor for Student Innovation Lab.',
        'Associate Professor of Computer Science | Lab Director',
        'Universitas Indonesia', 'Computer Science', 'Computer Engineering',
        NULL, NULL, NULL,
        NULL, NULL, NULL,
        'Computer Systems & Architecture', 'LEC-40918', TRUE, ARRAY['Academic Research', 'Master/PhD Guidance', 'Cloud Architecture'], ARRAY['Distributed Systems', 'Cloud Computing', 'Research Methodology']
    ),
    -- Admin Demo Account
    (
        'dddddddd-dddd-dddd-dddd-dddddddddddd',
        'Elena Rostova',
        'admin@camply.edu',
        'ADMIN',
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=256&auto=format&fit=crop&q=80',
        'Platform Administrator & Director of University Corporate Partnerships.',
        'CAMPLY Ecosystem Director & University Partnerships',
        'Universitas Indonesia', 'Administration', 'Campus Relations',
        NULL, NULL, NULL,
        NULL, NULL, NULL,
        'University Relations', 'ADM-001', FALSE, '{}', ARRAY['Community Management', 'Partnership', 'Governance']
    ),
    -- Additional Alumni
    (
        'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
        'David Chen',
        'david.chen@alum.camply.edu',
        'ALUMNI',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=256&auto=format&fit=crop&q=80',
        'Tech Lead at Google Cloud. Former hackathon winner, happy to review resumes and share software engineering insights.',
        'Staff Software Engineer @ Google • Alum 2019',
        'Institut Teknologi Bandung', 'Engineering', 'Electrical & Informatics',
        NULL, NULL, NULL,
        2019, 'Google', 'Staff Software Engineer',
        NULL, NULL, TRUE, ARRAY['System Design', 'FAANG Interview Prep', 'Go/Rust', 'Cloud Infrastructure'], ARRAY['Go', 'Kubernetes', 'GCP', 'Distributed Systems']
    ),
    -- Additional Student
    (
        'ffffffff-ffff-ffff-ffff-ffffffffffff',
        'Maya Putri',
        'maya.putri@student.camply.edu',
        'STUDENT',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&auto=format&fit=crop&q=80',
        'Junior studying Business Economics. Looking for investment banking and management consulting internships.',
        'Economics Major | President of Finance Student Club',
        'Universitas Indonesia', 'Business & Economics', 'Finance',
        'BE-2024-1102', 2024, 2028,
        NULL, NULL, NULL,
        NULL, NULL, FALSE, '{}', ARRAY['Financial Modeling', 'Data Analysis', 'Market Research', 'Valuation']
    )
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Companies
INSERT INTO public.companies (id, name, logo_url, industry, location, website, description)
VALUES
    ('c1111111-1111-1111-1111-111111111111', 'Linear Technologies', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&auto=format&fit=crop&q=80', 'Software & DevTools', 'San Francisco & Remote', 'https://linear.app', 'Building the issue tracking tool you actually enjoy using.'),
    ('c2222222-2222-2222-2222-222222222222', 'Stripe', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=128&auto=format&fit=crop&q=80', 'Financial Technology', 'Global / Remote', 'https://stripe.com', 'Financial infrastructure for the internet.'),
    ('c3333333-3333-3333-3333-333333333333', 'Gojek (GoTo)', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=128&auto=format&fit=crop&q=80', 'SuperApp & On-Demand', 'Jakarta, Indonesia', 'https://gojek.com', 'Leading on-demand mobile platform in Southeast Asia.'),
    ('c4444444-4444-4444-4444-444444444444', 'Traveloka', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=128&auto=format&fit=crop&q=80', 'Travel & Lifestyle Tech', 'Jakarta & Singapore', 'https://traveloka.com', 'Southeast Asia’s leading travel platform.')
ON CONFLICT (id) DO NOTHING;

-- 4. Insert Events (Synced with November 2026 / December 2026 calendar)
INSERT INTO public.events (
    id, organizer_id, title, description, banner_url, category,
    event_date, start_time, end_time, location, is_online, online_link,
    max_participants, current_participants, status, tags
)
VALUES
    (
        'e1111111-1111-1111-1111-111111111111',
        'cccccccc-cccc-cccc-cccc-cccccccccccc',
        'AI Engineering & Future of Campus Tech 2026',
        'Join top engineering leaders and faculty members for a deep-dive into LLM agents, scalable architectures, and next-generation student startups.',
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
        'Seminar',
        '2026-11-16', '13:30:00', '16:00:00', 'Auditorium Gd. A, Lt. 3 & Live Zoom', TRUE, 'https://meet.camply.edu/ai-summit',
        250, 184, 'UPCOMING', ARRAY['AI', 'Engineering', 'Keynote', 'Research']
    ),
    (
        'e2222222-2222-2222-2222-222222222222',
        'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        'Product Design Sprint: From Zero to Pitch',
        'Hands-on interactive workshop crafting design systems in Figma with real-time feedback from alumni lead designers.',
        'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&auto=format&fit=crop&q=80',
        'Workshop',
        '2026-11-18', '09:00:00', '12:00:00', 'Design Innovation Lab 204', FALSE, NULL,
        50, 42, 'UPCOMING', ARRAY['UI/UX', 'Product', 'Portfolio', 'Mentorship']
    ),
    (
        'e3333333-3333-3333-3333-333333333333',
        'dddddddd-dddd-dddd-dddd-dddddddddddd',
        'Annual University Career & Internship Fair 2026',
        'Connect with over 40+ leading tech startups, multinational consultancies, and unicorn tech employers looking for student talent.',
        'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
        'Career Fair',
        '2026-11-20', '10:00:00', '17:00:00', 'Main University Convention Center', FALSE, NULL,
        1000, 740, 'UPCOMING', ARRAY['Career', 'Internship', 'Networking', 'Hiring']
    ),
    (
        'e4444444-4444-4444-4444-444444444444',
        'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
        'Alumni Night: Global Tech Engineering Meetup',
        'Exclusive casual evening networking connecting current seniors with alumni working abroad at Google, Stripe, and Meta.',
        'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop&q=80',
        'Networking',
        '2026-11-25', '18:30:00', '21:00:00', 'The Alumni Club Lounge & Rooftop', FALSE, NULL,
        80, 68, 'UPCOMING', ARRAY['Alumni', 'Networking', 'SiliconValley', 'GlobalCareers']
    ),
    (
        'e5555555-5555-5555-5555-555555555555',
        'cccccccc-cccc-cccc-cccc-cccccccccccc',
        'National Campus Hackathon: Build for Impact',
        '48-hour sprint building applications addressing climate, education, and campus efficiency. Mentored by faculty and alumni.',
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80',
        'Competition',
        '2026-12-05', '08:00:00', '18:00:00', 'Innovation Hall & Discord', TRUE, 'https://hackathon.camply.edu',
        120, 95, 'UPCOMING', ARRAY['Hackathon', 'Coding', 'Prizes', 'Innovation']
    )
ON CONFLICT (id) DO NOTHING;

-- 5. Insert Job Vacancies
INSERT INTO public.job_vacancies (
    id, company_id, poster_id, title, description, requirements,
    location, employment_type, salary_range, deadline, application_url, status
)
VALUES
    (
        'j1111111-1111-1111-1111-111111111111',
        'c1111111-1111-1111-1111-111111111111',
        'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        'Frontend Software Engineer Intern (Summer 2027)',
        'Join the frontend core product team. You will work on real user-facing features using React, TypeScript, and modern animation libraries.',
        ARRAY['Proficiency with React and TypeScript', 'Understanding of web performance & accessibility', 'Experience with Tailwind or modern CSS', 'Active enrollment in CS/related field'],
        'Remote / Jakarta Hybrid',
        'Internship',
        'IDR 8,000,000 - 12,000,000 / mo',
        '2026-12-15',
        'https://linear.app/careers/intern-frontend',
        'ACTIVE'
    ),
    (
        'j2222222-2222-2222-2222-222222222222',
        'c2222222-2222-2222-2222-222222222222',
        'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        'Associate Product Designer (Fresh Graduate)',
        'Design elegant interfaces and design system components for payment flows used by millions worldwide.',
        ARRAY['Strong portfolio demonstrating UX thinking', 'Expertise in Figma & auto-layout', 'Ability to collaborate with engineers', 'Degree in Design, HCI or related'],
        'Singapore / Jakarta Remote',
        'Full-time',
        'Competitive Global Salary',
        '2026-12-30',
        'https://stripe.com/jobs/associate-designer',
        'ACTIVE'
    ),
    (
        'j3333333-3333-3333-3333-333333333333',
        'c3333333-3333-3333-3333-333333333333',
        'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
        'Data Analyst Intern — FinTech Growth',
        'Analyze campus payment adoption metrics, run SQL queries, and construct visualization dashboards for executive review.',
        ARRAY['SQL proficiency', 'Python or R for exploratory data analysis', 'Familiarity with Tableau or Metabase', 'Strong analytical mindset'],
        'Jakarta HQ (Hybrid)',
        'Internship',
        'IDR 7,500,000 - 10,000,000 / mo',
        '2026-11-28',
        'https://goto.company/careers/data-analyst-intern',
        'ACTIVE'
    ),
    (
        'j4444444-4444-4444-4444-444444444444',
        'c4444444-4444-4444-4444-444444444444',
        'dddddddd-dddd-dddd-dddd-dddddddddddd',
        'Campus Brand Ambassador & Growth Lead',
        'Lead community activations, organize campus popups, and drive university student engagement for lifestyle travel tech.',
        ARRAY['Passionate communicator', 'Active student organization experience', 'Creative social content creator', 'Available 15 hours/week'],
        'On-Campus / Remote',
        'Part-time',
        'IDR 4,000,000 - 6,000,000 + Travel Perks',
        '2026-12-10',
        'https://traveloka.com/careers/ambassador',
        'ACTIVE'
    )
ON CONFLICT (id) DO NOTHING;

