import {Layout} from '@components/Layout'
import {
  ProductCard,
  PRODUCT_CARD_FRAGMENT,
  PRODUCT_CATEGORY_FRAGMENT,
} from '@components/Product'
import {ProductGrid} from '@components/Product/ProductGrid'
import {Error, Loading, Title} from '@components/ui'
import {client, ssrCache} from '@lib/urqlClient'
import type {Product, ProductCategory} from '@types'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import {gql, useQuery} from 'urql'

const PRODUCTS_BY_CATEGORY_QUERY = gql`
  query AllProductsByCategoryQuery($slug: String!) {
    products: allProduct {
      ...ProductCardFragment
      categories {
        ...ProductCategoryFragment
      }
    }
    category: allCategory(where: {slug: {current: {eq: $slug}}}) {
      ...ProductCategoryFragment
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
  ${PRODUCT_CATEGORY_FRAGMENT}
`

const ALL_CATEGORIES_QUERY = gql`
  query AllCategories {
    categories: allCategory {
      ...ProductCategoryFragment
    }
  }
  ${PRODUCT_CATEGORY_FRAGMENT}
`

const Category: NextPage = ({
  slug,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [result] = useQuery({
    query: PRODUCTS_BY_CATEGORY_QUERY,
    variables: {slug},
  })
  const {fetching, error, data} = result
  if (fetching) return <Loading />
  if (error) {
    return <Error code={error.message} />
  }
  const products: Product[] = data.products
  const category: ProductCategory = data.category && data.category[0]

  const productsFiltered = products.filter((product) => {
    const categoriesFiltered = product?.categories?.filter(
      (c: ProductCategory) => c.id === category.id
    )
    return categoriesFiltered && categoriesFiltered.length > 0
  })

  return (
    <Layout title={category.title}>
      <Title as="h1">{category.title}</Title>
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
  if (params?.slug === undefined) return <Error />
  const {slug} = params
  await client?.query(PRODUCTS_BY_CATEGORY_QUERY, {slug}).toPromise()

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
    ?.query(ALL_CATEGORIES_QUERY)
    .toPromise()
    .then((result) => {
      return result.data.categories.map((category: ProductCategory) => {
        return {
          params: {
            id: category.id,
            slug: category.slug.current,
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
