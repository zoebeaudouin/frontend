import {Button} from '@components/ui'
import {FC} from 'react'

interface Props {
  id: string
  price: number
  url: string
  name: string
}

export const AddToCart: FC<Props> = ({id, price, url, name, ...props}) => (
  <Button
    primary
    className={`snipcart-add-item`}
    data-item-id={id}
    data-item-price={price}
    data-item-url={url}
    data-item-name={name}
    {...props}
  >
    Add to cart
  </Button>
)
