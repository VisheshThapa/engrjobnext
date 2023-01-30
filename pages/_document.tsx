import { createGetInitialProps } from '@mantine/next';
import Document, { Head, Html, Main, NextScript } from 'next/document';

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head />
        <title>Otter Inventor - EIT, Engineering Intern and Graduate Jobs</title>
        <meta name="description" content="Otter Inventor - EIT, Engineering Internships and Graduate Jobs"/>

        <meta property="og:title" content ="Otter Inventor"/>
        <meta property="og:url" content ="https://www.otterinventor.com/"/>
        <meta name="og:description" content="Otter Inventor - EIT, Engineering Intern and Graduate Jobs"/>
        <link rel="shortcut icon" href="/logo_icon.ico" />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}