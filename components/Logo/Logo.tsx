import {FC} from 'react'
import {Title} from '@components/ui'
import Link from 'next/link'

interface Props {
  as: string
}

export const Logo: FC<Props> = ({as}) => (
  <Link href={'/'}>
    <a>
      <Title mb={2} as={as}>
        Zoé Beaudouin
      </Title>
    </a>
  </Link>
)
