import {Text} from '@components/ui'
import {styled} from '@stitches/react'
import type {ProductVariantType} from '@types'
import {FC} from 'react'
import tw from 'twin.macro'
import {gql} from 'urql'

interface Props {
  variant: ProductVariantType
}

export const PRODUCT_VARIANT_FRAGMENT = gql`
  fragment ProductVariantFragment on ProductVariant {
    title
    price
    stock
  }
`

const DetailStyled = styled(Text, {
  size: `sm`,
  ...tw`text-gray-600`,
})

const ProductVariant: FC<Props> = ({variant}) => (
  <>
    <DetailStyled as="span">{variant.price}</DetailStyled>
  </>
)
export default ProductVariant
export type {ProductVariantType}
