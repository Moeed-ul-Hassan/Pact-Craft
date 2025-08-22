interface LoadingOverlayProps {
  message?: string;
}

export default function LoadingOverlay({ message = "Generating your contract..." }: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" data-testid="loading-overlay">
      <div className="bg-white rounded-xl p-8 text-center max-w-sm mx-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4" data-testid="loading-spinner"></div>
        <p className="text-black font-medium mb-2" data-testid="loading-message">{message}</p>
        <p className="text-gray-600 text-sm" data-testid="loading-submessage">This may take a few moments</p>
      </div>
    </div>
  );
}
