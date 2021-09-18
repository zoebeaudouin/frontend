import tw, {styled} from 'twin.macro'
import {Container} from '@components/ui/Container'

export const Text = styled(Container, {
  variants: {
    size: {
      base: tw`text-base`,
      sm: tw`text-lg md:text-xl lg:text-2xl`,
      md: tw`text-xl md:text-2xl lg:text-3xl`,
      lg: tw`text-4xl md:text-5xl lg:text-6xl`,
    },
  },
  defaultVariants: {
    size: 'base',
  },
})
