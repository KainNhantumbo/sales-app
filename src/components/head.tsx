import { constants } from '@/data/constants';
import Head from 'next/head';
import type { HeadProps } from '../types';

export default function PageHead(props: HeadProps) {
  return (
    <Head>
      <meta name='apple-mobile-web-app-title' content={constants.defaultTitle} />
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
      <link rel='canonical' href={constants.websiteUrl} />
      <meta property='og:url' content={constants.websiteUrl} />
      <meta property='og:site_name' content={constants.websiteName} />
      <meta
        name='robots'
        content='follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large'
      />
      <meta property='og:description' content={constants.description} />
      <meta property='og:title' content={props?.title || constants.defaultTitle} />
      <meta property='og:created_time' content={props?.createdAt} />
      <meta property='og:updated_time' content={props?.updatedAt} />
      <meta property='article:published_time' content={props?.createdAt} />
      <meta property='article:modified_time' content={props?.updatedAt} />
      <meta name='author' content={constants.websiteName} />
      <meta name='tags' content={props?.tags || ''} />
      <meta name='description' content={constants.description} />
      <title>{props?.title || constants.defaultTitle}</title>
    </Head>
  );
}
