import type {Slug, Asset} from '@types'

export type ProductCategory = {
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
  categories: ProductCategory[]
}

export type ProductViewType = ProductCardType & {
  blurb: string
  descriptionRaw: string
  defaultProductVariant: ProductVariantType
  variants: ProductVariantType[]
}

export interface ProductVariantType {
  default: boolean
  title?: string
  price: number
  stock: number
  hexColor?: string
}
