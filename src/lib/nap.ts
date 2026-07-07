export const NAP = {
  name: "Gangorra Audiodescrição",
  streetAddress: "Rua Luiza da Silva Aleixo, 96",
  locality: "Poá",
  region: "SP",
  postalCode: "08651-040",
  country: "BR",
  phoneDisplay: "(11) 96570-7386",
  phoneE164: "+5511965707386",
  email: "contato@gangorraaudiodescricao.com.br",
  instagram: "https://www.instagram.com/gangorra_audiodescricao/",
  googleBusinessProfile:
    "https://www.google.com/maps?cid=12366833483916118600",
} as const;

export const WHATSAPP_DEFAULT_URL =
  "https://api.whatsapp.com/send?phone=5511965707386&text=Ol%C3%A1%2C%20tudo%20bem%3F%20Estou%20no%20site%20do%20Gangorra%20e%20gostaria%20de%20informa%C3%A7%C3%B5es.";

export function buildWhatsAppUrl(message: string): string {
  return `https://api.whatsapp.com/send?phone=5511965707386&text=${encodeURIComponent(message)}`;
}
