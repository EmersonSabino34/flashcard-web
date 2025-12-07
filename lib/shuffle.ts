export function shuffleArray<T>(input: T[], seed?: number): T[] {
  const array = [...input];
  let currentSeed = seed ?? Date.now();

  for (let i = array.length - 1; i > 0; i -= 1) {
    currentSeed = mulberry32(currentSeed);
    const j = Math.floor(currentSeed * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

function mulberry32(a: number) {
  let t = (a += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

export function selectRandom<T>(items: T[], count: number): T[] {
  if (count >= items.length) {
    return shuffleArray(items);
  }

  return shuffleArray(items).slice(0, count);
}
