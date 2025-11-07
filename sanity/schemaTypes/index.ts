import { type SchemaTypeDefinition } from "sanity";
import { show } from "./show";
import { hero } from "./hero";
import { sobre } from "./sobre";
import { highlight } from "./highlight";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [show, hero, sobre, highlight],
};
