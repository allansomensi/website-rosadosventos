import Link from "next/link";

interface ShowItemProps {
  dia: string;
  mes: string;
  local: string;
  cidade: string;
  linkHref: string;
}

export default function ShowItem({
  dia,
  mes,
  local,
  cidade,
  linkHref,
}: ShowItemProps) {
  return (
    <div className="flex items-center space-x-6 border-b border-zinc-700 py-6">
      {/* Data */}
      <div className="shrink-0 text-center">
        <span className="font-teko block text-5xl leading-none font-bold text-amber-400">
          {dia}
        </span>
        <span className="font-teko block text-2xl text-white uppercase">
          {mes}
        </span>
      </div>

      {/* Informações do Show */}
      <div className="grow">
        <h3 className="font-cinzel text-2xl font-bold text-white">{local}</h3>
        <p className="font-teko text-xl text-gray-400">{cidade}</p>
      </div>

      {/* Local */}
      <div className="shrink-0">
        <Link
          href={linkHref}
          target="_blank"
          rel="noopener noreferrer"
          className="font-teko border-2 border-amber-400 px-6 py-2 text-lg tracking-wider text-amber-400 uppercase transition-all duration-300 hover:bg-amber-400 hover:text-black"
        >
          Ver Local
        </Link>
      </div>
    </div>
  );
}
