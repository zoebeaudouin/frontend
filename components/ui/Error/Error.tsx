import {Container, Frame, Text, Title} from '@components/ui'
import Image from 'next/image'
import {FC} from 'react'
import tw, {styled} from 'twin.macro'
import doc from './doc.gif'

interface Props {
  children?: React.ReactNode
}

const Code = styled(Container, {
  ...tw`bg-black p-5 text-green-400 font-bold`,
})
export const Error: FC<Props> = ({children}) => (
  <Frame>
    <Image src={doc} alt={`Loading`} />
    <Title>Oooops !</Title>
    <Text mt={5} mb={5}>
      Something went wrroonngg, sorry about that.{' '}
      {children && <>Please contact me with this code:</>}
    </Text>

    {children && <Code>{children}</Code>}
  </Frame>
)
