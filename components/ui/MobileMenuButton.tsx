import tw, {styled} from 'twin.macro'
import {FC} from 'react'

const Wrapper = styled.nav({
  ...tw`absolute bg-black text-white hover:bg-gray-900 inset-y-0 left-0 flex items-center sm:hidden`,
})

const Button = styled.button({
  ...tw`inline-flex items-center justify-around p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white w-12`,
})

const Open = () => (
  <svg
    className="block h-6 w-6"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
)

const Close = () => (
  <svg
    className="hidden h-6 w-6"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
)

export const MobileMenuButton: FC = () => (
  <Wrapper>
    <Button>
      <Open />
    </Button>
  </Wrapper>
)
