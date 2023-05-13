import { IoLogoFacebook, IoLogoPinterest } from 'react-icons/io5';
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
    name: 'Início',
    url: '/',
  },
  {
    name: 'Blog',
    url: '/categories/brands',
  },
  {
    name: 'Lojas',
    url: '/users/stores',
  },
  {
    name: 'Feed',
    url: '/users/feed',
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
      name: 'Encontre-nos no Facebook',
      url: 'https://www.fb.com/@travel_sketchpad',
      icon: IoLogoFacebook,
    },
    {
      name: 'Find Us on Pinterest',
      url: 'https://www.pinterest.com/travel_sketchpad',
      icon: IoLogoPinterest,
    },
  ],
};
