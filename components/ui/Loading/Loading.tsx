import {Frame, Title} from '@components/ui'
import Image from 'next/image'
import {FC} from 'react'
import bob from './bob.gif'

interface Props {
  children?: React.ReactNode
}

export const Loading: FC<Props> = ({children}) => (
  <Frame>
    <Image src={bob} alt={`Loading`} />
    <Title>Loading !</Title>
    {children && children}
  </Frame>
)
