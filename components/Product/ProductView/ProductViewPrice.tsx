import {Text} from '@components/ui'
import {formatPrice} from '@lib/product'
import {styled} from '@stitches/react'
import {FC} from 'react'
import tw from 'twin.macro'

interface Props {
  price: number
  mb?: number
}

const Container = styled(Text, {
  size: `md`,
  ...tw`text-gray-600`,
  ...tw`border-b-2 border-gray-600`,
  ...tw`inline-block`,
})

const Price: FC<Props> = ({price, mb = 0}) => (
  <Container as="span" mb={mb}>
    {formatPrice(price)}
  </Container>
)
export default Price
