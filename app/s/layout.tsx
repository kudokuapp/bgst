import { Navbar, Footer } from './client';
import '$styles/globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="w-full h-fit">{children}</main>
      <Footer />
    </>
  );
}
