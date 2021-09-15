import {FC} from 'react'
import {Title} from '@components/ui'
import Link from 'next/link'

interface Props {
  as: string
}

export const Logo: FC<Props> = ({as, ...props}) => (
  <Link href={'/'}>
    <a>
      <Title mb={2} as={as} {...props}>
        Zoé Beaudouin
      </Title>
    </a>
  </Link>
)
