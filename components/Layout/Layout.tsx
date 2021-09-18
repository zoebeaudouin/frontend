import {Header} from '@components/Header'
import {Container} from '@components/ui'
import {motion} from 'framer-motion'
import {NextSeo} from 'next-seo'
import React, {ReactNode} from 'react'
import tw, {styled} from 'twin.macro'

type Props = {
  children: ReactNode
  title?: string
  description?: string
  noindex?: boolean
}

const LayoutContainer = styled(Container, {})

const MainContainer = styled(Container, {
  ...tw`px-0 sm:px-8 2xl:px-48`,
})

export const Layout = ({
  children,
  title,
  description,
  noindex = false,
}: Props): JSX.Element => {
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
      <Header />
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
