import tw, {styled} from 'twin.macro'

export const Container = styled.div({
  //...tw`container`,
  variants: {
    p: {
      1: tw`p-1`,
      2: tw`p-2`,
      3: tw`p-3`,
      4: tw`p-4`,
      5: tw`p-5`,
      6: tw`p-6`,
    },
    px: {
      1: tw`px-1`,
      2: tw`px-2`,
      3: tw`px-3`,
      4: tw`px-4`,
      5: tw`px-5`,
      6: tw`px-6`,
    },
    py: {
      1: tw`py-1`,
      2: tw`py-2`,
      3: tw`py-3`,
      4: tw`py-4`,
      5: tw`py-5`,
      6: tw`py-6`,
    },
    pt: {
      1: tw`pt-1`,
      2: tw`pt-2`,
      3: tw`pt-3`,
      4: tw`pt-4`,
      5: tw`pt-5`,
      6: tw`pt-6`,
    },
    pb: {
      1: tw`pb-1`,
      2: tw`pb-2`,
      3: tw`pb-3`,
      4: tw`pb-4`,
      5: tw`pb-5`,
      6: tw`pb-6`,
    },
    mb: {
      1: tw`mb-1`,
      2: tw`mb-2`,
      3: tw`mb-3`,
      4: tw`mb-4`,
      5: tw`mb-5`,
      6: tw`mb-6`,
    },
  },
})
