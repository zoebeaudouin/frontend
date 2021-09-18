import {
  PRODUCT_CARD_FRAGMENT,
  PRODUCT_CATEGORY_FRAGMENT,
  PRODUCT_OPTIONS_FRAGMENT,
  PRODUCT_VARIANT_FRAGMENT,
} from '@components/Product'
import Categories from '@components/Product/ProductView/ProductViewCategories'
import Price from '@components/Product/ProductView/ProductViewPrice'
import {
  AddToCart,
  Container,
  Divider,
  PortableText,
  Tag,
  Text,
  Title,
} from '@components/ui'
import {getProductTagUrl, getProductUrl, isProductInStock} from '@lib/product'
import type {Product} from '@types'
import Image from 'next/image'
import Link from 'next/link'
import {FC} from 'react'
import tw, {styled} from 'twin.macro'
import {gql} from 'urql'
import {ProductOptions} from '@components/Product'

export const PRODUCT_VIEW_FRAGMENT = gql`
  fragment ProductViewFragment on Product {
    ...ProductCardFragment
    blurb
    descriptionRaw
    tags
    variants {
      ...ProductVariantFragment
    }
    categories {
      ...ProductCategoryFragment
    }
    ...ProductOptionsFragment
  }
  ${PRODUCT_CARD_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  ${PRODUCT_CATEGORY_FRAGMENT}
  ${PRODUCT_OPTIONS_FRAGMENT}
`

const ProductViewContainer = styled.div({
  ...tw`grid grid-cols-1 md:grid-cols-2`,
})

const ProductViewImageContainer = styled.div({width: '100%'})

const ProductViewDetails = styled.div({
  ...tw`md:px-6 py-3`,
})

interface Props {
  product: Product
}
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
    categories,
    options,
  } = product

  const inStock = isProductInStock(stock)
  const imageUrl = images[0]?.asset.url

  return (
    <ProductViewContainer>
      <ProductViewImageContainer>
        {imageUrl && (
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
        {categories && <Categories categories={categories} />}
        <Text mb={3}>
          {inStock ? (
            <Price price={price} />
          ) : (
            <span css={{fontWeight: 'bold'}}>Out of stock</span>
          )}
        </Text>
        <Text mb={4}>
          {descriptionRaw && <PortableText content={descriptionRaw} />}
        </Text>
        <Container mb={8}>
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
        {options && (
          <Container mb={8}>
            <ProductOptions options={options} />
          </Container>
        )}

        <Divider />

        {tags && (
          <Text mt={8} text={`sm`}>
            Tags:{' '}
            {tags.map((tag) => (
              <Link key={tag} href={getProductTagUrl(tag)} passHref>
                <Tag as="a">{tag}</Tag>
              </Link>
            ))}
          </Text>
        )}
      </ProductViewDetails>
    </ProductViewContainer>
  )
}
