import React from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useEventStore } from '../../store/useEventStore';
import { useCareerStore } from '../../store/useCareerStore';
import { useCommunityStore } from '../../store/useCommunityStore';
import { RoleBadge } from '../../components/ui/RoleBadge';
import { Button } from '../../components/ui/Button';
import { 
  Users, 
  Calendar, 
  Briefcase, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  GraduationCap, 
  BookOpen 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  CartesianGrid 
} from 'recharts';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { events } = useEventStore();
  const { jobs } = useCareerStore();
  const { members } = useCommunityStore();

  const studentsCount = 8920;
  const alumniCount = 2840;
  const lecturersCount = 690;
  const totalUsers = studentsCount + alumniCount + lecturersCount;

  // Chart data: Monthly Active Users trend (2026)
  const mauData = [
    { month: 'Jun', users: 5400, events: 42 },
    { month: 'Jul', users: 6100, events: 50 },
    { month: 'Aug', users: 7200, events: 65 },
    { month: 'Sep', users: 8900, events: 88 },
    { month: 'Oct', users: 10400, events: 95 },
    { month: 'Nov', users: 12450, events: 110 }
  ];

  // Faculty distribution data
  const facultyData = [
    { faculty: 'Comp Sci', members: 3400 },
    { faculty: 'Engineering', members: 2800 },
    { faculty: 'Business', members: 2500 },
    { faculty: 'Design', members: 1900 },
    { faculty: 'Comm', members: 1400 },
    { faculty: 'Medicine', members: 1200 }
  ];

  // Verification queue
  const pendingVerifications = [
    {
      id: 'ver-1',
      name: 'Kevin Pratama',
      email: 'kevin.p@student.ui.ac.id',
      role: 'STUDENT' as const,
      document: 'Student ID Card (NPM: 210672109)',
      requestedAt: '2 hours ago'
    },
    {
      id: 'ver-2',
      name: 'Nadia Salsabila',
      email: 'nadia.s@alumni.itb.ac.id',
      role: 'ALUMNI' as const,
      document: 'LinkedIn & Diploma Verification',
      requestedAt: '4 hours ago'
    },
    {
      id: 'ver-3',
      name: 'Prof. Bambang Tri',
      email: 'bambang.t@ugm.ac.id',
      role: 'LECTURER' as const,
      document: 'Faculty Staff ID (NIDN: 00192831)',
      requestedAt: 'Yesterday'
    }
  ];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-[#EAEAEA] p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#111111] text-white flex items-center justify-center border border-neutral-800 shrink-0">
            <ShieldCheck className="w-7 h-7 text-[#7865F5]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-2xl font-extrabold text-[#111111] tracking-tight">
                CAMPLY Governance & Platform Admin
              </h2>
              <RoleBadge role="ADMIN" size="sm" />
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#111111] text-white">
                Admin Only
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Platform Operations Console • Ecosystem Oversight & Campus Analytics
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-neutral-600">All Campus Systems Operational</span>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/80 shadow-2xs">
          <span className="text-[11px] font-semibold text-neutral-400 block mb-1">Total Members</span>
          <span className="text-xl sm:text-2xl font-extrabold text-neutral-900">{totalUsers.toLocaleString()}</span>
          <span className="text-[10px] text-emerald-600 font-medium block mt-1">+14% MoM</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/80 shadow-2xs">
          <span className="text-[11px] font-semibold text-neutral-400 block mb-1">Active Students</span>
          <span className="text-xl sm:text-2xl font-extrabold text-blue-600">{studentsCount.toLocaleString()}</span>
          <span className="text-[10px] text-neutral-400 block mt-1">Undergrad/Postgrad</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/80 shadow-2xs">
          <span className="text-[11px] font-semibold text-neutral-400 block mb-1">Verified Alumni</span>
          <span className="text-xl sm:text-2xl font-extrabold text-[#7865F5]">{alumniCount.toLocaleString()}</span>
          <span className="text-[10px] text-neutral-400 block mt-1">Industry Leaders</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/80 shadow-2xs">
          <span className="text-[11px] font-semibold text-neutral-400 block mb-1">Faculty & Staff</span>
          <span className="text-xl sm:text-2xl font-extrabold text-emerald-600">{lecturersCount.toLocaleString()}</span>
          <span className="text-[10px] text-neutral-400 block mt-1">Across 20 Faculties</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/80 shadow-2xs">
          <span className="text-[11px] font-semibold text-neutral-400 block mb-1">Campus Events</span>
          <span className="text-xl sm:text-2xl font-extrabold text-neutral-900">{events.length * 85}+</span>
          <span className="text-[10px] text-neutral-400 block mt-1">Active summits</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/80 shadow-2xs">
          <span className="text-[11px] font-semibold text-neutral-400 block mb-1">Job Vacancies</span>
          <span className="text-xl sm:text-2xl font-extrabold text-neutral-900">{jobs.length * 60}+</span>
          <span className="text-[10px] text-neutral-400 block mt-1">Partner postings</span>
        </div>
      </div>

      {/* Analytics Charts with Recharts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Active User Growth Chart */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#EAEAEA] p-6 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-neutral-900 text-base">Monthly Active Ecosystem Growth</h3>
              <p className="text-xs text-neutral-400">Total active users on platform throughout 2026</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              +24% vs Q3
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mauData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7865F5" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#7865F5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#929292' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#929292' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111111',
                    borderRadius: '12px',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '12px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#7865F5"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#userGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Member Distribution By Faculty */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#EAEAEA] p-6 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-neutral-900 text-base">Faculty Distribution</h3>
              <p className="text-xs text-neutral-400">Top disciplines by registered members</p>
            </div>
            <span className="text-xs text-neutral-400 font-semibold">2026 Cohort</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={facultyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                <XAxis dataKey="faculty" tick={{ fontSize: 10, fill: '#929292' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#929292' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111111',
                    borderRadius: '12px',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="members" fill="#111111" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Verification Queue & Moderation Table */}
      <div className="bg-white rounded-3xl border border-[#EAEAEA] p-6 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-neutral-900 text-base">Campus Verification & Moderation Queue</h3>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#111111] text-white">
              Admin Only
            </span>
          </div>
          <span className="text-xs bg-amber-50 text-amber-800 font-semibold px-3 py-1 rounded-full">
            {pendingVerifications.length} Pending Approval
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-100 text-neutral-400 font-semibold pb-3">
                <th className="py-2.5 px-3">Applicant Name</th>
                <th className="py-2.5 px-3">University Email</th>
                <th className="py-2.5 px-3">Role</th>
                <th className="py-2.5 px-3">Verification Asset</th>
                <th className="py-2.5 px-3">Submitted</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {pendingVerifications.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/70 transition-colors">
                  <td className="py-3 px-3 font-bold text-neutral-900">{item.name}</td>
                  <td className="py-3 px-3 text-neutral-500 font-mono text-[11px]">{item.email}</td>
                  <td className="py-3 px-3">
                    <RoleBadge role={item.role} size="sm" showDot={false} />
                  </td>
                  <td className="py-3 px-3 text-neutral-600">{item.document}</td>
                  <td className="py-3 px-3 text-neutral-400">{item.requestedAt}</td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                        title="Approve"
                      >
                        Approve
                      </button>
                      <button
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                        title="Reject"
                      >
                        Dismiss
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

