import type {Slug, Asset} from '@types'

export interface ProductCategory {
  id: string
  title: string
  slug: Slug
}

export interface Product {
  // CARD
  id: string
  title: string
  slug: Slug
  images: Array<Asset>
  defaultProductVariant: IProductVariant
  // VIEW
  tags?: string[]
  categories?: ProductCategory[]
  blurb?: string
  descriptionRaw?: string
  variants?: IProductVariant[]
  options?: IProductOption[]
}

export interface IProductVariant {
  default: boolean
  title?: string
  price: number
  stock: number
}

export interface IProductOptionValue {
  id: string
  label: string
  hexColor?: string
}

export interface IProductOption {
  id: string
  name: string
  values: IProductOptionValue[]
}
