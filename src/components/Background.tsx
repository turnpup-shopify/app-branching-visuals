export function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-ink-900">
      <div className="absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full bg-ink-500/40 blur-[140px]" />
      <div className="absolute right-[-10%] top-[10%] h-[480px] w-[480px] rounded-full bg-signal-500/25 blur-[160px]" />
      <div className="absolute bottom-[-15%] left-[20%] h-[520px] w-[520px] rounded-full bg-bone-200/10 blur-[150px]" />
      <div className="grain" />
    </div>
  );
}
