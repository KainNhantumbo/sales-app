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
  IoStorefront,
  IoPerson,
  IoPersonCircleOutline,
  IoPersonOutline,
  IoAdd,
  IoBagCheck,
  IoAnalytics,
  IoChatbox,
  IoChatboxEllipses,
} from 'react-icons/io5';
import type {
  Author,
  TDashboardActions,
  TShareUrlPaths,
  TShareUrls,
} from '../../@types/index';
import {
  FaFacebook,
  FaPinterest,
  FaWhatsapp,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaStoreAlt,
  FaDollarSign,
  FaAd,
  FaAdn,
} from 'react-icons/fa';
import Package from '../../package.json';
import blurImageData from './blur-data-url-image.json';
import { BiUser } from 'react-icons/bi';
import { State } from '../../@types/reducer';
import authorPicture from '../../public/assets/author.jpg';

export const blurDataUrlImage = blurImageData.data;

export const author: Author = {
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
        label: 'Editar Perfil',
        url: '/users/dashboard/profile-editor/',
        icon: IoPersonOutline,
      },
      {
        label: 'Visitar o Perfil',
        url: `/ecommerce/users/profile/${userId}`,
        icon: IoPersonCircleOutline,
      },
    ],
  },
  store: {
    header: { label: 'Loja', icon: IoStorefront },
    paths: [
      {
        label: 'Editor de Loja',
        url: '/users/dashboard/store-editor',
        icon: FaStoreAlt,
      },
      {
        label: 'Gerir Produtos',
        url: '/users/dashboard/products',
        icon: IoAlbums,
      },
      {
        label: 'Criar Produto',
        url: '/users/dashboard/product-editor',
        icon: IoAdd,
      },
      {
        label: 'Pedidos e Encomendas',
        url: '/users/dashboard/orders',
        icon: IoBagCheck,
      },
    ],
  },
  transaction: {
    header: { label: 'Transações', icon: FaDollarSign },
    paths: [
      {
        label: 'Transações de Clientes',
        url: '/users/dashboard/customer-transactions',
        icon: IoAnalytics,
      },
      {
        label: 'Pagamento de Planos e Subscrições',
        url: '/users/dashboard/transactions/subscription-payments',
        icon: IoCard,
      },
      {
        label: 'Pagamento de Anúncios',
        url: '/users/dashboard/transactions/ad-payments',
        icon: IoCard,
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
        url: '/users/dashboard/ads',
        icon: FaAdn,
      },
    ],
  },
  message: {
    header: { label: 'Mensagens', icon: IoChatbox },
    paths: [
      {
        label: 'Criar Mensagem',
        url: '/users/dashboard/create-message',
        icon: IoAdd,
      },
      {
        label: 'Gerir Mensagens',
        url: '/users/dashboard/messages',
        icon: IoChatboxEllipses,
      },
    ],
  },
});

export {
  dashboardActions,
  denounceReasons,
  complements,
  app_metadata,
  urls,
  store_features,
  pricing_data,
  shareUrlPaths,
};
