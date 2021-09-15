import {Logo} from '@components/Logo'
import {Navbar} from '@components/Navbar'
import {Container} from '@components/ui'
import {motion} from 'framer-motion'
import {NextSeo} from 'next-seo'
import {useRouter} from 'next/router'
import React, {ReactNode} from 'react'
import tw, {styled} from 'twin.macro'

type Props = {
  children: ReactNode
  title?: string
  description?: string
  noindex?: boolean
}

const LayoutContainer = styled(Container, {})

const PXContainer = styled(Container, {
  ...tw`px-4 md:px-8 2xl:px-48`,
})
const MainContainer = styled(PXContainer, {})

const LogoContainer = styled(PXContainer, {
  ...tw`pt-4`,
})

export const Layout = ({
  children,
  title,
  description,
  noindex = false,
}: Props): JSX.Element => {
  const router = useRouter()
  const isHome = router.asPath === '/' ? true : false
  const variants = {
    hidden: {opacity: 0, x: 0, y: 0},
    enter: {opacity: 1, x: 0, y: 0},
    exit: {opacity: 0, x: 0, y: 0},
  }
  return (
    <LayoutContainer>
      <NextSeo
        title={title}
        description={description}
        openGraph={{title, description}}
        noindex={noindex}
      />
      <LogoContainer>
        <Logo as={isHome ? `h1` : `p`} />
      </LogoContainer>
      <Navbar />
      <motion.main
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{type: 'linear'}}
      >
        <MainContainer>{children}</MainContainer>
      </motion.main>
      <footer></footer>
    </LayoutContainer>
  )
}
