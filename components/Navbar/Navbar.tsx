import {FC} from 'react'
import tw, {styled} from 'twin.macro'
import Link from 'next/link'

const NavbarContainer = styled.nav({
  ...tw`hidden sm:flex sticky top-0 bg-black mb-4 sm:px-8 2xl:px-48 text-white z-10 items-center h-12 justify-between md:justify-start md:space-x-12`,

  fontFamily: '$mono',
  a: {
    ...tw`transition-all duration-200`,
    '&:hover': {
      ...tw`text-gray-300`,
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
