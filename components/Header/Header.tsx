import {Logo} from '@components/Logo'
import {Navbar} from '@components/Navbar'
import {FC} from 'react'
import tw, {styled} from 'twin.macro'
import {Container, MobileMenuButton} from '@components/ui'

const MobileMenuBtnAndLogo = styled(Container, {
  ...tw`relative flex items-center justify-center sm:justify-start`,
})

export const Header: FC = () => {
  return (
    <>
      <MobileMenuBtnAndLogo>
        <MobileMenuButton />
        <Logo />
      </MobileMenuBtnAndLogo>
      <Navbar />
    </>
  )
}
