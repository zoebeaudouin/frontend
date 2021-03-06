import {FC} from 'react'
import {gql} from 'urql'
import {Title, Text} from '@components/ui'
import Link from 'next/link'
import Image from 'next/image'
import tw, {styled} from 'twin.macro'

import {isProductInStock} from '@lib/product'
import {formatPrice} from '@lib/product'

import {getProductUrl} from '@lib/product'
import type {Product} from '@types'

interface Props {
  product: Product
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

const ProductCardImageContainer = styled.div({width: '100%'})

const ProductCardDetails = styled.div({
  ...tw`p-3`,
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
          <ProductCardImageContainer>
            <Image
              src={images[0]?.asset.url}
              alt={title || 'Product Image'}
              width={500}
              height={500}
              layout="responsive"
            />
          </ProductCardImageContainer>
        )}
        <ProductCardDetails>
          <Title as="h2" size="sm">
            {title}
          </Title>
          <Text>{inStock ? `${formatPrice(price)}` : 'Out of stock'}</Text>
        </ProductCardDetails>
      </ProductCardContainer>
    </Link>
  )
}
