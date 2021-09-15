import {Layout} from '@components/Layout'
import {Title} from '@components/ui'
import {
  ProductCard,
  ProductCardType,
  PRODUCT_CARD_FRAGMENT,
} from '@components/Product/ProductCard'
import {ProductGrid} from '@components/Product/ProductGrid'
import {client, ssrCache} from '@lib/urqlClient'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import {gql, useQuery} from 'urql'

const PRODUCTS_BY_TAG_QUERY = gql`
  query AllProductsQuery {
    products: allProduct {
      ...ProductCardFragment
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
  if (fetching) return <div>Loading...</div>
  if (error) {
    return <div>Error</div>
  }
  const products: ProductCardType[] = data.products
  return (
    <Layout title={`Tag: ${tag}`}>
      <Title as="h1" mb={4}>
        Tag: {tag}
      </Title>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.slug.current} product={product} />
        ))}
      </ProductGrid>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  // This query is used to populate the cache for the query
  // used on this page.
  if (params?.tag === undefined) return <div>Error</div>
  const tag = params.tag
  await client?.query(PRODUCTS_BY_TAG_QUERY, {tag: tag}).toPromise()

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
      tag: tag,
    },
  }))
  return {
    paths,
    fallback: 'blocking',
  }
}

export default Tag
