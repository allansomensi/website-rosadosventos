import { defineQuery } from "next-sanity";

export const SHOWS_QUERY = defineQuery(`*[
  _type == "show"
]|order(date asc){
  _id,
  data,
  local,
  cidade,
  link
}`);
