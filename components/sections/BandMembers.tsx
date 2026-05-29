import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { BAND_MEMBERS_QUERY } from "@/sanity/lib/queries";

interface BandMember {
  _id: string;
  name: string;
  role: string;
  description: string;
  imageUrl: string | null;
  imageAlt: string | null;
}

export default async function BandMembers() {
  const { data } = await sanityFetch({ query: BAND_MEMBERS_QUERY });
  const members = data as BandMember[];

  if (!members || members.length === 0) {
    return null;
  }

  return (
    <section
      id="musicos"
      className="relative overflow-hidden bg-zinc-950 py-24 md:py-32"
    >
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-200 w-200 -translate-x-1/2 translate-y-1/2 rounded-full bg-(--gold)/5 blur-[120px]" />

      <div className="relative z-10 container mx-auto max-w-7xl px-6">
        <div className="mb-24 text-center">
          <p className="font-teko mb-3 text-xl tracking-[0.25em] text-(--gold) uppercase opacity-90">
            Quem Somos
          </p>
          <h2 className="font-cinzel text-4xl font-bold tracking-wide text-white md:text-5xl">
            Os Músicos
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-linear-to-r from-transparent via-(--gold)/50 to-transparent" />
        </div>

        <div className="flex flex-wrap justify-center gap-12 lg:gap-16">
          {members.map((member) => (
            <div
              key={member._id}
              className="group relative flex w-full max-w-[320px] flex-col items-center transition-transform duration-500 ease-out hover:-translate-y-2"
            >
              <div className="relative h-105 w-full overflow-hidden rounded-4xl border border-white/5 bg-zinc-900/20 backdrop-blur-md transition-all duration-700 ease-out group-hover:border-(--gold)/40 group-hover:bg-zinc-900/40 group-hover:shadow-(--gold)/10 group-hover:shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-0 pt-6">
                  <div className="h-full w-full origin-bottom transition-transform duration-300 ease-out will-change-transform group-hover:scale-105">
                    {member.imageUrl && (
                      <Image
                        src={member.imageUrl}
                        alt={member.imageAlt || `Foto de ${member.name}`}
                        width={400}
                        height={500}
                        className="h-full w-full object-cover object-top drop-shadow-2xl"
                      />
                    )}
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-linear-to-t from-zinc-950/90 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-60" />
              </div>

              <div className="mt-8 flex flex-col items-center text-center transition-all duration-500">
                <h3 className="font-cinzel text-2xl font-bold tracking-wider text-zinc-100 transition-colors duration-300 group-hover:text-white">
                  {member.name}
                </h3>

                <p className="font-teko mt-1.5 text-xl tracking-[0.2em] text-(--gold) uppercase">
                  {member.role}
                </p>

                <div className="mt-3 mb-4 h-0.5 w-6 bg-(--gold)/20 transition-all duration-500 group-hover:w-16 group-hover:bg-(--gold)/60" />

                <p className="mx-auto max-w-70 font-sans text-sm leading-relaxed font-light text-zinc-500 transition-colors duration-500 group-hover:text-zinc-300">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
