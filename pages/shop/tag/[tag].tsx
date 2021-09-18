import {Layout} from '@components/Layout'
import {
  ProductCard,
  PRODUCT_CARD_FRAGMENT,
} from '@components/Product/ProductCard'
import {ProductGrid} from '@components/Product/ProductGrid'
import {Loading, Title} from '@components/ui'
import {client, ssrCache} from '@lib/urqlClient'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import {gql, useQuery} from 'urql'
import {Error} from '@components/ui'
import type {Product} from '@types'

const PRODUCTS_BY_TAG_QUERY = gql`
  query AllProductsByTagQuery {
    products: allProduct {
      ...ProductCardFragment
      tags
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`

const ALL_PRODUCT_TAGS_QUERY = gql`
  query AllProductTags {
    products: allProduct {
      tags
    }
  }
`

const Tag: NextPage = ({
  tag,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [result] = useQuery({query: PRODUCTS_BY_TAG_QUERY})
  const {fetching, error, data} = result
  if (fetching) return <Loading />
  if (error) {
    return <Error code={error.message} />
  }
  const products: Product[] = data.products

  const productsFiltered = products.filter((product) =>
    product?.tags?.includes(tag)
  )

  return (
    <Layout title={`#${tag}`} noindex>
      <Title as="h1">#{tag}</Title>
      <ProductGrid>
        {productsFiltered.map((product) => (
          <ProductCard key={product.slug.current} product={product} />
        ))}
      </ProductGrid>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  // This query is used to populate the cache for the query
  // used on this page.
  if (params?.tag === undefined) return <Error />
  const tag = params.tag
  await client?.query(PRODUCTS_BY_TAG_QUERY, {tag}).toPromise()

  return {
    props: {
      tag,
      urqlState: ssrCache.extractData(),
    },
    revalidate: 600,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  let allTags: string[] = []
  await client
    ?.query(ALL_PRODUCT_TAGS_QUERY)
    .toPromise()
    .then((result) => {
      result.data.products.map(({tags}: {tags: string[]}) => {
        tags.map((tag) => {
          allTags = [...new Set([...allTags, tag])]
        })
      })
    })
  const paths = allTags.map((tag) => ({
    params: {
      tag,
    },
  }))
  return {
    paths,
    fallback: 'blocking',
  }
}

export default Tag
