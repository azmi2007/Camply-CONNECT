import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFoundPage = () => (
  <section className="mx-auto flex min-h-[50vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-[#7865F5]">
      <Compass className="h-7 w-7" aria-hidden="true" />
    </div>
    <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#7865F5]">404</p>
    <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#111111] sm:text-4xl">Page not found</h1>
    <p className="mt-3 max-w-md text-sm leading-6 text-neutral-500">
      The link may be outdated, or the page has moved to another part of CAMPLY.
    </p>
    <Link to="/" className="mt-7">
      <Button variant="primary">Back to home</Button>
    </Link>
  </section>
);
