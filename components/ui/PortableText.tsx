import {FC} from 'react'
import BlockContent from '@sanity/block-content-to-react'

const serializers = {
  types: {
    code: (props: any) => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    ),
  },
}

interface Props {
  content: string
}
export const PortableText: FC<Props> = ({content}) => (
  <BlockContent blocks={content} serializers={serializers} />
)
