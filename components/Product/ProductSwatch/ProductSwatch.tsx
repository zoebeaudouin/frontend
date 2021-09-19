import type {IProductOptionValue} from '@types'
import {FC} from 'react'
import tw, {styled} from 'twin.macro'

const Swatch = styled.button({
  ...tw`font-bold text-black`,
  ...tw`mr-2`,
  variants: {
    rounded: {
      true: {...tw`inline-block w-10 h-10 rounded-full`},
      false: {
        ...tw`border-2 p-2 border-black`,
        '&:hover': {
          ...tw`bg-black text-white transition duration-500 ease-in-out`,
        },
      },
    },
  },
})

interface Props {
  active?: boolean
  children?: React.ReactChildren
  value: IProductOptionValue
  onClick: React.MouseEvent<HTMLElement>
}
export const ProductSwatch: FC<Props> = ({
  active,
  value: {hexColor, label},
  ...props
}) => {
  const isRounded = hexColor ? true : false
  return (
    <Swatch
      rounded={isRounded}
      style={hexColor && {backgroundColor: hexColor, borderColor: hexColor}}
      {...props}
    >
      {!hexColor && label}
      {active && 'X'}
    </Swatch>
  )
}
