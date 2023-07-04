import Head from 'next/head';
import type { HeadProps } from '../../@types';
import { complements } from '@/data/app-data';

export default function Metadata(props: HeadProps): JSX.Element {
  return (
    <Head>
      <meta
        name='apple-mobile-web-app-title'
        content={complements.defaultTitle}
      />
      <meta
        name='viewport'
        content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
      />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <meta name='format-detection' content='telephone=no' />
      <meta name='mobile-web-app-capable' content='yes' />
      <link rel='icon' type='image/png' href='/rubymart256.png' />
      <meta name='msapplication-tap-highlight' content='no' />
      <link rel='shortcut icon' href='/rubymart192.png' />
      <meta name='msapplication-TileColor' content='#000000' />
      <meta property='og:locale' content='pt_BR' />
      <meta property='og:type' content='website' />
      <meta name='theme-color' content='#fff' />
      <meta httpEquiv='Content-Type' content='text/html; charset=UTF-8' />
      <link rel='canonical' href={complements.websiteUrl} />
      <meta property='og:url' content={complements.websiteUrl} />
      <meta property='og:site_name' content={complements.websiteName} />
      <meta
        name='robots'
        content='follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large'
      />
      <meta property='og:description' content={complements.description} />
      <meta
        property='og:title'
        content={props?.title || complements.defaultTitle}
      />
      <meta property='og:created_time' content={props?.createdAt} />
      <meta property='og:updated_time' content={props?.updatedAt} />
      <meta property='article:published_time' content={props?.createdAt} />
      <meta property='article:modified_time' content={props?.updatedAt} />
      <meta name='author' content={complements.websiteName} />
      <meta name='tags' content={props?.tags || ''} />
      <meta name='description' content={complements.description} />
      <title>{props?.title || complements.defaultTitle}</title>
    </Head>
  );
}
