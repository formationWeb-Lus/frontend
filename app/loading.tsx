export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#08192D]">
      <div className="flex flex-col items-center gap-5">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent"></div>

        <h2 className="text-xl font-semibold text-white">
          Chargement...
        </h2>

        <p className="text-slate-400">
          Veuillez patienter.
        </p>
      </div>
    </div>
  );
}