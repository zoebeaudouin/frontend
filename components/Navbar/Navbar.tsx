import {FC} from 'react'
import tw, {styled} from 'twin.macro'
import Link from 'next/link'

const NavbarContainer = styled.div({
  ...tw`bg-black mb-4 px-8 text-white relative flex items-center h-12 justify-between md:justify-start md:space-x-12`,
  fontFamily: '$mono',
  a: {
    ...tw`transition-all duration-200`,
    '&:hover': {
      ...tw`text-gray-200`,
    },
  },
})

export const Navbar: FC = () => (
  <NavbarContainer>
    <Link href={'/'}>Home</Link>
    <Link href={'/bio'}>Bio</Link>
    <Link href={'/work'}>Work</Link>
    <Link href={'/shop'}>Shop</Link>
    <Link href={'/contact'}>Contact</Link>
  </NavbarContainer>
)
