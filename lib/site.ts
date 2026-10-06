export const SITE_NAME = "Rosa dos Ventos";

export interface NavLink {
  href: string;
  label: string;
  /** id da seção na home, usado para destacar o link ativo durante o scroll */
  section?: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: "/#agenda", label: "Agenda", section: "agenda" },
  { href: "/#sobre", label: "A Banda", section: "sobre" },
  { href: "/loja", label: "Loja" },
  { href: "/#contato", label: "Contato", section: "contato" },
];

export const CONTRATANTE_LINK: NavLink = {
  href: "/contratante",
  label: "Área do Contratante",
};

export interface SocialLink {
  platform: string;
  url: string;
}

export interface WhatsappContact {
  text: string;
  url: string;
}

export interface ContactData {
  title?: string;
  subtitle?: string;
  emailTitle?: string;
  emailAddress?: string;
  whatsappTitle?: string;
  whatsappContacts?: WhatsappContact[];
  socialTitle?: string;
  socialLinks?: SocialLink[];
}

export function isExternalHref(href: string) {
  return /^(https?:)?\/\//.test(href);
}

/** Props de <a> para abrir links externos em nova aba com segurança */
export function externalLinkProps(href: string) {
  return isExternalHref(href)
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
}
