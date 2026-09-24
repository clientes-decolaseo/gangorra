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
  const length = COVER_FILTERS.length;
  return COVER_FILTERS[((index % length) + length) % length];
}

/**
 * Atribui o filtro da posição (índice % 6). Se outro post com a mesma
 * foto-base já usa esse filtro, avança para o próximo ainda livre.
 */
export function assignCoverFilters(imageKeys: readonly string[]): string[] {
  const usedByImage = new Map<string, Set<number>>();

  return imageKeys.map((key, index) => {
    const length = COVER_FILTERS.length;
    let slot = ((index % length) + length) % length;
    const used = usedByImage.get(key) ?? new Set<number>();

    if (used.has(slot)) {
      for (let step = 1; step < length; step++) {
        const candidate = (slot + step) % length;
        if (!used.has(candidate)) {
          slot = candidate;
          break;
        }
      }
    }

    used.add(slot);
    usedByImage.set(key, used);
    return COVER_FILTERS[slot];
  });
}
