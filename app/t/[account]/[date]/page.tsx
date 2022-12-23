export default function Page({
  params,
}: {
  params: { account: string; date: string };
}) {
  return (
    <>
      <h1>{params.account}</h1>
      <h1>{params.date}</h1>
    </>
  );
}
