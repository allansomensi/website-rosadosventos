import { groq } from "next-sanity";

export const HERO_QUERY = groq`
  *[_type == "hero"][0] {
    "imageUrl": heroImage.asset->url,
    "imageAlt": heroImage.alt,
    subheading,
    headingLine1,
    headingLine2,
    cta {
      label,
      link
    }
  }
`;

export const SHOWS_QUERY = groq`
  *[_type == "show"] | order(data asc) {
    _id,
    data,
    local,
    cidade,
    link,
    linkLocalizacao
  }
`;

export const ABOUT_QUERY = groq`
  *[_type == "sobre"][0] {
    title,
    bio,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  }
`;

export const HIGHLIGHTS_QUERY = groq`
  *[_type == "highlight"][0] {
    title,
    cards[] {
      _key,
      title,
      description,
      linkText,
      linkHref,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt
    }
  }
`;

export const CONTACT_QUERY = groq`
  *[_type == "contato"][0] {
    title,
    subtitle,
    emailTitle,
    emailAddress,
    whatsappTitle,
    whatsappContacts[] {
      text,
      url
    },
    socialTitle,
    socialLinks[] {
      platform,
      url
    }
  }
`;

export const SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    "logoUrl": logo.asset->url
  }
`;

export const AREA_CONTRATANTE_QUERY = groq`
  *[_type == "areaContratante"][0] {
    heading,
    subheading,
    description,
    portfolioUrl,
    driveUrl,
    videos[] {
      title,
      youtubeUrl,
      "thumbnailUrl": thumbnail.asset->url
    }
  }
`;

export const BAND_MEMBERS_QUERY = groq`
  *[_type == "bandMember"] | order(order asc) {
    _id,
    name,
    role,
    description,
    image 
  }
`;
