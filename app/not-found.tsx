import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#08192D] px-6">
      <div className="text-center">
        <h1 className="text-7xl font-extrabold text-yellow-400">404</h1>

        <h2 className="mt-4 text-3xl font-bold text-white">
          Page introuvable
        </h2>

        <p className="mt-4 text-slate-300">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>

        <Link
          href="/"
          className="mt-8 inline-block rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-[#08192D] transition hover:bg-yellow-300"
        >
          Retour à l'accueil
        </Link>
      </div>
    </main>
  );
}