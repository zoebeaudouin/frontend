import {Button} from '@components/ui'
import {FC} from 'react'

interface Props {
  id: string
  price: number
  url: string
  name: string
  description?: string
  imageUrl: string
}

export const AddToCart: FC<Props> = ({
  id,
  price,
  url,
  name,
  description,
  imageUrl,
  ...props
}) => (
  <Button
    primary
    className={`snipcart-add-item`}
    data-item-id={id}
    data-item-price={price}
    data-item-url={url}
    data-item-name={name}
    data-item-description={description}
    data-item-image={imageUrl}
    {...props}
  >
    Add to cart
  </Button>
)
