import {globalStyles} from 'twin.macro'
import {globalCss} from '../stitches.config'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const overrideGlobalStyles: any = globalStyles

const styles = globalCss(overrideGlobalStyles)

export default styles
