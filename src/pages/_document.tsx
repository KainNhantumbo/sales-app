import { Html, Head, Main, NextScript } from 'next/document';

const Document = (): JSX.Element => {
  return (
    <Html lang='en-US'>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin=''
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Grand+Hotel:ital,wght@0,400;0,500;0,600;1,400;1,500;&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,500;1,400;1,500&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500&display=swap'
          rel='stylesheet'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
