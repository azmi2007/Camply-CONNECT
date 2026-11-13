import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center p-6 bg-[#F8F8F8]">
      <div className="w-full max-w-md bg-white rounded-3xl border border-[#EAEAEA] p-8 shadow-sm">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Sign In</span>
        </Link>

        {!isSubmitted ? (
          <div>
            <h2 className="text-2xl font-extrabold text-[#111111] tracking-tight mb-2">
              Reset Your Password
            </h2>
            <p className="text-xs text-neutral-500 mb-6 leading-relaxed">
              Enter your university email address and we'll send you a secure link to reset your account password.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  University Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@university.edu"
                    className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-[#7865F5]"
                  />
                </div>
              </div>

              <Button variant="primary" size="lg" type="submit" className="w-full mt-2">
                Send Reset Link
              </Button>
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900">Check Your Inbox</h3>
            <p className="text-xs text-neutral-500 mt-2 mb-6">
              We've sent a password reset link to <strong>{email}</strong>. Please check your university email.
            </p>
            <Button variant="secondary" size="md" onClick={() => setIsSubmitted(false)} className="w-full">
              Resend Link
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

