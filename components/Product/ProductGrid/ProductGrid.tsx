import tw, {styled} from 'twin.macro'

export const ProductGrid = styled.div({
  ...tw`grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2`,
})
