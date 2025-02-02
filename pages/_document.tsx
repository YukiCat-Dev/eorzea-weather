import { ServerStyleSheets } from '@material-ui/core/styles';
import CleanCSS from 'clean-css';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import type { DocumentContext, DocumentInitialProps } from 'next/document';
import React from 'react';
import Helmet from 'react-helmet';

const cleanCSS = new CleanCSS();

const createTrackingCode = (trackingID: string) =>
  [
    'window.dataLayer = window.dataLayer || [];',
    'function gtag(){dataLayer.push(arguments);}',
    "gtag('js',new Date());",
    `gtag('config','${trackingID}');`,
  ].join('\n');

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheets = new ServerStyleSheets();
    const initialProps = await super.getInitialProps({
      ...ctx,
      renderPage: () =>
        ctx.renderPage({
          enhanceApp: (App) =>
            function EnhancedApp(props) {
              return sheets.collect(<App {...props} />);
            },
        }),
    });
    const css = sheets.toString();

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style
            id="jss-server-side"
            key="jss-server-side"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: cleanCSS.minify(css).styles,
            }}
          />
        </>
      ),
    };
  }

  render(): JSX.Element {
    const helmet = Helmet.renderStatic();

    return (
      <Html {...helmet.htmlAttributes.toComponent()}>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="theme-color" content="#2196f3" />
          <link rel="manifest" href="/manifest.json" />
          <link
            href="https://fonts.googleapis.cnpmjs.org/css?family=Roboto:300,400,500,700&amp;display=swap"
            rel="stylesheet"
          />
          {process.env.NEXT_PUBLIC_GOOGLE_ADCENSE_CLIENT_ID && (
            <script
              async
              data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADCENSE_CLIENT_ID}
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            />
          )}
          {process.env.NEXT_PUBLIC_GA_TRACKING_ID && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
              />
              <script
                /* eslint-disable-next-line react/no-danger */
                dangerouslySetInnerHTML={{
                  __html: createTrackingCode(
                    process.env.NEXT_PUBLIC_GA_TRACKING_ID,
                  ),
                }}
              />
            </>
          )}
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
        </Head>
        <body {...helmet.bodyAttributes.toComponent()}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
