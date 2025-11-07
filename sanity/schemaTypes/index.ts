import { type SchemaTypeDefinition } from "sanity";
import { show } from "./show";
import { hero } from "./hero";
import { sobre } from "./sobre";
import { highlight } from "./highlight";
import { contato } from "./contato";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [hero, show, highlight, sobre, contato],
};
