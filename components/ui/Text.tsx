import tw, {styled} from 'twin.macro'
import {Container} from '@components/ui/Container'

export const Text = styled(Container, {
  variants: {
    size: {
      base: tw`text-base`,
      sm: tw`text-2xl`,
      md: tw`text-3xl`,
      lg: tw`text-6xl`,
    },
  },
  defaultVariants: {
    size: 'base',
  },
})
