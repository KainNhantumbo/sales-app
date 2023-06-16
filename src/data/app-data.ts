import {
  IoCard,
  IoCartOutline,
  IoChatbubbleEllipsesOutline,
  IoInfiniteOutline,
  IoLogoFacebook,
  IoMegaphoneOutline,
  IoRocketOutline,
  IoStorefront,
  IoAdd,
  IoBagCheck,
  IoAnalytics,
  IoChatboxEllipses,
  IoCog,
  IoEye,
  IoFingerPrint,
  IoAlbumsOutline,
  IoCardOutline,
  IoBasket,
  IoDocument,
  IoCash,
} from 'react-icons/io5';
import {
  FaFacebook,
  FaPinterest,
  FaWhatsapp,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaDollarSign,
  FaAd,
  FaPaypal,
} from 'react-icons/fa';
import type {
  Author,
  TDashboardActions,
  TPaymentOptions,
  TShareUrlPaths,
  TShareUrls,
} from '../../@types/index';
import Package from '../../package.json';
import blurImageData from './blur-data-url-image.json';
import { BiUser, BiUserCheck } from 'react-icons/bi';
import authorPicture from '../../public/assets/author.jpg';
import { IconType } from 'react-icons';
import { StaticImageData } from 'next/image';

const blurDataUrlImage = blurImageData.data;

const author: Author = {
  name: Package.author,
  picture: authorPicture,
  description:
    "It's my pleasure to introduce you to the exciting world of travel destinations, tips and affiliate marketing, providing you the knowledge to help you reach your full potential and make your dreams of earning while traveling come true.",
};

const complements = {
  defaultTitle: Package.name,
  email: Package.email,
  companyName: Package.companyName,
  websiteName: Package.websiteName,
  websiteUrl: Package.url,
  copyrightSentence: Package.copyrightSentence,
  description: `De moda a decoração de interiores, artigos artesanais, beleza e cosméticos, roupa, sapatos e mais, os produtos que você irá amar estão apenas a um toque. Você poderá sempre contar conosco para encontrar os produtos perfeitos para a vida que deseja.`,
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
    {
      name: 'Encontre-nos no Twitter',
      url: 'https://www.twitter.com/travel_sketchpad',
      icon: FaTwitter,
    },
  ],
};

const app_metadata = {
  appName: Package.name,
  version: Package.version,
  notice: Package.notice,
  copyright: `© ${new Date().getFullYear()} ${Package.author}`,
};

const urls = [
  { name: 'Início', url: '/', alias: '+' },
  { name: 'Descobrir', url: '/ecommerce/discover', alias: 'discover' },
  { name: 'Lojas', url: '/stores', alias: 'stores' },
  { name: 'Blog', url: '/blog', alias: 'blog' },
  { name: 'Feed', url: '/feed', alias: 'feed' },
];

const store_features = [
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
      'Aumente suas vendas com campanhas de performance via Google e redes sociais.',
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

const pricing_data = [
  {
    title: 'Gratuito (beta)',
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

const denounceReasons = [
  'Terrorismo',
  'Discurso de incentivo ao ódio',
  'Actividade sexual',
  'Nudez',
  'Spam',
  'Violência',
  'Vendas suspeitas ou não autorizadas',
  'Disseminação de informações falsas',
  'Assédio sexual',
  'Suicídio ou automutilação',
  'Bullyng',
  'Agressão a pessoas ou animais',
  'Abuso de menores',
  'Promoção ao uso de drogas',
  'Imagens íntimas não concensuais',
  'Infrigimento de direitos autorais',
  'Fraude',
  'Ridicularização de vítimas',
  'Linguagem pejorativa / insultuosa',
  'Propagandas ilegais',
  'Difamação',
  'Outros',
]
  .sort((a, b) => (a > b ? 1 : -1))
  .map((reason) => ({ label: reason, value: reason }));

const shareUrlPaths = (props: TShareUrlPaths): TShareUrls[] => [
  {
    name: 'Compartilhe no LinkedIn',
    url: `https://www.linkedin.com/shareArticle?mini=true&url=${props.hostname}/blog/post/${props.slug}&title=${props.title}&summary=${props.excerpt}`,
    icon: FaLinkedinIn,
  },
  {
    name: 'Compartilhe no WhatsApp',
    url: `https://api.whatsapp.com/send?text=${props.title}&url=${props.hostname}/blog/post/${props.slug}`,
    icon: FaWhatsapp,
  },
  {
    name: 'Compartilhe no Facebook',
    url: `https://www.facebook.com/sharer/sharer.php?u=${props.hostname}/blog/post/${props.slug}`,
    icon: FaFacebook,
  },
  {
    name: 'Compartilhe no Twitter',
    url: `https://twitter.com/intent/tweet?text=${props.hostname}/blog/post/${props.slug}`,
    icon: FaTwitter,
  },
  {
    name: 'Compartilhe no Pinterest',
    url: `https://pinterest.com/pin/create/button/?url=${props.hostname}/blog/post/${props.slug}&media=${props.hostname}/blog/post/${props.slug}&description=${props.excerpt}`,
    icon: FaPinterest,
  },
];

const dashboardActions = (userId: string): TDashboardActions => ({
  user: {
    header: { label: 'Conta', icon: BiUser },
    paths: [
      {
        label: 'Configurações da conta',
        url: '/users/dashboard/profile-editor/',
        icon: IoCog,
      },
      {
        label: 'Visualizar perfil',
        url: `/ecommerce/users/profile/${userId}`,
        icon: IoEye,
      },
      {
        label: 'Minhas compras',
        url: `/users/dashboard/profile/shopping`,
        icon: IoBasket,
      },
      {
        label: 'Produtos favoritos',
        url: `/users/dashboard/profile/favorite-products`,
        icon: IoBasket,
      },
    ],
  },
  store: {
    header: { label: 'Loja', icon: IoStorefront },
    paths: [
      {
        label: 'Configurações da loja',
        url: '/users/dashboard/store-editor',
        icon: IoCog,
      },
      {
        label: 'Gerir produtos',
        url: '/users/dashboard/products',
        icon: IoCog,
      },
      {
        label: 'Adicionar produto',
        url: '/users/dashboard/product-editor/new',
        icon: IoAdd,
      },
      {
        label: 'Vendas de produtos',
        url: '/users/dashboard/store/orders',
        icon: IoBagCheck,
      },
      {
        label: 'Verificação da loja',
        url: `/users/dashboard/store/verification`,
        icon: IoFingerPrint,
      },
    ],
  },
  transaction: {
    header: { label: 'Transações', icon: FaDollarSign },
    paths: [
      {
        label: 'Transações de clientes',
        url: '/users/dashboard/customer-transactions',
        icon: IoAnalytics,
      },
      {
        label: 'Pagamento de planos e subscrições',
        url: '/users/dashboard/transactions/subscription-payments',
        icon: IoCard,
      },
      {
        label: 'Pagamento de anúncios',
        url: '/users/dashboard/transactions/ad-payments',
        icon: IoCardOutline,
      },
    ],
  },
  ad: {
    header: { label: 'Anúncios', icon: FaAd },
    paths: [
      {
        label: 'Criar anúncio',
        url: '/users/dashboard/create-ad',
        icon: IoAdd,
      },
      {
        label: 'Gerir anúncios',
        url: '/users/dashboard/ads/generics',
        icon: IoCog,
      },
      {
        label: 'Destacar produtos',
        url: '/users/dashboard/ads/products',
        icon: IoAlbumsOutline,
      },
    ],
  },
  message: {
    header: { label: 'Mensagens', icon: IoChatboxEllipses },
    paths: [
      {
        label: 'Criar mensagem',
        url: '/users/dashboard/create-message',
        icon: IoAdd,
      },
      {
        label: 'Gerir mensagens',
        url: '/users/dashboard/messages',
        icon: IoCog,
      },
    ],
  },
  documentation: {
    header: { label: 'Documentação', icon: IoDocument },
    paths: [
      {
        label: 'Código de conduta',
        url: '/legal/code-of-conduct',
        icon: BiUserCheck,
      },
    ],
  },
});

const states: Array<{ value: string; label: string }> = [
  'Cabo Delgado',
  'Gaza',
  'Inhambane',
  'Manica',
  'Maputo',
  'Cidade de Maputo',
  'Nampula',
  'Niassa',
  'Sofala',
  'Tete',
  'Zambezia',
]
  .sort((a, b) => (a > b ? 1 : -1))
  .map((state) => ({ value: state, label: state }));

import emola_logo from '../../public/trademarks/emola logo.png';
import mpesa_logo from '../../public/trademarks/mpesa logo.png';
import ponto24_logo from '../../public/trademarks/ponto-24-logo.png';

const payment_options: TPaymentOptions = [
  { type: 'm-pesa', label: 'M-Pesa', image: mpesa_logo },
  { type: 'e-mola', label: 'E-Mola', image: emola_logo },
  { type: 'ponto-24', label: 'Conta Móvel', image: ponto24_logo },
  { type: 'credit-card', label: 'Cartão de Crédito', icon: IoCard },
  { type: 'paypal', label: 'Paypal', icon: FaPaypal },
];

export {
  dashboardActions,
  denounceReasons,
  complements,
  app_metadata,
  urls,
  store_features,
  pricing_data,
  author,
  blurDataUrlImage,
  shareUrlPaths,
  states,
  payment_options,
};
