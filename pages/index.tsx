import {
  ProductCard,
  ProductCardType,
  PRODUCT_CARD_FRAGMENT,
} from '@components/Product/ProductCard'
import {ProductGrid} from '@components/Product/ProductGrid'
import {client, ssrCache} from '@lib/urqlClient'
import type {GetStaticProps, NextPage} from 'next'
import {NextSeo} from 'next-seo'
import {gql, useQuery} from 'urql'

const PRODUCTS_QUERY = gql`
  query AllProductsQuery {
    products: allProduct {
      ...ProductCardFragment
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`

const Index: NextPage = () => {
  const [result] = useQuery({query: PRODUCTS_QUERY})
  const {fetching, error, data} = result
  if (fetching) return <div>Loading...</div>
  if (error) {
    return <div>Error</div>
  }
  const products: ProductCardType[] = data.products
  return (
    <>
      <NextSeo
        title="Zoé Beaudouin"
        description="A short description goes here."
      />
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.slug.current} product={product} />
        ))}
      </ProductGrid>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // This query is used to populate the cache for the query
  // used on this page.
  await client?.query(PRODUCTS_QUERY).toPromise()
  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState: ssrCache.extractData(),
    },
    revalidate: 60,
  }
}

export default Index
