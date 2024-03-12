import Package from '@/../package.json';
import authorPicture from '@/../public/assets/author.jpg';
import mpesa_logo from '@/../public/trademarks/mpesa logo.png';
import { BiUser } from 'react-icons/bi';
import {
  BsBox2,
  BsBox2Heart,
  BsCreditCard2Front,
  BsPersonGear,
  BsPersonVideo3
} from 'react-icons/bs';
import {
  FaAd,
  FaDollarSign,
  FaFacebook,
  FaInstagram,
  FaLink,
  FaLinkedinIn,
  FaPinterest,
  FaTwitter,
  FaWhatsapp
} from 'react-icons/fa';
import {
  IoAdd,
  IoBagCheck,
  IoCard,
  IoCardOutline,
  IoCartOutline,
  IoChatbubbleEllipsesOutline,
  IoCog,
  IoFlash,
  IoInfiniteOutline,
  IoLogoFacebook,
  IoMail,
  IoMegaphoneOutline,
  IoRocketOutline,
  IoStorefront,
  IoStorefrontOutline
} from 'react-icons/io5';
import type {
  Author,
  DashboardAction,
  Pricing,
  ShareAnchors,
  TPaymentOptions,
  ShareUrls,
  TSocialNetwork
} from '../types';
import blurImage from './blur-data-url-image.json';
import denounces_data from './denounce-reasons.json';

export const blurDataUrlImage = blurImage.data;

export const author: Author = {
  name: Package.author.name,
  picture: authorPicture,
  description:
    'É um prazer te apresentar ao excitante mundo dos negócios, transmitindo conhecimentos que ajudarão a alcançar todo o seu potencial em sua jornada, fazendo de cada passo dado, uma experiência inovadora. Vamos trilhar este caminho juntos?'
};

export const constants = {
  defaultTitle: Package.name,
  email: Package.email,
  companyName: Package.companyName,
  websiteName: Package.websiteName,
  websiteUrl: Package.url,
  disqusName: Package.disqusName,
  copyrightSentence: Package.copyrightSentence,
  description: `De moda a decoração de interiores, artigos artesanais, beleza e cosméticos, roupa, sapatos e mais, os produtos que você irá amar estão apenas a um toque. Você poderá sempre contar conosco para encontrar os produtos perfeitos para a satisfazer as suas necessidades.`,
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
  copyright: `© ${new Date().getFullYear()} ${Package.author.name}`
};

export const DEFAULT_ERROR_MESSAGE = 'Oops! Algo deu errado. Tente novamente.';

export const urls = [
  { name: 'Início', url: '/', alias: '+' },
  { name: 'Descobrir', url: '/ecommerce/discover', alias: 'discover' },
  { name: 'Preçário', url: '/docs/pricing', alias: 'pricing' },
  { name: 'Lojas', url: '/ecommerce/stores', alias: 'stores' },
  { name: 'Feed', url: '/feed', alias: 'feed' },
  { name: 'Blog', url: '/blog', alias: 'blog' }
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

export const pricing_data: Pricing = [
  {
    title: 'Gratuito (beta)',
    type: 'Trial',
    url: '/auth/sign-in',
    label: 'Vamos começar!',
    amount: 0.0,
    description: [
      'Limitado',
      'Faça parte da comunidade',
      'Para quem vai começar a vender online',
      'Desfrute das funcionalidades do programa beta',
      'Teste a plataforma por 15 dias',
      'Não renovável'
    ]
  },
  {
    title: 'Padrão',
    type: 'Standard',
    url: '/auth/sign-in',
    label: 'Vamos trabalhar!',
    amount: 94.99,
    description: [
      'Suporte em tempo real',
      'Acesso a criação de anúncios',
      'Quantidade ilimitada de produtos, vendas e visitas',
      'Ferramentas para auxiliar o seu negócio',
      'Ajude no crescimento da plataforma',
      'Renovável a cada 30 dias'
    ]
  },
  {
    title: 'Profissional',
    type: 'Pro',
    url: '/auth/sign-in',
    label: 'Vamos conquistar!',
    amount: 119.99,
    description: [
      'Todas as funcionalidades do plano padrão',
      'Mais destaque e relevância em seus produtos',
      'Acesse a Secção de Biscatos e Empregos',
      'Ajude no crescimento da plataforma',
      'Renovável a cada 30 dias'
    ]
  }
];

export const denounceReasons = denounces_data
  .sort((a, b) => (a > b ? 1 : -1))
  .map((reason) => ({ label: reason, value: reason }));

export const shareUrlPaths = (props: ShareAnchors): ShareUrls[] => {
  return [
    {
      name: 'Compartilhe no LinkedIn',
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${props.hostname}/blog/post/${props.slug}&title=${props.title}&summary=${props.excerpt}`,
      icon: FaLinkedinIn
    },
    {
      name: 'Compartilhe no WhatsApp',
      url: `https://api.whatsapp.com/send?text=${props.title}&url=${props.hostname}/blog/post/${props.slug}`,
      icon: FaWhatsapp
    },
    {
      name: 'Compartilhe no Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${props.hostname}/blog/post/${props.slug}`,
      icon: FaFacebook
    },
    {
      name: 'Compartilhe por E-mail',
      url: `mailto:?subject=${props.title}&body=${props.hostname}/blog/post/${props.slug}`,
      icon: IoMail
    },
    {
      name: 'Compartilhe no Twitter',
      url: `https://twitter.com/intent/tweet/customer-orders?text=${props.hostname}/blog/post/${props.slug}`,
      icon: FaTwitter
    },
    {
      name: 'Compartilhe no Pinterest',
      url: `https://pinterest.com/pin/create/button/?url=${props.hostname}/blog/post/${props.slug}&media=${props.hostname}/blog/post/${props.slug}&description=${props.excerpt}`,
      icon: FaPinterest
    }
  ].sort((a, b) => (a.name > b.name ? 1 : -1));
};

export const dashboardActions = (props: { userId: string; storeId: string }) => {
  return {
    user: {
      header: { label: 'Conta', icon: BiUser },
      paths: [
        {
          label: 'Configurações da Conta',
          url: '/dashboard/profile-editor',
          icon: BsPersonGear
        },
        {
          label: 'Visualizar Perfil',
          url: `/community/profile/${props.userId}`,
          icon: BsPersonVideo3
        },
        {
          label: 'Minhas Encomendas',
          url: `/dashboard/my-orders`,
          icon: BsBox2
        },
        {
          label: 'Produtos Favoritos',
          url: `/dashboard/favorite-products?id=${props.userId}`,
          icon: BsBox2Heart
        }
      ]
    },
    store: {
      header: { label: 'Loja', icon: IoStorefront },
      paths: [
        {
          label: 'Visualizar Loja',
          url: `/community/store/${props.storeId}`,
          icon: IoStorefrontOutline
        },
        {
          label: 'Configurações da Loja',
          url: '/dashboard/store-editor',
          icon: IoCog
        },
        {
          label: 'Gerir Produtos',
          url: '/dashboard/products',
          icon: IoCog
        },
        {
          label: 'Adicionar Produto',
          url: '/dashboard/product-editor',
          icon: IoAdd
        },
        {
          label: 'Vendas de Produtos',
          url: '/dashboard/store/customer-orders',
          icon: IoBagCheck
        }
      ]
    },
    transaction: {
      header: { label: 'Transações', icon: FaDollarSign },
      paths: [
        {
          label: 'Pagamento de Planos e Subscrições',
          url: '/dashboard/transactions/subscription-payments',
          icon: BsCreditCard2Front
        },
        {
          label: 'Pagamento de Anúncios',
          url: '/dashboard/transactions/ad-payments',
          icon: IoCardOutline
        }
      ]
    },
    ad: {
      header: { label: 'Anúncios', icon: FaAd },
      paths: [
        {
          label: 'Criar Anúncio',
          url: '/dashboard/create-ad',
          icon: IoAdd
        },
        {
          label: 'Gerir Anúncios',
          url: '/dashboard/ads/generics',
          icon: IoCog
        },
        {
          label: 'Destacar Produtos da Loja',
          url: '/dashboard/ads/products',
          icon: IoFlash
        }
      ]
    }
  } as DashboardAction;
};

export const states: Array<{ value: string; label: string }> = [
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
  'Zambezia'
]
  .sort((a, b) => (a > b ? 1 : -1))
  .map((state) => ({ value: state, label: state }));

export const payment_options: TPaymentOptions = [
  { type: 'm-pesa', label: 'M-Pesa', image: mpesa_logo }
];

export const formatSocialNetwork = <T = TSocialNetwork>(data: T) => {
  if (!data) return undefined;

  return Object.entries(data)
    .map(([key, value]) => {
      switch (key) {
        case 'facebook':
          return { name: 'Facebook', url: value, icon: IoLogoFacebook };
        case 'instagram':
          return { name: 'Instagram', url: value, icon: FaInstagram };
        case 'website':
          return { name: 'Website', url: value, icon: FaLink };
        case 'linkedin':
          return { name: 'LinkedIn', url: value, icon: FaLinkedinIn };
        case 'whatsapp':
          return { name: 'Whatsapp', url: value, icon: FaWhatsapp };
        default:
          return undefined;
      }
    })
    .sort((a, b) => {
      if (!a || !b) return 1;
      if (a.name > b.name) return 1;
      return -1;
    });
};

export const order_status_labels: Array<{ label: string; value: string }> = [
  { label: 'Entregue', value: 'delivered' },
  { label: 'Retornado', value: 'returned' },
  { label: 'Em progresso', value: 'progress' },
  { label: 'Cancelado', value: 'cancelled' },
  { label: 'Aguardando Pagamento', value: 'pending' }
];

export const orderSortOptions = [
  { value: 'createdAt', label: 'Data de Criação (Invertido)' },
  { value: '-createdAt', label: 'Data de Criação' },
  { value: 'updatedAt', label: 'Data de Atualização (Invertido)' },
  { value: '-updatedAt', label: 'Data de Atualização' },
  { value: '-invalidated', label: 'Revisão' },
  { value: 'invalidated', label: 'Revisão (Invertido)' }
].sort((a, b) => (a.label > b.label ? 1 : -1));

export const orderStatusOptions = order_status_labels.sort((a, b) =>
  a.label > b.label ? 1 : -1
);
