import { type SchemaTypeDefinition } from "sanity";
import { show } from "./show";
import { hero } from "./hero";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [show, hero],
};
