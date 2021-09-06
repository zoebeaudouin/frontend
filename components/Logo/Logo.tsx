import {FC} from 'react'
import {Title} from '@components/ui'
import Link from 'next/link'

export const Logo: FC = () => (
  <Link href={'/'}>
    <a>
      <Title as="h1" mb={2}>
        Zoé Beaudouin
      </Title>
    </a>
  </Link>
)
