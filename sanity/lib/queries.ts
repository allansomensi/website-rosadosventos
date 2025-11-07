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
*[_type == "show"]|order(date asc){
  _id,
  data,
  local,
  cidade,
  link
}`;
