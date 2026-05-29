import Image from "next/image";
import Link from "next/link";

interface CardItemProps {
  imageSrc: string;
  altText: string;
  title: string;
  description: string;
  linkHref: string;
  linkText: string;
}

export default function CardItem({
  imageSrc,
  altText,
  title,
  description,
  linkHref,
  linkText,
}: CardItemProps) {
  return (
    <div className="transform overflow-hidden rounded-lg bg-zinc-800 shadow-lg transition-transform duration-300 hover:scale-[1.02]">
      <div className="relative h-48 w-full">
        {imageSrc && imageSrc !== "" && (
          <Image
            src={imageSrc}
            alt={altText}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center"
          />
        )}
      </div>
      <div className="p-6">
        <h3 className="font-cinzel mb-2 text-xl font-bold text-amber-400">
          {title}
        </h3>
        <p className="font-teko mb-4 text-lg leading-relaxed text-gray-300">
          {description}
        </p>
        <Link
          href={linkHref}
          className="font-teko text-lg text-amber-400 uppercase transition-colors duration-300 hover:text-amber-500"
        >
          {linkText} &rarr;
        </Link>
      </div>
    </div>
  );
}
