import { Navbar, Heading, MainShare } from './client';

export default function Page() {
  return (
    <section className="bg-background dark:bg-onBackground h_ios w-full">
      <Navbar />
      <Heading />
      <MainShare />
    </section>
  );
}
