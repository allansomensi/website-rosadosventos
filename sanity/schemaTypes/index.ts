import { type SchemaTypeDefinition } from "sanity";
import { show } from "./show";
import { hero } from "./hero";
import { sobre } from "./sobre";
import { highlight } from "./highlight";
import { contato } from "./contato";
import { siteSettings } from "./siteSettings";
import { areaContratante } from "./areaContratante";
import { bandMember } from "./bandMember";
import { produto } from "./produto";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    hero,
    show,
    highlight,
    sobre,
    contato,
    siteSettings,
    areaContratante,
    bandMember,
    produto,
  ],
};
