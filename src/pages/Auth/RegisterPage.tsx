import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '../../components/ui/Button';
import { RoleBadge } from '../../components/ui/RoleBadge';
import { UserRole } from '../../types';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  GraduationCap, 
  Briefcase, 
  BookOpen, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuthStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [role, setRole] = useState<UserRole>('STUDENT');

  // Step 2: Personal Info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Step 3: Academic / Professional Info
  const [university, setUniversity] = useState('Universitas Indonesia');
  const [faculty, setFaculty] = useState('Computer Science');
  const [major, setMajor] = useState('Software Engineering');

  // Student specific
  const [studentId, setStudentId] = useState('CS-2024-9021');
  const [enrollmentYear, setEnrollmentYear] = useState('2024');
  const [expectedGraduationYear, setExpectedGraduationYear] = useState('2028');

  // Alumni specific
  const [graduationYear, setGraduationYear] = useState('2022');
  const [currentCompany, setCurrentCompany] = useState('Google');
  const [currentPosition, setCurrentPosition] = useState('Software Engineer');

  // Lecturer specific
  const [department, setDepartment] = useState('Computer Systems');
  const [lecturerId, setLecturerId] = useState('LEC-88192');

  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    if (step === 1) setStep(2);
    else if (step === 2) {
      if (!fullName || !email || !password) return;
      setStep(3);
    } else if (step === 3) {
      handleCompleteRegistration();
    }
  };

  const handleCompleteRegistration = async () => {
    setIsLoading(true);
    try {
      await register({
        full_name: fullName,
        email,
        role,
        university,
        faculty,
        major,
        student_id: role === 'STUDENT' ? studentId : undefined,
        enrollment_year: role === 'STUDENT' ? Number(enrollmentYear) : undefined,
        expected_graduation_year: role === 'STUDENT' ? Number(expectedGraduationYear) : undefined,
        graduation_year: role === 'ALUMNI' ? Number(graduationYear) : undefined,
        current_company: role === 'ALUMNI' ? currentCompany : undefined,
        current_position: role === 'ALUMNI' ? currentPosition : undefined,
        department: role === 'LECTURER' ? department : undefined,
        lecturer_id: role === 'LECTURER' ? lecturerId : undefined
      });

      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 }
      });

      setStep(4);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-stretch">
      {/* Left Column: Editorial Banner */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#111111] text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#7865F5]/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-12">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white">
              <svg className="w-5 h-5 text-[#7865F5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 19L12 5L20 19" />
                <circle cx="4" cy="19" r="2" fill="#7865F5" />
                <circle cx="12" cy="5" r="2" fill="#FFFFFF" />
                <circle cx="20" cy="19" r="2" fill="#7865F5" />
              </svg>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              CAMPLY<span className="text-[#7865F5]">.</span>
            </span>
          </Link>

          <div className="max-w-md">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-neutral-300 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#7865F5]" />
              <span>Step-by-Step Onboarding</span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white leading-tight mb-4">
              Join the Premier University Network.
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed mb-8">
              Verify your campus identity to unlock tailored networking, mentorship, career recommendations, and exclusive events.
            </p>

            {/* Role Cards preview */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-white">Student Account</h5>
                    <p className="text-[11px] text-neutral-400">Discover internships & campus events</p>
                  </div>
                </div>
                <RoleBadge role="STUDENT" size="sm" showDot={false} />
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-white">Alumni Account</h5>
                    <p className="text-[11px] text-neutral-400">Mentor students & publish opportunities</p>
                  </div>
                </div>
                <RoleBadge role="ALUMNI" size="sm" showDot={false} />
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-white">Lecturer Account</h5>
                    <p className="text-[11px] text-neutral-400">Academic events & student engagement</p>
                  </div>
                </div>
                <RoleBadge role="LECTURER" size="sm" showDot={false} />
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-8 border-t border-white/10 text-xs text-neutral-400">
          <span>Official University Integration • End-to-End Privacy</span>
        </div>
      </div>

      {/* Right Column: Multi-Step Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Progress Indicator */}
          {step < 4 && (
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-bold text-neutral-400 mb-2">
                <span>STEP {step} OF 3</span>
                <span>
                  {step === 1 && 'Select Account Role'}
                  {step === 2 && 'Personal Credentials'}
                  {step === 3 && 'Academic / Professional Details'}
                </span>
              </div>
              <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#111111] transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* STEP 1: CHOOSE ACCOUNT ROLE */}
          {step === 1 && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-2xl font-extrabold text-[#111111] tracking-tight">
                  Choose Your Account Type
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                  Select your campus role. Admin accounts are managed by university administrators.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {/* Student */}
                <div
                  onClick={() => setRole('STUDENT')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    role === 'STUDENT'
                      ? 'border-[#111111] bg-neutral-50/80 shadow-xs ring-1 ring-[#111111]'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-neutral-900">Student</h4>
                        <RoleBadge role="STUDENT" size="sm" showDot={false} />
                      </div>
                      <p className="text-xs text-neutral-500">Currently enrolled undergraduate or postgraduate.</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    role === 'STUDENT' ? 'border-[#111111] bg-[#111111] text-white' : 'border-neutral-300'
                  }`}>
                    {role === 'STUDENT' && <Check className="w-3 h-3" />}
                  </div>
                </div>

                {/* Alumni */}
                <div
                  onClick={() => setRole('ALUMNI')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    role === 'ALUMNI'
                      ? 'border-[#111111] bg-neutral-50/80 shadow-xs ring-1 ring-[#111111]'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#7865F5] flex items-center justify-center">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-neutral-900">Alumni</h4>
                        <RoleBadge role="ALUMNI" size="sm" showDot={false} />
                      </div>
                      <p className="text-xs text-neutral-500">Graduated alumnus working in industry or research.</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    role === 'ALUMNI' ? 'border-[#111111] bg-[#111111] text-white' : 'border-neutral-300'
                  }`}>
                    {role === 'ALUMNI' && <Check className="w-3 h-3" />}
                  </div>
                </div>

                {/* Lecturer */}
                <div
                  onClick={() => setRole('LECTURER')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    role === 'LECTURER'
                      ? 'border-[#111111] bg-neutral-50/80 shadow-xs ring-1 ring-[#111111]'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#16A36A] flex items-center justify-center">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-neutral-900">Lecturer / Faculty</h4>
                        <RoleBadge role="LECTURER" size="sm" showDot={false} />
                      </div>
                      <p className="text-xs text-neutral-500">Professor, researcher, or faculty member.</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    role === 'LECTURER' ? 'border-[#111111] bg-[#111111] text-white' : 'border-neutral-300'
                  }`}>
                    {role === 'LECTURER' && <Check className="w-3 h-3" />}
                  </div>
                </div>
              </div>

              <Button variant="primary" size="lg" onClick={handleNext} className="w-full">
                Continue to Personal Info
              </Button>
            </div>
          )}

          {/* STEP 2: PERSONAL INFORMATION */}
          {step === 2 && (
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-[#111111] tracking-tight">
                  Personal Information
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                  Enter your official name and university email address.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Jordan Hayes"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  University / Professional Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jordan@camply.edu"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Create Password *
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5]"
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <Button variant="secondary" size="lg" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button variant="primary" size="lg" onClick={handleNext} className="flex-1">
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: ACADEMIC / PROFESSIONAL DETAILS */}
          {step === 3 && (
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-[#111111] tracking-tight">
                  {role === 'STUDENT' && 'Academic Information'}
                  {role === 'ALUMNI' && 'Career & Graduation Info'}
                  {role === 'LECTURER' && 'Faculty & Department Info'}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                  Fill in your role-specific verification details.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  University Name *
                </label>
                <input
                  type="text"
                  required
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Faculty *
                  </label>
                  <input
                    type="text"
                    required
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    {role === 'LECTURER' ? 'Department *' : 'Major *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={role === 'LECTURER' ? department : major}
                    onChange={(e) =>
                      role === 'LECTURER' ? setDepartment(e.target.value) : setMajor(e.target.value)
                    }
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5]"
                  />
                </div>
              </div>

              {/* Student specific fields */}
              {role === 'STUDENT' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Student ID (NPM / NIM)
                    </label>
                    <input
                      type="text"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Enrollment Year
                      </label>
                      <input
                        type="number"
                        value={enrollmentYear}
                        onChange={(e) => setEnrollmentYear(e.target.value)}
                        className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Expected Graduation
                      </label>
                      <input
                        type="number"
                        value={expectedGraduationYear}
                        onChange={(e) => setExpectedGraduationYear(e.target.value)}
                        className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5]"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Alumni specific fields */}
              {role === 'ALUMNI' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Graduation Year
                    </label>
                    <input
                      type="number"
                      value={graduationYear}
                      onChange={(e) => setGraduationYear(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Current Company
                      </label>
                      <input
                        type="text"
                        value={currentCompany}
                        onChange={(e) => setCurrentCompany(e.target.value)}
                        className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Professional Position
                      </label>
                      <input
                        type="text"
                        value={currentPosition}
                        onChange={(e) => setCurrentPosition(e.target.value)}
                        className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5]"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Lecturer specific fields */}
              {role === 'LECTURER' && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Faculty / Lecturer ID (NIDN)
                  </label>
                  <input
                    type="text"
                    value={lecturerId}
                    onChange={(e) => setLecturerId(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5]"
                  />
                </div>
              )}

              <div className="flex items-center gap-3 pt-3">
                <Button variant="secondary" size="lg" onClick={() => setStep(2)} className="flex-1">
                  Back
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  isLoading={isLoading}
                  onClick={handleNext}
                  className="flex-1"
                >
                  Create Account
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS CONFIRMATION */}
          {step === 4 && (
            <div className="text-center py-6 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Check className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-extrabold text-[#111111] tracking-tight">
                Account Created Successfully!
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 mt-2 max-w-xs mb-6">
                Welcome to CAMPLY. Your verified {role.toLowerCase()} profile is active and ready to explore.
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/dashboard')}
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full"
              >
                Go to Role Dashboard
              </Button>
            </div>
          )}

          {/* Bottom Link */}
          {step < 4 && (
            <p className="text-center text-xs text-neutral-500 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-neutral-900 font-bold hover:underline">
                Sign in instead
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

