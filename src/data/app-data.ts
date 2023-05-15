import { IoLogoFacebook } from 'react-icons/io5';
import type { Author } from '../../@types/index';
import authorPicture from '../../public/assets/author.jpg';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export const author: Author = {
  name: 'Kain Nhantumbo',
  picture: authorPicture,
  description:
    "It's my pleasure to introduce you to the exciting world of travel destinations, tips and affiliate marketing, providing you the knowledge to help you reach your full potential and make your dreams of earning while traveling come true.",
};

export const complements = {
  defaultTitle: 'Rubymart',
  email: 'connectadevelops@gmail.com',
  websiteName: 'Rubymart - Sales Store of Mozambique',
  websiteUrl: 'https://rubymart.vercel.app/',
  copyrightSentence: '2023 Rubymart | Todos os Direitos Reservados.',
  description: `De moda a decoração de interiores, artigos artesanais, beleza e cosméticos, roupa, sapatos e mais, os produtos que vocêe irá amar estão apenas a um toque. Você poderá sempre contar conosco para encontrar os produtos perfeitos para avida que deseja.`,
  socialMedia: [
    {
      name: 'Encontre-nos no Facebook',
      url: 'https://www.fb.com/@travel_sketchpad',
      icon: IoLogoFacebook,
    },
    {
      name: 'Encontre-nos no Instagram',
      url: 'https://www.pinterest.com/travel_sketchpad',
      icon: FaInstagram,
    },
    {
      name: 'Encontre-nos no LinkedIn',
      url: 'https://www.pinterest.com/travel_sketchpad',
      icon: FaLinkedinIn,
    },
  ],
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
