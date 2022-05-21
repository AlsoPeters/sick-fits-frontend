import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charset='utf-8' />
          <meta http-equiv='X-UA-Compatible' content='IE=11' />
          <meta http-equiv='Cache-Control' content='no-cache' />
          <meta
            http-equiv='Content-Security-Policy'
            content="default-src 'self'; style-src 'self';"
          />
        </Head>
        <body className=' h-max bg-tokyo-night_BLK'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
