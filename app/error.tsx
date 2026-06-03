"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white">
      <h2 className="font-cinzel text-3xl font-bold text-(--gold)">
        Algo deu errado!
      </h2>
      <p className="mt-4 text-zinc-400">
        Ocorreu um problema ao carregar a página.
      </p>
      <button
        onClick={() => reset()}
        className="mt-6 border border-(--gold) px-6 py-2 text-(--gold) transition hover:bg-(--gold) hover:text-black"
      >
        Tentar novamente
      </button>
    </div>
  );
}
