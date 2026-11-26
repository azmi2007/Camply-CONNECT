import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { LoginForm } from '../../features/auth/login/LoginForm';
import { getDefaultDashboardRoute } from '../../features/permissions/permissions';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithCredentials } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleLogin = async (identifier: string, password: string) => {
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const result = await loginWithCredentials({ identifier, password });

      if (!result.success || !result.user) {
        setError(result.error || 'Autentikasi gagal.');
        return;
      }

      const authenticatedUser = result.user;
      setSuccessMessage(`Berhasil masuk sebagai ${authenticatedUser.full_name}. Mengarahkan ke dashboard...`);
      window.setTimeout(() => navigate(getDefaultDashboardRoute(authenticatedUser.role), { replace: true }), 400);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-72px)] bg-[#F6F6F5] px-4 py-8 dark:bg-[#101114] sm:px-6 sm:py-12 lg:flex lg:items-center lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-2xl border border-[#EAEAEA] bg-white shadow-[0_18px_48px_-34px_rgba(17,17,17,0.38)] dark:border-[#2C2F38] dark:bg-[#181A20] lg:grid-cols-[0.88fr_1.12fr]">
        <aside className="relative overflow-hidden border-b border-[#EAEAEA] bg-[#111111] px-7 py-8 text-white dark:border-[#2C2F38] dark:bg-[#15171D] sm:px-10 sm:py-12 lg:border-b-0 lg:border-r lg:px-12 lg:py-14">
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full border border-white/10" aria-hidden="true" />
          <div className="absolute -bottom-32 -left-20 h-64 w-64 rounded-full border border-white/10" aria-hidden="true" />

          <div className="relative flex h-full flex-col">
            <div className="max-w-sm py-8 lg:my-auto lg:py-0">
              <p className="mb-4 text-xs font-semibold tracking-[0.16em] text-[#B7AEFF] uppercase">Campus network</p>
              <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Semua koneksi kampus, dalam satu tempat.
              </h1>
              <p className="mt-5 text-sm leading-6 text-neutral-300">
                Masuk untuk melanjutkan aktivitas, koneksi, dan peluang yang relevan dengan peran Anda di CAMPLY.
              </p>
            </div>

            <p className="text-xs leading-5 text-neutral-400">
              Untuk mahasiswa, alumni, dan dosen di jaringan kampus Anda.
            </p>
          </div>
        </aside>

        <div className="flex items-center px-6 py-9 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8">
              <p className="text-sm font-medium text-[#7865F5]">Selamat datang kembali</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#111111] dark:text-[#F5F5F5]">
                Masuk ke akun Anda
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#6B6B6B] dark:text-[#A0A0A0]">
                Gunakan ID akun atau email institusi yang telah terdaftar.
              </p>
            </div>

            <LoginForm
              isLoading={isLoading}
              error={error}
              successMessage={successMessage}
              onSubmit={handleLogin}
            />

            <p className="mt-7 text-center text-sm text-[#6B6B6B] dark:text-[#A0A0A0]">
              Belum punya akun?{' '}
              <Link
                to="/register"
                className="font-semibold text-[#7865F5] underline-offset-4 transition-colors hover:text-[#6752EE] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7865F5] focus-visible:ring-offset-2"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
