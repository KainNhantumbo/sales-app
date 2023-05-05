import Head from 'next/head';
import type { HeadProps } from '../../@types';
import { complements } from '@/data/app-data';

export default function Metadata(props: HeadProps): JSX.Element {
  return (
    <Head>
      <link rel='icon' type='image/png' href='/favicon.png' />
      <link rel='shortcut icon' href='/public/favicon.png' />
      <meta name='msapplication-TileColor' content='#000000' />
      <meta property='og:locale' content='en_US' />
      <meta property='og:type' content='website' />
      <meta name='theme-color' content='#fff' />
      <meta httpEquiv='Content-Type' content='text/html; charset=UTF-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta property='og:url' content={complements.websiteUrl} />
      <meta property='og:site_name' content={complements.websiteName} />
      <link rel='canonical' href={complements.websiteUrl} />
      <meta
        name='robots'
        content='follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large'
      />
      <meta
        property='og:description'
        content='Here on the TravelSketchpad blog, you will find reviews of the best travel affiliate programs, online moneymaking tips, destinations, case studies, and more content that is useful to content creators seeking to earn money.'
      />
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
