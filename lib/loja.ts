export const CATEGORIA_LABELS: Record<string, string> = {
  vestuario: "Vestuário",
  acessorios: "Acessórios",
  decoracao: "Decoração",
  outros: "Outros",
};

const priceFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const formatPrice = (value: number) => priceFormatter.format(value);

/** Monta o link do WhatsApp (wa.me / api.whatsapp) com mensagem pronta */
export function whatsappLink(baseUrl: string, message: string) {
  const base = baseUrl.split("?")[0];
  return `${base}?text=${encodeURIComponent(message)}`;
}
