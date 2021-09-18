import {Container} from '@components/ui'
import {FC} from 'react'
import tw, {styled} from 'twin.macro'

const FrameWrapper = styled(Container, {
  ...tw`flex h-screen`,
})

const FrameContent = styled(Container, {
  ...tw`border-black border-2`,
  ...tw`m-auto`,
  ...tw`p-24 m-4`,
  ...tw`text-center`,
})

interface Props {
  children: React.ReactNode
}

export const Frame: FC<Props> = ({children}) => (
  <FrameWrapper>
    <FrameContent>{children}</FrameContent>
  </FrameWrapper>
)
