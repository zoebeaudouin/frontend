import React, {FC} from 'react'
import {Container} from '@components/ui'
import {Logo} from '@components/Logo'
import {Navbar} from '@components/Navbar'

export const Layout: FC = ({children}) => {
  return (
    <Container p={3}>
      <Logo />
      <Navbar />
      <main>{children}</main>
      <footer></footer>
    </Container>
  )
}
