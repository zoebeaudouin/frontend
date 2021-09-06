import {FC} from 'react'
import {gql} from 'urql'
import {Title, Text} from '@components/ui'
import Link from 'next/link'
import Image from 'next/image'
import {styled} from 'twin.macro'
import type {Slug} from '@types'

type Image = {
  url: string
}
type Asset = {
  asset: Image
}
type DefaultProductVariant = {
  price: number
}

export type ProductCardType = {
  id: string
  title: string
  slug: Slug
  images: Array<Asset>
  defaultProductVariant: DefaultProductVariant
}

interface Props {
  product: ProductCardType
}

export const PRODUCT_CARD_FRAGMENT = gql`
  fragment ProductCardFragment on Product {
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
    }
  }
`

const ProductCardContainer = styled.a({
  display: 'block',
  flexDirection: 'column',
  backgroundColor: 'black',
  color: 'white',
})

export const ProductCard: FC<Props> = ({product}) => (
  <Link href={`/shop/${product.slug.current}`} passHref>
    <ProductCardContainer>
      {product?.images && (
        <Image
          src={product.images[0]?.asset.url}
          alt={product.title || 'Product Image'}
          width={500}
          height={500}
          layout="responsive"
        />
      )}
      <Title as="h2" size="sm" px={3} pt={3}>
        {product.title}
      </Title>
      <Text px={3} pb={3}>
        {product.defaultProductVariant.price}€
      </Text>
    </ProductCardContainer>
  </Link>
)
