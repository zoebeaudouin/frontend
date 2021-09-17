import {Container, Title} from '@components/ui'
import Image from 'next/image'
import {FC} from 'react'
import tw, {styled} from 'twin.macro'
import bob from './bob.gif'

const LoadingWrapper = styled(Container, {
  ...tw`flex h-screen`,
})

const LoadingContent = styled(Container, {
  ...tw`border-black border-2`,
  ...tw`m-auto`,
  ...tw`p-24`,
  ...tw`text-center`,
})

interface Props {
  children?: React.ReactNode
}

export const Loading: FC<Props> = ({children}) => (
  <LoadingWrapper>
    <LoadingContent>
      <Image src={bob} alt={`Loading`} />
      <Title>Loading !</Title>
      {children && children}
    </LoadingContent>
  </LoadingWrapper>
)
