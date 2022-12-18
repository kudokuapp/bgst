import { Navbar, Footer, NavCard } from './[account]/client';
import '$styles/globals.css';

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  console.log(params);
  return (
    <div className="bg-background dark:bg-onBackground">
      <Navbar />
      <NavCard params={params.account} />
      <main className="w-full h-fit">{children}</main>
      <Footer />
    </div>
  );
}
