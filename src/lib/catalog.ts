import { SCRAP_AND_PACKAGING_CONFIG, type ProductImage } from '@/lib/config'

export type CatalogDivision = 'scrap' | 'packaging'

export interface CatalogProduct {
  division: CatalogDivision
  slug: string
  title: string
  subtitle?: string
  image: string | ProductImage[]
  features: string[]
}

export function getAllCatalogProducts (): CatalogProduct[] {
  const scrap = SCRAP_AND_PACKAGING_CONFIG.scrapMaterials.products
    .filter(p => Boolean(p.slug))
    .map(p => ({
      division: 'scrap' as const,
      slug: String(p.slug),
      title: p.title,
      subtitle: p.subtitle,
      image: p.image, // Can be string or ProductImage[]
      features: p.features
    }))

  const packaging = SCRAP_AND_PACKAGING_CONFIG.packagingProducts.products
    .filter(p => Boolean(p.slug))
    .map(p => ({
      division: 'packaging' as const,
      slug: String(p.slug),
      title: p.title,
      subtitle: p.subtitle,
      image: p.image, // Can be string or ProductImage[]
      features: p.features
    }))

  return [...scrap, ...packaging]
}

export function getCatalogProductBySlug (
  division: CatalogDivision,
  slug: string
): CatalogProduct | undefined {
  return getAllCatalogProducts().find(p => p.division === division && p.slug === slug)
}

export function getCatalogPaths (): Array<{ category: CatalogDivision, slug: string }> {
  return getAllCatalogProducts().map(p => ({ category: p.division, slug: p.slug }))
}


