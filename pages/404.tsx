import {Error} from '@components/ui'

export default function Custom404() {
  return (
    <Error
      title={'404'}
      message={`Sorry, this page doesn't exist anymoooooore.`}
    />
  )
}
