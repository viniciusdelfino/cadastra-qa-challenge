export default function CollectionsLoading() {
  return (
    <div className="px-margin-mobile py-section-gap md:px-margin-desktop">
      <div className="bg-surface-container-low mb-stack-lg h-12 w-64 animate-pulse" />
      <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-surface-container-low aspect-[3/4] animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
