import {
  IoCard,
  IoCartOutline,
  IoChatbubbleEllipsesOutline,
  IoInfiniteOutline,
  IoLogoFacebook,
  IoMegaphoneOutline,
  IoPlanetOutline,
  IoRocketOutline,
  IoShareSocialOutline,
} from 'react-icons/io5';
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

export const store_features = [
  {
    title: 'Integração com meios de pagamento',
    description:
      'Os melhores e mais confiáveis meios de pagamento já integrados na sua loja.',
    icon: IoCard,
  },
  {
    title: 'Venda em diversos canais',
    description:
      'Integre a sua loja virtual com redes sociais, canais de marketplace ou dropshipping em poucos cliques.',
    icon: IoMegaphoneOutline,
  },
  {
    title: 'Sem limite de produtos ou de visitas',
    description:
      'Adicione quantos produtos quiser e não tenha limite de vendas ou de visitas na sua loja virtual.',
    icon: IoInfiniteOutline,
  },
  {
    title: 'Estratégias de marketing digital',
    description:
      'Aumente suas vendas com campanhas de performance via Google e redes sociais',
    icon: IoRocketOutline,
  },
  {
    title: 'Checkout transparente',
    description:
      'Ofereça a melhor Experiência no seu e-commerce e diminua sua taxa de abandono de carrinho.',
    icon: IoCartOutline,
  },
  {
    title: 'Diferentes canais de suporte',
    description:
      'Conte com os diferentes canais de suporte que oferecemos e tenha sempre a ajuda que você precisa na hora certa.',
    icon: IoChatbubbleEllipsesOutline,
  },
];

export const pricing_data = [
  {
    title: 'Gratuito',
    type: 'Começo',
    url: '/auth/sign-in',
    label: 'Criar loja grátis',
    description: [
      'Para quem vai começar a vender online',
      'Desfrute de todas as funcionalidades do programa beta',
      'Totalmente gratuito',
    ],
  },
];
