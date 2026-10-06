import { IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { externalLinkProps } from "@/lib/site";

interface CardItemProps {
  imageSrc: string;
  altText: string;
  title: string;
  description: string;
  linkHref: string;
  linkText: string;
  index: number;
  className?: string;
}

export default function CardItem({
  imageSrc,
  altText,
  title,
  description,
  linkHref,
  linkText,
  index,
  className = "",
}: CardItemProps) {
  return (
    <Link
      href={linkHref}
      {...externalLinkProps(linkHref)}
      className={`group bg-ink-850 relative isolate flex aspect-4/5 flex-col justify-end overflow-hidden rounded-sm ${className}`}
    >
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={altText}
          fill
          sizes="(max-width: 640px) 85vw, (max-width: 768px) 50vw, 33vw"
          className="-z-20 object-cover transition-transform duration-1000 ease-(--ease-out-expo) group-hover:scale-105"
        />
      )}
      <div
        aria-hidden="true"
        className="from-ink-950 via-ink-950/50 absolute inset-0 -z-10 bg-linear-to-t via-45% to-transparent transition-opacity duration-500"
      />

      <span
        aria-hidden="true"
        className="text-bone/80 bg-ink-950/50 absolute top-4 left-4 rounded-full px-2.5 py-1 font-mono text-[11px] tracking-widest backdrop-blur-sm"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="p-6 sm:p-7">
        <h3 className="font-display text-bone text-3xl leading-[0.95] font-extrabold tracking-tight uppercase sm:text-4xl">
          {title}
        </h3>
        <p className="text-bone-muted mt-3 line-clamp-3 text-sm leading-relaxed sm:text-[15px]">
          {description}
        </p>
        <span className="font-display text-brass mt-5 inline-flex items-center gap-2 text-lg font-bold tracking-wider uppercase">
          {linkText}
          <IconArrowRight
            size={18}
            stroke={2.25}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>

      <span
        aria-hidden="true"
        className="border-bone/10 group-hover:border-brass/60 pointer-events-none absolute inset-0 rounded-sm border transition-colors duration-500"
      />
    </Link>
  );
}
