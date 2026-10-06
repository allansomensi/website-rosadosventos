import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandYoutube,
  IconLink,
} from "@tabler/icons-react";
import type { SocialLink } from "@/lib/site";

const PLATFORMS: Record<string, { label: string; Icon: typeof IconLink }> = {
  instagram: { label: "Instagram", Icon: IconBrandInstagram },
  youtube: { label: "YouTube", Icon: IconBrandYoutube },
  facebook: { label: "Facebook", Icon: IconBrandFacebook },
};

export function getPlatform(platform: string) {
  return (
    PLATFORMS[platform.toLowerCase()] ?? { label: platform, Icon: IconLink }
  );
}

export default function SocialLinks({
  links,
  size = "md",
  className = "",
}: {
  links?: SocialLink[];
  size?: "sm" | "md";
  className?: string;
}) {
  if (!links?.length) return null;

  const box = size === "sm" ? "h-10 w-10" : "h-12 w-12";
  const icon = size === "sm" ? 18 : 22;

  return (
    <ul className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {links.map((social) => {
        const { label, Icon } = getPlatform(social.platform);
        return (
          <li key={social.url}>
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} da Rosa dos Ventos (abre em nova aba)`}
              title={label}
              className={`${box} border-bone/15 text-bone-muted hover:border-brass hover:bg-brass hover:text-ink-950 flex items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-0.5`}
            >
              <Icon size={icon} stroke={1.75} aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
