import {Text} from '@components/ui'
import {styled} from '@stitches/react'
import {FC} from 'react'
import tw from 'twin.macro'
import {gql} from 'urql'

interface ProductVariantType {
  default: boolean
  title?: string
  price: number
  stock: number
  hexColor?: string
}

interface Props {
  variant: ProductVariantType
}

export const PRODUCT_VARIANT_FRAGMENT = gql`
  fragment ProductVariantFragment on ProductVariant {
    title
    price
    stock
    hexColor
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
