import {Title} from '@components/ui'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {FC} from 'react'
import tw, {styled} from 'twin.macro'

const LogoContainer = styled.div({
  ...tw`sm:px-8 2xl:px-48 pt-3`,
})

export const Logo: FC = ({...props}) => {
  const router = useRouter()
  const isHome = router.asPath === '/' ? true : false
  return (
    <LogoContainer>
      <Link href={'/'}>
        <a>
          <Title mb={2} as={isHome ? `h1` : `p`} {...props}>
            Zoé Beaudouin
          </Title>
        </a>
      </Link>
    </LogoContainer>
  )
}
