import {Layout} from '@components/Layout'
import {
  ProductCard,
  ProductCardType,
  PRODUCT_CARD_FRAGMENT,
} from '@components/Product/ProductCard'
import {ProductGrid} from '@components/Product/ProductGrid'
import {Loading, Error} from '@components/ui'
import {client, ssrCache} from '@lib/urqlClient'
import type {GetStaticProps, NextPage} from 'next'
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
  if (fetching) return <Loading />
  if (error) {
    return <Error code={error.message} />
  }
  const products: ProductCardType[] = data.products
  return (
    <Layout>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.slug.current} product={product} />
        ))}
      </ProductGrid>
    </Layout>
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
    revalidate: 600,
  }
}

export default Index
