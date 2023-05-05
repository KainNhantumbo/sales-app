import { IoLogoPinterest, IoLogoTiktok } from 'react-icons/io5';
import type { Author } from '../../@types/index';
import authorPicture from '../../public/assets/author.jpg';

export const author: Author = {
  name: 'Kain Nhantumbo',
  picture: authorPicture,
  description:
    "It's my pleasure to introduce you to the exciting world of travel destinations, tips and affiliate marketing, providing you the knowledge to help you reach your full potential and make your dreams of earning while traveling come true.",
};

export const complements = {
  defaultTitle: 'TravelSketchpad',
  email: 'connectadevelops@gmail.com',
  websiteName: 'TravelSketchpad Blog - Travel Content Blog',
  websiteUrl: 'https://travel-sketchpad.vercel.app/',
  description:
    'Discover useful advice, tips & case studies around travel affiliate programs and earning money on travel blogs and travel destinations',
};

export const urls: Array<{ name: string; url: string }> = [
  {
    name: 'All',
    url: '/',
  },
  {
    name: 'Brands',
    url: '/categories/brands',
  },
  {
    name: 'Destinations',
    url: '/categories/destinations',
  },
  {
    name: 'News',
    url: '/categories/news',
  },
  {
    name: 'Success Stories',
    url: '/categories/success-stories',
  },
  {
    name: 'Tips',
    url: '/categories/tips',
  },
];

export const footerProps = {
  blogName: 'TravelSketchpad',
  copyrightSentence: '2023 TravelSketchpad | All rights reserved.',
  socialMedia: [
    {
      name: 'Find Us on TikTok',
      url: 'https://www.tiktok.com/@travel_sketchpad',
      icon: IoLogoTiktok,
    },
    {
      name: 'Find Us on Pinterest',
      url: 'https://www.pinterest.com/travel_sketchpad',
      icon: IoLogoPinterest,
    },
  ],
};
