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
}

const LayoutStyle = styled(Container, {
  ...tw`p-3`,
})

export const Layout = ({children, title, description}: Props): JSX.Element => {
  const router = useRouter()
  const isHome = router.asPath === '/' ? true : false
  const variants = {
    hidden: {opacity: 0, x: 0, y: 0},
    enter: {opacity: 1, x: 0, y: 0},
    exit: {opacity: 0, x: 0, y: 0},
  }
  return (
    <LayoutStyle>
      <NextSeo
        title={title}
        description={description}
        openGraph={{title, description}}
      />
      <Logo as={isHome ? `h1` : `p`} />
      <Navbar />
      <motion.main
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{type: 'linear'}}
      >
        {children}
      </motion.main>
      <footer></footer>
    </LayoutStyle>
  )
}
