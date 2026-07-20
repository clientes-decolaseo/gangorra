export const NAP = {
  name: "Gangorra Audiodescrição",
  streetAddress: "Rua Luiza da Silva Aleixo, 96",
  locality: "Poá",
  region: "SP",
  postalCode: "08651-040",
  country: "BR",
  phoneDisplay: "(12) 98102-0340",
  phoneE164: "+5512981020340",
  email: "contato@gangorraaudiodescricao.com.br",
  instagram: "https://www.instagram.com/gangorra_audiodescricao/",
  googleBusinessProfile:
    "https://www.google.com/maps?cid=12366833483916118600",
} as const;

const WHATSAPP_PHONE_DIGITS = NAP.phoneE164.replace(/\D/g, "");

export const WHATSAPP_DEFAULT_URL =
  `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE_DIGITS}&text=${encodeURIComponent(
    "Olá, tudo bem? Estou no site do Gangorra e gostaria de informações.",
  )}`;

export function buildWhatsAppUrl(message: string): string {
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE_DIGITS}&text=${encodeURIComponent(message)}`;
}
