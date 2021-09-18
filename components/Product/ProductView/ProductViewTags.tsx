import {Tag, Text} from '@components/ui'
import {getProductTagUrl} from '@lib/product'
import {styled} from '@stitches/react'
import Link from 'next/link'
import {FC} from 'react'
import tw from 'twin.macro'
import type {Product} from '@types'

interface Props {
  tags: Product['tags']
}

const Container = styled(Text, {
  size: `sm`,
  ...tw`relative flex flex-row gap-2 flex-wrap items-center my-6 text-gray-600`,
})

const Tags: FC<Props> = ({tags}) => (
  <>
    {tags && (
      <Container>
        Tags:{' '}
        {tags.map((tag) => (
          <Link key={tag} href={getProductTagUrl(tag)} passHref>
            <Tag as="a">#{tag}</Tag>
          </Link>
        ))}
      </Container>
    )}
  </>
)
export default Tags
