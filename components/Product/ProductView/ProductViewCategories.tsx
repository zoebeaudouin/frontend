import {Text} from '@components/ui'
import {getProductCategoryUrl} from '@lib/product'
import {styled} from '@stitches/react'
import {ProductCategoryType} from '@types'
import Link from 'next/link'
import {FC} from 'react'
import tw from 'twin.macro'
interface Props {
  categories: ProductCategoryType[]
}

const StyledLink = styled(Link, {
  size: `md`,
  ...tw`text-gray-600`,
  ...tw`border-b-2 border-gray-600`,
  ...tw`inline-block`,
})

const Categories: FC<Props> = ({categories}) => (
  <Text mb={3} size="base">
    In{` `}
    {categories
      .map((category) => (
        <StyledLink
          href={getProductCategoryUrl(category.slug)}
          key={category.id}
        >
          {category.title}
        </StyledLink>
      ))
      .reduce((prev, curr) => [prev, ', ', curr])}
  </Text>
)

export default Categories
