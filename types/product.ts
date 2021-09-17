import type {Slug, Asset} from '@types'

export type ProductCategoryType = {
  id: string
  title: string
  slug: Slug
}

export type ProductCardType = {
  id: string
  title: string
  slug: Slug
  images: Array<Asset>
  defaultProductVariant: ProductVariantType
  tags: string[]
  categories: ProductCategoryType[]
}

export type ProductViewType = ProductCardType & {
  blurb: string
  descriptionRaw: string
  defaultProductVariant: ProductVariantType
  variants: ProductVariantType[]
  categories: ProductCategoryType[]
}

export interface ProductVariantType {
  default: boolean
  title?: string
  price: number
  stock: number
}
