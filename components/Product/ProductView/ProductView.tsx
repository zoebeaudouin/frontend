import {FC} from 'react'
import {gql} from 'urql'
import {Title, Text} from '@components/ui'
import Link from 'next/link'
import Image from 'next/image'
import {styled} from 'twin.macro'
import {
  ProductCardType,
  PRODUCT_CARD_FRAGMENT,
} from '@components/Product/ProductCard'

export type ProductViewType = ProductCardType & {
  blurb: string
}

interface Props {
  product: ProductViewType
}

export const PRODUCT_VIEW_FRAGMENT = gql`
  fragment ProductViewFragment on Product {
    ...ProductCardFragment
    blurb
  }
  ${PRODUCT_CARD_FRAGMENT}
`

const ProductViewContainer = styled.a({
  display: 'block',
  flexDirection: 'column',
  backgroundColor: 'black',
  color: 'white',
})

export const ProductView: FC<Props> = ({product}) => (
  <Link href={`/shop/${product.slug.current}`} passHref>
    <ProductViewContainer>
      {product?.images && (
        <Image
          src={product.images[0]?.asset.url}
          alt={product.title || 'Product Image'}
          width={1000}
          height={1000}
          layout="responsive"
        />
      )}
      <Title as="h2" size="sm" px={3} pt={3}>
        {product.title}
      </Title>
      <Text px={3} pb={3}>
        {product.defaultProductVariant.price}€
      </Text>
    </ProductViewContainer>
  </Link>
)
