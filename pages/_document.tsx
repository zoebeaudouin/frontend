import React, {ReactElement} from 'react'
import NextDocument, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'
import {getCssText} from '../stitches.config'

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    try {
      const initialProps = await NextDocument.getInitialProps(ctx)

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            <style
              id="stitches"
              dangerouslySetInnerHTML={{__html: getCssText()}}
            />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="true"
            />
            <link
              href={`https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600&family=Roboto+Mono:wght@100;400&display=swap`}
              rel="stylesheet"
            />
          </>
        ),
      }
    } finally {
    }
  }

  render(): ReactElement {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
