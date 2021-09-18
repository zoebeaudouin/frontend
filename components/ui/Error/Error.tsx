import {Container, Frame, Text, Title, Button} from '@components/ui'
import Image from 'next/image'
import {FC} from 'react'
import tw, {styled} from 'twin.macro'
import doc from './doc.gif'
import Link from 'next/link'

interface Props {
  title?: string
  message?: string
  code?: string
  //children?: React.ReactNode
}

const Code = styled(Container, {
  ...tw`bg-black p-5 text-green-400 font-bold mt-6`,
})
export const Error: FC<Props> = ({
  title = 'Oooops !',
  message = 'Something went wrroonngg, sorry about that.',
  code,
}) => (
  <Frame>
    <Image src={doc} alt={`Loading`} />
    <Title>{title}</Title>
    <Text mt={5} mb={5}>
      {message}
      {code && <>{` `}Please contact me with the error code below.</>}
    </Text>
    <Link href={'/'} passHref>
      <Button primary>Go back home</Button>
    </Link>
    {code && <Code>{code}</Code>}
  </Frame>
)
