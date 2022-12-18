export default function Loading() {
  return (
    <div>
      <div className="animate-pulse flex">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-3 bg-slate-400 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-3 bg-slate-400 rounded col-span-2"></div>
              <div className="h-3 bg-slate-400 rounded col-span-1"></div>
            </div>
            <div className="h-3 bg-slate-400 rounded"></div>
          </div>
        </div>
      </div>
      <p className="text-onPrimary dark:text-onSurfaceVariant">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
        voluptatem nobis eum.
      </p>
    </div>
  );
}
