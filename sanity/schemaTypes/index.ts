import { type SchemaTypeDefinition } from "sanity";
import { show } from "./show";
import { hero } from "./hero";
import { sobre } from "./sobre";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [show, hero, sobre],
};
