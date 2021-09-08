import {Text} from '@components/ui'
import {styled} from '@stitches/react'
import {FC} from 'react'
import tw from 'twin.macro'

type Attribute = {
  key: string
  value: string
}

interface Props {
  attributes: Attribute[]
}

const DetailStyled = styled(Text, {
  size: `sm`,
  ...tw`text-gray-600`,
})

const Attributes: FC<Props> = ({attributes}) => (
  <>
    {attributes.map((attribute) => (
      <DetailStyled key={attribute.key} as="span">
        {attribute.key} : {attribute.value}
      </DetailStyled>
    ))}
  </>
)
export default Attributes
