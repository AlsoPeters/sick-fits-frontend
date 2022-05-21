import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head></Head>
        <body className=' h-max bg-tokyo-night_BLK'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
