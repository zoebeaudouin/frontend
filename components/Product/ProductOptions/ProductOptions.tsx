import {ProductSwatch} from '@components/Product'
import {Container, Title} from '@components/ui'
import type {IProductOption, Product, SelectedOptions} from '@types'
import {Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
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

const OptionTitle = styled(Title, {
  ...tw`uppercase tracking-wide `,
})

interface Props {
  product: Product
  selectedOptions: SelectedOptions
  setSelectedOptions: Dispatch<SetStateAction<SelectedOptions>>
  //options: IProductOption[]
}
export const ProductOptions: FC<Props> = ({
  product,
  selectedOptions,
  setSelectedOptions,
}) => {
  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions)
  }, [product])

  return (
    <>
      {product?.options?.map((option) => {
        return (
          <OptionContainer key={option.name}>
            <OptionTitle as="h4" size="xs">
              {option.name}
            </OptionTitle>
            <ValuesContainer>
              {option.values.map((value) => {
                const isActive =
                  selectedOptions[option.name.toLowerCase()] ===
                  value.label.toLowerCase()
                return (
                  <ProductSwatch
                    key={value.label}
                    value={value}
                    active={isActive}
                    onClick={() => {
                      setSelectedOptions((selectedOptions) => {
                        return {
                          ...selectedOptions,
                          [option.name.toLowerCase()]:
                            value.label.toLowerCase(),
                        }
                      })
                    }}
                  />
                )
              })}
            </ValuesContainer>
          </OptionContainer>
        )
      })}
    </>
  )
}

function selectDefaultOptionFromProduct(
  product: Product,
  updater: Dispatch<SetStateAction<SelectedOptions>>
) {
  // Selects the default option
  product?.options?.forEach((value) => {
    updater((choices) => ({
      ...choices,
      [value.name.toLowerCase()]: value.values[0].label.toLowerCase(),
    }))
  })
}
