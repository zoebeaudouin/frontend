import {gql} from 'urql'

export const PRODUCT_CATEGORY_FRAGMENT = gql`
  fragment ProductCategoryFragment on Category {
    id: _id
    title
    slug {
      current
    }
  }
`
