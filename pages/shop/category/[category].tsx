import {Layout} from '@components/Layout'
import {
  ProductCard,
  ProductCardType,
  PRODUCT_CARD_FRAGMENT,
} from '@components/Product/ProductCard'
import type {ProductCategory} from '@components/Product/ProductCategory'
import {ProductGrid} from '@components/Product/ProductGrid'
import {Title} from '@components/ui'
import {client, ssrCache} from '@lib/urqlClient'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import {gql, useQuery} from 'urql'

const PRODUCTS_BY_CATEGORY_QUERY = gql`
  query AllProductsByCategoryQuery {
    products: allProduct {
      ...ProductCardFragment
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`

const ALL_CATEGORIES_QUERY = gql`
  query AllCategories {
    categories: allCategory {
      id: _id
      title
      slug {
        current
      }
    }
  }
`

const Category: NextPage = ({
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [result] = useQuery({query: PRODUCTS_BY_CATEGORY_QUERY})
  const {fetching, error, data} = result
  if (fetching) return <div>Loading...</div>
  if (error) {
    return <div>Error</div>
  }
  const products: ProductCardType[] = data.products

  const productsFiltered = products.filter((product) =>
    product.categories?.includes(category)
  )

  return (
    <Layout title={category}>
      <Title as="h1" mb={4}>
        {category}
      </Title>
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
  if (params?.category === undefined) return <div>Error</div>
  const category = params.category
  await client?.query(PRODUCTS_BY_CATEGORY_QUERY, {category}).toPromise()

  return {
    props: {
      category,
      urqlState: ssrCache.extractData(),
    },
    revalidate: 600,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await client
    ?.query(ALL_CATEGORIES_QUERY)
    .toPromise()
    .then((result) => {
      return result.data.categories.map((category: ProductCategory) => {
        return {
          params: {
            id: category.id,
            category: category.slug.current,
          },
        }
      })
    })
  return {
    paths,
    fallback: 'blocking',
  }
}

export default Category
