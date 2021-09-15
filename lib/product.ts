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

export const getProductUrl = (slug: Slug) => `/shop/${slug.current}`
