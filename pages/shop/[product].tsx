import {Layout} from '@components/Layout'
import {
  ProductView,
  ProductViewType,
  PRODUCT_VIEW_FRAGMENT,
} from '@components/Product/ProductView'
import {client, ssrCache} from '@lib/urqlClient'
import type {Slug} from '@types'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import {gql, useQuery} from 'urql'

const PRODUCT_QUERY = gql`
  query ProductQuery($slug: String!) {
    product: allProduct(where: {slug: {current: {eq: $slug}}}) {
      ...ProductViewFragment
    }
  }
  ${PRODUCT_VIEW_FRAGMENT}
`

const ALL_PRODUCT_SLUGS_QUERY = gql`
  query AllProductSlugs {
    products: allProduct {
      id: _id
      slug {
        current
      }
    }
  }
`

const Product: NextPage = ({
  slug,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [result] = useQuery({
    query: PRODUCT_QUERY,
    variables: {slug: slug.current},
  })
  const {fetching, error, data} = result
  if (fetching) return <div>Loading...</div>
  if (error) {
    return <div>Error</div>
  }
  const product: ProductViewType = data.product?.[0]
  return (
    <Layout title={product.title} description={product.blurb}>
      <ProductView key={product.slug.current} product={product} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  // This query is used to populate the cache for the query
  // used on this page.
  if (params?.product === undefined) return <div>Error</div>
  const slug: Slug = {current: params.product as string}
  await client?.query(PRODUCT_QUERY, {slug: slug.current}).toPromise()

  return {
    props: {
      slug,
      urqlState: ssrCache.extractData(),
    },
    revalidate: 600,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await client
    ?.query(ALL_PRODUCT_SLUGS_QUERY)
    .toPromise()
    .then((result) => {
      return result.data.products.map(
        ({id, slug}: {id: string; slug: Slug}) => {
          return {
            params: {
              id: id,
              product: slug.current,
            },
          }
        }
      )
    })
  return {
    paths,
    fallback: 'blocking',
  }
}

export default Product
