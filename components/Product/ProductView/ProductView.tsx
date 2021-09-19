import {
  ProductOptions,
  PRODUCT_CARD_FRAGMENT,
  PRODUCT_CATEGORY_FRAGMENT,
  PRODUCT_OPTIONS_FRAGMENT,
  PRODUCT_VARIANT_FRAGMENT,
} from '@components/Product'
import Categories from '@components/Product/ProductView/ProductViewCategories'
import Price from '@components/Product/ProductView/ProductViewPrice'
import Tags from '@components/Product/ProductView/ProductViewTags'
import {
  AddToCart,
  Container,
  Divider,
  PortableText,
  Text,
  Title,
} from '@components/ui'
import {getProductUrl, isProductInStock} from '@lib/product'
import type {Product, SelectedOptions} from '@types'
import Image from 'next/image'
import {FC, useState} from 'react'
import tw, {styled} from 'twin.macro'
import {gql} from 'urql'

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

const ProductViewThumbnails = styled.div({
  ...tw`grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 my-3 gap-3`,
})

const ProductViewDetails = styled.div({
  ...tw`px-4 py-3`,
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
  const mainImageUrl = images[0]?.asset.url
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})
  return (
    <ProductViewContainer>
      <ProductViewImageContainer>
        {mainImageUrl && (
          <Image
            src={mainImageUrl}
            alt={title || 'Product Image'}
            width={1000}
            height={1000}
            layout="responsive"
          />
        )}
        {images.length > 1 && (
          <ProductViewThumbnails>
            {images
              //.filter((image) => image.asset.url !== mainImageUrl)
              .map((image) => (
                <Image
                  key={image.asset.url}
                  src={image.asset.url}
                  alt={title || 'Thumbnail'}
                  width={300}
                  height={300}
                  layout="responsive"
                />
              ))}
          </ProductViewThumbnails>
        )}
      </ProductViewImageContainer>
      <ProductViewDetails>
        <Title as="h1" size="lg" mb={3}>
          {title}
        </Title>
        <Text as="h2" mb={3} size="md">
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
        <Container mb={4}>
          {inStock && (
            <AddToCart
              id={id}
              price={price}
              url={getProductUrl(slug)}
              description={blurb}
              name={title}
              imageUrl={mainImageUrl}
            />
          )}
        </Container>
        {options && (
          <Container mb={8}>
            <ProductOptions
              product={product}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
          </Container>
        )}

        <Divider />

        {tags && <Tags tags={tags} />}
      </ProductViewDetails>
    </ProductViewContainer>
  )
}
