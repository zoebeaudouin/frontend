import {Text} from '@components/ui'
import {getProductCategoryUrl} from '@lib/product'
import {styled} from 'twin.macro'
import {ProductCategory} from '@types'
import Link from 'next/link'
import {FC} from 'react'
import tw from 'twin.macro'
interface Props {
  categories: ProductCategory[]
}

const StyledLink = styled.a({
  ...tw`text-black font-medium`,
})

const Container = styled.h3({
  size: `base`,
  ...tw`mb-3`,
  ...tw`text-gray-600`,
  ...tw`inline-block`,
})

const Categories: FC<Props> = ({categories}) => (
  <Container>
    In{` `}
    {categories
      .map((category) => (
        <Link
          href={getProductCategoryUrl(category.slug)}
          key={category.id}
          passHref
        >
          <StyledLink>{category.title}</StyledLink>
        </Link>
      ))
      .reduce((prev, curr) => [prev, ', ', curr])}
  </Container>
)

export default Categories
