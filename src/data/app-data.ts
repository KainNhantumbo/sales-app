import {
  IoAlbums,
  IoBriefcase,
  IoCard,
  IoCartOutline,
  IoChatbubbleEllipsesOutline,
  IoGrid,
  IoInfiniteOutline,
  IoLogoFacebook,
  IoMegaphoneOutline,
  IoRocketOutline,
  IoStorefront
} from 'react-icons/io5';
import Package from '../../package.json';
import { IoMdPerson } from 'react-icons/io';
import type { Author } from '../../@types/index';
import authorPicture from '../../public/assets/author.jpg';
import { FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import blurImageData from './blur-data-url-image.json';

export const blurDataUrlImage = blurImageData.data;

export const author: Author = {
  name: Package.author,
  picture: authorPicture,
  description:
    "It's my pleasure to introduce you to the exciting world of travel destinations, tips and affiliate marketing, providing you the knowledge to help you reach your full potential and make your dreams of earning while traveling come true."
};

export const complements = {
  defaultTitle: Package.name,
  email: Package.email,
  websiteName: Package.websiteName,
  websiteUrl: Package.url,
  copyrightSentence: Package.copyrightSentence,
  description: `De moda a decoração de interiores, artigos artesanais, beleza e cosméticos, roupa, sapatos e mais, os produtos que você irá amar estão apenas a um toque. Você poderá sempre contar conosco para encontrar os produtos perfeitos para a vida que deseja.`,
  socialMedia: [
    {
      name: 'Encontre-nos no Facebook',
      url: 'https://www.fb.com/@travel_sketchpad',
      icon: IoLogoFacebook
    },
    {
      name: 'Encontre-nos no Instagram',
      url: 'https://www.pinterest.com/travel_sketchpad',
      icon: FaInstagram
    },
    {
      name: 'Encontre-nos no LinkedIn',
      url: 'https://www.pinterest.com/travel_sketchpad',
      icon: FaLinkedinIn
    },
    {
      name: 'Encontre-nos no Twitter',
      url: 'https://www.twitter.com/travel_sketchpad',
      icon: FaTwitter
    }
  ]
};

export const app_metadata = {
  appName: Package.name,
  version: Package.version,
  notice: Package.notice,
  copyright: `© ${new Date().getFullYear()} ${Package.author}`
};

export const urls = [
  { name: 'Início', url: '/', alias: '+' },
  { name: 'Descobrir', url: '/ecommerce/discover', alias: 'discover' },
  { name: 'Lojas', url: '/stores', alias: 'stores' },
  { name: 'Blog', url: '/blog', alias: 'blog' },
  { name: 'Feed', url: '/feed', alias: 'feed' }
];

export const store_features = [
  {
    title: 'Integração com meios de pagamento',
    description:
      'Os melhores e mais confiáveis meios de pagamento já integrados na sua loja.',
    icon: IoCard
  },
  {
    title: 'Venda em diversos canais',
    description:
      'Integre a sua loja virtual com redes sociais, canais de marketplace ou dropshipping em poucos cliques.',
    icon: IoMegaphoneOutline
  },
  {
    title: 'Sem limite de produtos ou de visitas',
    description:
      'Adicione quantos produtos quiser e não tenha limite de vendas ou de visitas na sua loja virtual.',
    icon: IoInfiniteOutline
  },
  {
    title: 'Estratégias de marketing digital',
    description:
      'Aumente suas vendas com campanhas de performance via Google e redes sociais.',
    icon: IoRocketOutline
  },
  {
    title: 'Checkout transparente',
    description:
      'Ofereça a melhor Experiência no seu e-commerce e diminua sua taxa de abandono de carrinho.',
    icon: IoCartOutline
  },
  {
    title: 'Diferentes canais de suporte',
    description:
      'Conte com os diferentes canais de suporte que oferecemos e tenha sempre a ajuda que você precisa na hora certa.',
    icon: IoChatbubbleEllipsesOutline
  }
];

export const pricing_data = [
  {
    title: 'Gratuito (beta)',
    type: 'Começo',
    url: '/auth/sign-in',
    label: 'Criar loja grátis',
    description: [
      'Para quem vai começar a vender online',
      'Desfrute de todas as funcionalidades do programa beta',
      'Totalmente gratuito'
    ]
  }
];

export function dashboardRoutes() {
  return [
    {
      url: `/users/dashboard/profile-editor`,
      icon: IoMdPerson,
      label: 'Editor de Perfil'
    },
    {
      url: `/users/dashboard/store-editor`,
      icon: IoStorefront,
      label: 'Editor de Loja'
    },
    {
      url: `/users/dashboard/products`,
      icon: IoGrid,
      label: 'Produtos'
    },
    {
      url: `/users/dashboard/job-editor`,
      icon: IoBriefcase,
      label: 'Empregos'
    },
    {
      url: `/users/dashboard/post-editor`,
      icon: IoAlbums,
      label: 'Postagens'
    }
  ].sort((a, b) => (a.label > b.label ? 1 : -1));
}
