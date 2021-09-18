import {Layout} from '@components/Layout'
import {
  ProductView,
  PRODUCT_VIEW_FRAGMENT,
} from '@components/Product/ProductView'
import {client, ssrCache} from '@lib/urqlClient'
import type {Product, Slug} from '@types'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import {gql, useQuery} from 'urql'
import {Loading, Error} from '@components/ui'

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

const ProductPage: NextPage = ({
  slug,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [result] = useQuery({
    query: PRODUCT_QUERY,
    variables: {slug: slug.current},
  })
  const {fetching, error, data} = result
  if (fetching) return <Loading />
  if (error) {
    return <Error code={error.message} />
  }
  const product: Product = data.product?.[0]
  return (
    <Layout title={product.title} description={product.blurb}>
      <ProductView key={product.slug.current} product={product} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  // This query is used to populate the cache for the query
  // used on this page.
  if (params?.slug === undefined) return <Error />
  const slug: Slug = {current: params.slug[0] as string}
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
      return result.data.products.map((product: Product) => {
        return {
          params: {
            id: product.id,
            slug: [product.slug.current],
          },
        }
      })
    })
  return {
    paths,
    fallback: 'blocking',
  }
}

export default ProductPage
