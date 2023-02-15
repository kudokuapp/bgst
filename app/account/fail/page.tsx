import { ButtonLanjut, LottieFailed } from './client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page() {
  const nextCookies = cookies();
  const token = nextCookies.get('token');

  if (!token) redirect('/');

  return (
    <section className="flex flex-col gap-4 items-center justify-center">
      <LottieFailed />

      <p className="max-w-[300px] text-error dark:text-errorDark text-center">
        Gagal konekin akun kamu dan ambil transaksinya
      </p>

      <ButtonLanjut />
    </section>
  );
}
