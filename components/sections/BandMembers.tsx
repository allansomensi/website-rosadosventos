import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";
import ExpandableText from "@/components/common/ExpandableText";
import SectionHeading from "@/components/ui/SectionHeading";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { BAND_MEMBERS_QUERY } from "@/sanity/lib/queries";

interface BandMember {
  _id: string;
  name: string;
  role: string;
  description: string;
  image: SanityImageSource;
  imageAlt: string | null;
}

export default async function BandMembers() {
  const { data } = await sanityFetch({ query: BAND_MEMBERS_QUERY });
  const members = data as BandMember[] | null;

  if (!members?.length) return null;

  const desktopWidth =
    members.length === 3
      ? "lg:w-[calc((100%-3rem)/3)]"
      : "lg:w-[calc((100%-4.5rem)/4)]";

  return (
    <section
      id="musicos"
      aria-labelledby="members-title"
      className="bg-ink-950 relative overflow-hidden pt-4 pb-20 sm:pb-28 lg:pb-36"
    >
      <div className="container-site">
        <SectionHeading
          id="members-title"
          eyebrow="Quem faz o som"
          title="Os músicos"
          className="reveal mb-10 sm:mb-14"
        />

        <ul className="reveal rail sm:mx-0 sm:flex-wrap sm:justify-center sm:gap-6 sm:overflow-visible sm:px-0">
          {members.map((member) => (
            <li
              key={member._id}
              className={`group w-[78%] sm:w-[calc((100%-1.5rem)/2)] ${desktopWidth}`}
            >
              <div className="bg-ink-850 relative aspect-4/5 overflow-hidden rounded-sm">
                {member.image && (
                  <Image
                    src={urlFor(member.image).width(720).height(900).url()}
                    alt={member.imageAlt || `Foto de ${member.name}`}
                    fill
                    sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top transition-[filter,transform] duration-700 ease-(--ease-out-expo) group-hover:scale-[1.04] group-hover:grayscale-0 [@media(hover:hover)]:grayscale-[0.85]"
                  />
                )}
                <div
                  aria-hidden="true"
                  className="from-ink-950 via-ink-950/30 absolute inset-0 bg-linear-to-t via-40% to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-brass font-mono text-[10px] tracking-[0.25em] uppercase sm:text-[11px]">
                    {member.role}
                  </p>
                  <h3 className="font-display text-bone mt-1 text-3xl leading-[0.95] font-extrabold tracking-tight uppercase sm:text-4xl">
                    {member.name}
                  </h3>
                </div>
                <span
                  aria-hidden="true"
                  className="border-bone/10 group-hover:border-brass/50 pointer-events-none absolute inset-0 rounded-sm border transition-colors duration-500"
                />
              </div>

              {member.description && (
                <p className="text-bone-muted mt-4 text-sm leading-relaxed text-pretty">
                  <ExpandableText text={member.description} maxLength={120} />
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
