export function LoadingSpinner(): React.ReactNode {
  return (
    <div className="loading-spinner" role="status" aria-label="Loading">
      <div className="spinner"></div>
      <p className="text-gray-500">Calculating taxes...</p>
    </div>
  );
}
