/**
 * Canonical studio categories used across the app.
 * These are the labels shown in the UI (Browse Categories, Add Studio, etc.).
 */
export const CATEGORIES = [
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
] as const;

export type Category = (typeof CATEGORIES)[number];

/**
 * The database may store categories using slightly different labels
 * (e.g. "Photography Studios" instead of "Photo Studios"). Each canonical
 * category maps to every variant we want to treat as the same category.
 */
const CATEGORY_ALIASES: Record<Category, readonly string[]> = {
  "Photo Studios": [
    "Photo Studios",
    "Photo Studio",
    "Photography Studios",
    "Photography Studio",
    "Photography",
  ],
  "Sound Stages": [
    "Sound Stages",
    "Sound Stage",
    "Film Stages",
    "Film Stage",
    "Video Production Studios",
    "Video Production Studio",
  ],
  "Podcast Rooms": [
    "Podcast Rooms",
    "Podcast Room",
    "Podcast Studios",
    "Podcast Studio",
    "Podcast Lounge",
  ],
  "Music Suites": [
    "Music Suites",
    "Music Suite",
    "Music Studios",
    "Music Studio",
  ],
  "Art Workshops": [
    "Art Workshops",
    "Art Workshop",
    "Art Studio",
    "Art Studios",
  ],
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export function isCategory(value: string): value is Category {
  return (CATEGORIES as readonly string[]).includes(value);
}

/**
 * Returns every DB label that should be treated as the given category.
 */
export function getCategoryAliases(category: string): readonly string[] {
  return isCategory(category) ? CATEGORY_ALIASES[category] : [category];
}

/**
 * Checks whether a studio's stored category belongs to the requested category.
 */
export function matchesCategory(
  studioCategory: string | null | undefined,
  category: string
): boolean {
  if (!studioCategory) return false;

  const target = normalize(studioCategory);
  return getCategoryAliases(category).some(
    (alias) => normalize(alias) === target
  );
}
