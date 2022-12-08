import BarangPalingMahal from '$lib/Metrics/BarangPalingMahal';
import Heatmap from '$lib/Metrics/Heatmap';
import IncomevsExpense from '$lib/Metrics/IncomevsExpense';
import TotalPemasukan from '$lib/Metrics/TotalPemasukan';
import TotalPengeluaran from '$lib/Metrics/TotalPengeluaran';

export default function Page() {
  return (
    <main className="w-full h-fit my-20 flex flex-col items-center justify-center gap-28 sm:px-0 px-4">
      <TotalPemasukan />
      <TotalPengeluaran />
      <IncomevsExpense />
      <Heatmap />
      <BarangPalingMahal />
      <h6 className="font-bold text-4xl text-center text-primary dark:text-primaryDark my-20">
        Other metrics coming soon
      </h6>
    </main>
  );
}
