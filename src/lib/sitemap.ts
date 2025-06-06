import { calculatorCategories, sampleCalculators } from './data/calculators';
import { generateCategoryUrl, generateCalculatorUrl } from './utils/url-slug';

export interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export function generateSitemap(): SitemapEntry[] {
  const baseUrl = 'https://diycalculatorpro.com';
  const lastModified = new Date().toISOString();
  
  const sitemap: SitemapEntry[] = [
    // Homepage
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0
    },
    // Categories page
    {
      url: `${baseUrl}/categories`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    // All calculators page
    {
      url: `${baseUrl}/calculators`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9
    }
  ];

  // Add category pages
  calculatorCategories.forEach(category => {
    sitemap.push({
      url: `${baseUrl}${generateCategoryUrl(category.name)}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7
    });
  });

  // Add calculator pages
  sampleCalculators.forEach(calculator => {
    sitemap.push({
      url: `${baseUrl}${generateCalculatorUrl(calculator.category, calculator.name)}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6
    });
  });

  return sitemap;
}

export function generateSitemapXML(): string {
  const sitemap = generateSitemap();
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemap.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xml;
}