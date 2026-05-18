export default function ProductLoading() {
  return (
    <div className="px-margin-mobile py-section-gap md:px-margin-desktop">
      <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
        <div className="bg-surface-container-low aspect-[3/4] animate-pulse" />
        <div className="flex flex-col gap-stack-md">
          <div className="bg-surface-container-low h-12 w-3/4 animate-pulse" />
          <div className="bg-surface-container-low h-6 w-1/3 animate-pulse" />
          <div className="bg-surface-container-low mt-stack-md h-32 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
