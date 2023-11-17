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
  IoCog,
  IoFingerPrint,
  IoCardOutline,
  IoDocument,
  IoMail,
  IoStorefrontOutline,
  IoFlash,
  IoInformationCircleOutline
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
  FaLink
} from 'react-icons/fa';
import type {
  Author,
  DashboardAction,
  TPaymentOptions,
  Pricing,
  ShareAnchors,
  TShareUrls,
  TSocialNetwork
} from '../types';
import {
  BsBox2,
  BsBox2Heart,
  BsCreditCard2Front,
  BsCurrencyExchange,
  BsPersonGear,
  BsPersonVideo3
} from 'react-icons/bs';
import { BiUser, BiUserCheck } from 'react-icons/bi';
import Package from '@/../package.json';
import denouces_data from './denounce-reasons.json';
import blurImage from './blur-data-url-image.json';
import authorPicture from '@/../public/assets/author.jpg';
import mpesa_logo from '@/../public/trademarks/mpesa logo.png';

const blurDataUrlImage = blurImage.data;

const author: Author = {
  name: Package.author,
  picture: authorPicture,
  description:
    'É um prazer te apresentar ao excitante mundo dos negócios, transmitindo conhecimentos que ajudarão a alcançar todo o seu potencial em sua jornada, fazendo de cada passo dado, uma experiência inovadora. Vamos trilhar este caminho juntos?'
};

const complements = {
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

const app_metadata = {
  appName: Package.name,
  version: Package.version,
  notice: Package.notice,
  copyright: `© ${new Date().getFullYear()} ${Package.author}`
};

const urls = [
  { name: 'Início', url: '/', alias: '+' },
  { name: 'Descobrir', url: '/ecommerce/discover', alias: 'discover' },
  { name: 'Preçário', url: '/docs/pricing', alias: 'princing' },
  { name: 'Lojas', url: '/ecommerce/stores', alias: 'stores' },
  { name: 'Feed', url: '/feed', alias: 'feed' },
  { name: 'Blog', url: '/blog', alias: 'blog' }
];

const store_features = [
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

const pricing_data: Pricing = [
  {
    title: 'Gratuito (beta)',
    type: 'Trial',
    url: '/auth/sign-in',
    label: 'Vamos começar!',
    amount: 0.0,
    description: [
      'Limitado',
      'Faça parte da communidade',
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

const denounceReasons = denouces_data
  .sort((a, b) => (a > b ? 1 : -1))
  .map((reason) => ({ label: reason, value: reason }));

const shareUrlPaths = (props: ShareAnchors): TShareUrls[] => {
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
      url: `https://twitter.com/intent/tweet?text=${props.hostname}/blog/post/${props.slug}`,
      icon: FaTwitter
    },
    {
      name: 'Compartilhe no Pinterest',
      url: `https://pinterest.com/pin/create/button/?url=${props.hostname}/blog/post/${props.slug}&media=${props.hostname}/blog/post/${props.slug}&description=${props.excerpt}`,
      icon: FaPinterest
    }
  ].sort((a, b) => (a.name > b.name ? 1 : -1));
};

const dashboardActions = (props: { userId: string; storeId: string }) => {
  return {
    user: {
      header: { label: 'Conta', icon: BiUser },
      paths: [
        {
          label: 'Configurações da conta',
          url: '/dashboard/profile-editor',
          icon: BsPersonGear
        },
        {
          label: 'Visualizar perfil',
          url: `/community/profile/${props.userId}`,
          icon: BsPersonVideo3
        },
        {
          label: 'Minhas Encomendas',
          url: `/dashboard/my-orders`,
          icon: BsBox2
        },
        {
          label: 'Produtos favoritos',
          url: `/dashboard/favorite-products?id=${props.userId}`,
          icon: BsBox2Heart
        }
      ]
    },
    store: {
      header: { label: 'Loja', icon: IoStorefront },
      paths: [
        {
          label: 'Visualizar loja',
          url: `/community/store/${props.storeId}`,
          icon: IoStorefrontOutline
        },
        {
          label: 'Configurações da loja',
          url: '/dashboard/store-editor',
          icon: IoCog
        },
        {
          label: 'Gerir produtos',
          url: '/dashboard/products',
          icon: IoCog
        },
        {
          label: 'Adicionar produto',
          url: '/dashboard/product-editor',
          icon: IoAdd
        },
        {
          label: 'Vendas de produtos',
          url: '/dashboard/store/customer-orders',
          icon: IoBagCheck
        }
      ]
    },
    transaction: {
      header: { label: 'Transações', icon: FaDollarSign },
      paths: [
        {
          label: 'Minhas Transações',
          url: '/dashboard/my-transactions',
          icon: IoAnalytics
        },
        {
          label: 'Transações de clientes',
          url: '/dashboard/customer-transactions',
          icon: IoAnalytics
        },
        {
          label: 'Pagamento de planos e subscrições',
          url: '/dashboard/transactions/subscription-payments',
          icon: BsCreditCard2Front
        },
        {
          label: 'Pagamento de anúncios',
          url: '/dashboard/transactions/ad-payments',
          icon: IoCardOutline
        }
      ]
    },
    ad: {
      header: { label: 'Anúncios', icon: FaAd },
      paths: [
        {
          label: 'Criar anúncio',
          url: '/dashboard/create-ad',
          icon: IoAdd
        },
        {
          label: 'Gerir anúncios',
          url: '/dashboard/ads/generics',
          icon: IoCog
        },
        {
          label: 'Destacar produtos da loja',
          url: '/dashboard/ads/products',
          icon: IoFlash
        }
      ]
    },
    documentation: {
      header: { label: 'Documentação', icon: IoDocument },
      paths: [
        {
          label: 'Código de conduta',
          url: '/legal/code-of-conduct',
          icon: BiUserCheck
        },
        {
          label: 'Verificação da loja',
          url: `/docs/store-verification`,
          icon: IoFingerPrint
        },
        {
          label: 'Perguntas Frequêntes',
          url: `/docs/faq`,
          icon: IoInformationCircleOutline
        },
        {
          label: 'Preçário',
          url: `/docs/pricing`,
          icon: BsCurrencyExchange
        }
      ]
    }
  } as DashboardAction;
};

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
  'Zambezia'
]
  .sort((a, b) => (a > b ? 1 : -1))
  .map((state) => ({ value: state, label: state }));

const payment_options: TPaymentOptions = [
  { type: 'm-pesa', label: 'M-Pesa', image: mpesa_logo }
];

const formatSocialNetwork = <T = TSocialNetwork>(data: T) => {
  if (data === null || data === undefined) return undefined;

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

const order_status_labels: Array<{ label: string; value: string }> = [
  { label: 'Submetido', value: 'aknowledged' },
  { label: 'Entregue', value: 'delivered' },
  { label: 'Retornado', value: 'returned' },
  { label: 'Em progresso', value: 'progress' },
  { label: 'Cancelado', value: 'cancelled' },
  { label: 'Aguardando Pagamento', value: 'pending-payment' }
];

const orderSortOptions = [
  { value: 'createdAt', label: 'Data de Criação (Invertido)' },
  { value: '-createdAt', label: 'Data de Criação' },
  { value: 'updatedAt', label: 'Data de Atualização (Invertido)' },
  { value: '-updatedAt', label: 'Data de Atualização' },
  { value: '-invalidated', label: 'Revisão' },
  { value: 'invalidated', label: 'Revisão (Invertido)' }
].sort((a, b) => (a.label > b.label ? 1 : -1));

const orderStatusOptions = order_status_labels.sort((a, b) =>
  a.label > b.label ? 1 : -1
);

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
  formatSocialNetwork,
  orderSortOptions,
  orderStatusOptions,
  order_status_labels
};