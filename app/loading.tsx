export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="size-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
    </div>
  );
}