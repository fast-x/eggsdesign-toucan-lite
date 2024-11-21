import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { resetServerContext } from 'react-beautiful-dnd';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    resetServerContext();
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en" className="no-fouc">
        <Head>
          <style jsx>{`
            @import url('https://use.typekit.net/vvs7qox.css');
            .no-fouc {
              visibility: hidden;
              opacity: 0;
            }
            .fouc {
              visibility: visible;
              opacity: 1;
            }
          `}</style>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="stylesheet" href="https://use.typekit.net/vvs7qox.css" />
          <link rel="stylesheet" href="https://use.typekit.net/vvs7qox.css" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <meta name="theme-color" content="#b8e1dc" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
