import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head />
        <body className="mx-6">
          <div className="max-w-6xl m-auto">
            <ColorModeScript />
            <Main />
            <NextScript />
          </div>
          {/* Make Color mode to persists when you refresh the page. */}
        </body>
      </Html>
    );
  }
}
