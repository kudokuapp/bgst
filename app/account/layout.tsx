import '$styles/globals.css';
import { Navbar, Footer } from './client';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full min-h-[100vh] bg-background dark:bg-onBackground flex items-center justify-center">
      <section className="max-w-[500px] rounded-xl shadow-xl bg-onPrimary dark:bg-onSurfaceVariant border-[1px] border-gray-600 dark:border-gray-400 sm:mx-0 mx-2 sm:my-0 my-12">
        <Navbar />

        <section className="flex flex-col gap-12 mt-8 px-8 pb-8">
          {children}
          <Footer />
        </section>
      </section>
    </main>
  );
}
