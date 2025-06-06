/**
 * Creates a standardized URL slug from a string
 * Follows SEO-friendly conventions: lowercase, hyphen-separated, clean
 */
export function createUrlSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    // Replace spaces with hyphens
    .replace(/\s+/g, '-')
    // Handle "and" specifically to maintain readability
    .replace(/\band\b/g, 'and')
    // Remove all non-alphanumeric characters except hyphens
    .replace(/[^a-z0-9-]/g, '')
    // Remove consecutive hyphens
    .replace(/-+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '');
}

/**
 * Generates a full calculator URL path
 */
export function generateCalculatorUrl(category: string, calculator: string): string {
  const categorySlug = createUrlSlug(category);
  const calculatorSlug = createUrlSlug(calculator);
  return `/calculators/${categorySlug}/${calculatorSlug}`;
}

/**
 * Generates a category URL path
 */
export function generateCategoryUrl(category: string): string {
  const categorySlug = createUrlSlug(category);
  return `/calculators/${categorySlug}`;
}