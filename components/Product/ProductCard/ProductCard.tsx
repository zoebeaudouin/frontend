import {FC} from 'react'
import {gql} from 'urql'
import {Title, Text} from '@components/ui'
import Link from 'next/link'
import Image from 'next/image'
import {styled} from 'twin.macro'
import type {Slug} from '@types'
import {isProductInStock} from '@lib/product'
import {formatPrice} from '@lib/product'
import {ProductVariantType} from '@components/Product/ProductView/ProductViewVariant'
import {getProductUrl} from '@lib/product'

type Image = {
  url: string
}
type Asset = {
  asset: Image
}

export type ProductCardType = {
  id: string
  title: string
  slug: Slug
  images: Array<Asset>
  defaultProductVariant: ProductVariantType
  tags: string[]
}

interface Props {
  product: ProductCardType
}

export const PRODUCT_CARD_FRAGMENT = gql`
  fragment ProductCardFragment on Product {
    id: _id
    title
    slug {
      current
    }
    images {
      asset {
        url
      }
    }
    defaultProductVariant {
      price
      stock
    }
    tags
  }
`

const ProductCardContainer = styled.a({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'black',
  color: 'white',
  img: {
    filter: 'grayscale(0%)',
    '&:hover': {
      filter: 'grayscale(20%)',
    },
  },
})

export const ProductCard: FC<Props> = ({product}) => {
  const {
    title,
    slug,
    defaultProductVariant: {price, stock},
    images,
  } = product
  const inStock = isProductInStock(stock)
  return (
    <Link href={getProductUrl(slug)} passHref>
      <ProductCardContainer>
        {images && (
          <Image
            src={images[0]?.asset.url}
            alt={title || 'Product Image'}
            width={500}
            height={500}
            layout="responsive"
          />
        )}
        <Title as="h2" size="sm" px={3} pt={3}>
          {title}
        </Title>
        <Text px={3} pb={3}>
          {inStock ? `${formatPrice(price)}` : 'Out of stock'}
        </Text>
      </ProductCardContainer>
    </Link>
  )
}
