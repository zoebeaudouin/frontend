import {
  ProductCardType,
  PRODUCT_CARD_FRAGMENT,
} from '@components/Product/ProductCard'
import {
  AddToCart,
  Container,
  Divider,
  PortableText,
  Tag,
  Text,
  Title,
} from '@components/ui'
import {getProductUrl, isProductInStock} from '@lib/product'
import Image from 'next/image'
import Link from 'next/link'
import {FC} from 'react'
import tw, {styled} from 'twin.macro'
import {gql} from 'urql'
import Price from './ProductViewPrice'
import {
  ProductVariantType,
  PRODUCT_VARIANT_FRAGMENT,
} from './ProductViewVariant'

export type ProductViewType = ProductCardType & {
  blurb: string
  descriptionRaw: string
  defaultProductVariant: ProductVariantType
  variants: ProductVariantType[]
}

interface Props {
  product: ProductViewType
}

export const PRODUCT_VIEW_FRAGMENT = gql`
  fragment ProductViewFragment on Product {
    ...ProductCardFragment
    blurb
    descriptionRaw
    tags
    variants {
      ...ProductVariantFragment
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
`

const ProductViewContainer = styled.div({
  ...tw`grid grid-cols-1 md:grid-cols-2`,
})

const ProductViewImageContainer = styled.div({})

const ProductViewDetails = styled.div({
  ...tw`md:px-6 py-3`,
})

export const ProductView: FC<Props> = ({product}) => {
  const {
    id,
    title,
    slug,
    defaultProductVariant: {stock, price},
    images,
    blurb,
    descriptionRaw,
    tags,
    variants,
  } = product

  const inStock = isProductInStock(stock)
  const imageUrl = images[0]?.asset.url
  return (
    <ProductViewContainer>
      <ProductViewImageContainer>
        {images && (
          <Image
            src={imageUrl}
            alt={title || 'Product Image'}
            width={1000}
            height={1000}
            layout="responsive"
          />
        )}
      </ProductViewImageContainer>
      <ProductViewDetails>
        <Title as="h1" size="lg" mb={3}>
          {title}
        </Title>
        <Text mb={3} size="md">
          {blurb}
        </Text>
        <Text mb={3}>
          {inStock ? (
            <Price price={price} />
          ) : (
            <span css={{fontWeight: 'bold'}}>Out of stock</span>
          )}
        </Text>
        <Text mb={4}>
          <PortableText content={descriptionRaw} />
        </Text>
        <Container mb={8} mr={3}>
          {inStock && (
            <AddToCart
              id={id}
              price={price}
              url={getProductUrl(slug)}
              description={blurb}
              name={title}
              imageUrl={imageUrl}
            />
          )}
        </Container>

        <Divider />

        <Text mt={8}>
          Tags:{' '}
          {tags.map((tag) => (
            <Link key={tag} href={`/shop/tag/${tag}`} passHref>
              <Tag as="a">{tag}</Tag>
            </Link>
          ))}
        </Text>
      </ProductViewDetails>
    </ProductViewContainer>
  )
}
