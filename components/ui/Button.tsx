import tw, {styled} from 'twin.macro'

export const Button = styled.button({
  ...tw`rounded-full`,
  ...tw`px-6 md:px-4 py-2`,
  ...tw`border-black border-2`,
  fontFamily: '$urbanist',
  variants: {
    primary: {
      true: {
        ...tw`bg-black text-white`,
        ...tw`transition duration-500 ease-in-out hover:bg-black hover:border-black hover:text-white transform hover:-translate-y-1`,
      },
    },
    secondary: {
      true: {...tw`bg-white text-black`},
    },
    mr: {
      1: tw`mr-1`,
      2: tw`mr-2`,
      3: tw`mr-3`,
      4: tw`mr-4`,
      5: tw`mr-5`,
      6: tw`mr-6`,
    },
  },
  defaultVariants: {
    primary: true,
  },
})
