import { groq } from "next-sanity";

export const HERO_QUERY = groq`
  *[_type == "hero" && _id == "743b1180-71ea-40f8-9ad1-6444c29b1f2e"][0] {
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
*[_type == "show"]|order(data asc){
  _id,
  data,
  local,
  cidade,
  link
}`;

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
