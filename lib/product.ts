import {Slug} from '@types'

export const isProductInStock = (stock: number | undefined): boolean => {
  return stock !== 0
}

export const formatPrice = (amount: number): string => {
  const locale = 'fr-FR'
  const currencyCode = 'EUR'
  const formatCurrency = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
  })
  return formatCurrency.format(amount)
}

export const getProductUrl = (slug: Slug): string =>
  `/product/${encodeURIComponent(slug.current)}`

export const getProductCategoryUrl = (slug: Slug): string =>
  `/shop/category/${encodeURIComponent(slug.current)}`

export const getProductTagUrl = (tag: string): string =>
  `/shop/tag/${encodeURIComponent(tag)}`
