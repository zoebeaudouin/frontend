import {
  ProductCardType,
  PRODUCT_CARD_FRAGMENT,
} from '@components/Product/ProductCard'
import {
  Button,
  Container,
  Divider,
  PortableText,
  Tag,
  Text,
  Title,
} from '@components/ui'
import {isProductInStock} from '@lib/product'
import Image from 'next/image'
import Link from 'next/link'
import {FC} from 'react'
import tw, {styled} from 'twin.macro'
import {gql} from 'urql'
import Price from './ProductViewPrice'

export type ProductViewType = ProductCardType & {
  blurb: string
  descriptionRaw: string
  tags: string[]
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
  }
  ${PRODUCT_CARD_FRAGMENT}
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
    title,
    //slug: {current: slug},
    defaultProductVariant: {price, stock},
    images,
    blurb,
    descriptionRaw,
    tags,
  } = product
  const inStock = isProductInStock(stock)
  return (
    <ProductViewContainer>
      <ProductViewImageContainer>
        {images && (
          <Image
            src={images[0]?.asset.url}
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
        <Container mb={8}>
          {inStock && (
            <Button primary mr={3}>
              Add to cart
            </Button>
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
