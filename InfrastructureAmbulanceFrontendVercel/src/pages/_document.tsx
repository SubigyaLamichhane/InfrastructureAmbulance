import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';
import Script from 'next/script';
import { GetMap } from '../utils/getMap';

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.css"
            type="text/css"
          />
        </Head>
        <Script
          onLoad={() => GetMap(85.32767705161245, 27.705308474955412)}
          type="text/javascript"
          src="https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.js"
        ></Script>

        <body className="mx-6 bg-white text-gray-700">
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
