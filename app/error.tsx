"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          Une erreur est survenue
        </h1>

        <button
          onClick={() => reset()}
          className="mt-6 rounded bg-blue-600 px-6 py-3 text-white"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}