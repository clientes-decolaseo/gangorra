/** Filtros sutis para diferenciar capas reutilizadas na listagem do blog. */
export const COVER_FILTERS = [
  "none",
  "hue-rotate(15deg) saturate(1.1)",
  "hue-rotate(-12deg) saturate(0.95)",
  "hue-rotate(25deg) saturate(1.05) brightness(0.97)",
  "hue-rotate(-20deg) saturate(1.1) brightness(1.03)",
  "sepia(0.15) hue-rotate(180deg) saturate(1.2)",
] as const;

export function getCoverFilter(index: number): string {
  return COVER_FILTERS[((index % COVER_FILTERS.length) + COVER_FILTERS.length) % COVER_FILTERS.length];
}
