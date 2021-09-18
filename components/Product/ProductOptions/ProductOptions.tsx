import {ProductSwatch} from '@components/Product'
import {Container, Title} from '@components/ui'
import type {IProductOption} from '@types'
import {FC} from 'react'
import tw, {styled} from 'twin.macro'
import {gql} from 'urql'

export const PRODUCT_OPTIONS_FRAGMENT = gql`
  fragment ProductOptionsFragment on Product {
    options {
      name
      values {
        label
        hexColor
      }
    }
  }
`
const OptionContainer = styled(Container, {
  display: 'flex',
  flexDirection: 'column',
  ...tw`mb-3`,
  ...tw`text-gray-600`,
})

const ValuesContainer = styled(Container, {
  ...tw`flex flex-row`,
})

interface Props {
  options: IProductOption[]
}
export const ProductOptions: FC<Props> = ({options}) => {
  return (
    <>
      {options.map((option) => (
        <OptionContainer key={option.name}>
          <Title as="h3" size="xs">
            {option.name}
          </Title>
          <ValuesContainer>
            {option.values.map((value) => (
              <ProductSwatch key={value.label} value={value} />
            ))}
          </ValuesContainer>
        </OptionContainer>
      ))}
    </>
  )
}
