import {createStitches, CSS as StitchesCss} from '@stitches/react'
export type {VariantProps} from '@stitches/react'

export const stitches = createStitches({
  prefix: '',
  theme: {
    fonts: {
      urbanist: 'Urbanist',
      mono: 'Roboto Mono, menlo, monospace',
    },
  },
  utils: {},
  themeMap: undefined,
})

export type CSS = StitchesCss<typeof stitches>

export const {styled, getCssText, theme, globalCss} = stitches
