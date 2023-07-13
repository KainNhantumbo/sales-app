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
  IoCardOutline,
  IoBasket,
  IoDocument,
  IoMail,
  IoStorefrontOutline,
  IoFlash,
  IoInformationCircleOutline,
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
  FaLink,
} from 'react-icons/fa';
import type {
  Author,
  TDashboardActions,
  TPaymentOptions,
  TShareUrlPaths,
  TShareUrls,
  TSocialNetwork,
} from '../../@types/index';
import { BiUser, BiUserCheck } from 'react-icons/bi';
import Package from '../../package.json';
import denouces_data from './denounce-reasons.json';
import blur_image_data from './blur-data-url-image.json';
import authorPicture from '../../public/assets/author.jpg';
import paypal_log from '../../public/trademarks/paypal.png';
import mpesa_logo from '../../public/trademarks/mpesa logo.png';
import { BsCurrencyExchange } from 'react-icons/bs';

const blurDataUrlImage = blur_image_data.data;

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
  disqusName: Package.disqusName,
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
  { name: 'Preçário', url: '/docs/pricing', alias: 'princing' },
  { name: 'Lojas', url: '/ecommerce/stores', alias: 'stores' },
  { name: 'Feed', url: '/feed', alias: 'feed' },
  { name: 'Blog', url: '/blog', alias: 'blog' },
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

type TPricingData = Array<{
  title: string;
  amount: number;
  url: string;
  label: string;
  type: string;
  description: string[];
}>;

const pricing_data: TPricingData = [
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
      'Não renovável',
    ],
  },
  {
    title: 'Padrão',
    type: 'Standard',
    url: '/auth/sign-in',
    label: 'Vamos trabalhar!',
    amount: 94.99,
    description: [
      'Suporte em tempo real',
      'Live chat com seus clientes',
      'Acesso a criação de anúncios',
      'Quantidade ilimitada de produtos, vendas e visitas',
      'Ferramentas para auxiliar o seu negócio',
      'Ajude no crescimento da plataforma',
      'Renovável a cada 30 dias',
    ],
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
      'Renovável a cada 30 dias',
    ],
  },
];

const denounceReasons = denouces_data
  .sort((a, b) => (a > b ? 1 : -1))
  .map((reason) => ({ label: reason, value: reason }));

const shareUrlPaths = (props: TShareUrlPaths): TShareUrls[] =>
  [
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
      name: 'Compartilhe por E-mail',
      url: `mailto:?subject=${props.title}&body=${props.hostname}/blog/post/${props.slug}`,
      icon: IoMail,
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
  ].sort((a, b) => (a.name > b.name ? 1 : -1));

const dashboardActions = (props: {
  userId: string;
  storeId: string;
}): TDashboardActions => ({
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
        url: `/community/profile/${props.userId}`,
        icon: IoEye,
      },
      {
        label: 'Minhas compras',
        url: `/users/dashboard/profile/shopping`,
        icon: IoBasket,
      },
      {
        label: 'Produtos favoritos',
        url: `/users/dashboard/profile/favorite-products?id=${props.userId}`,
        icon: IoBasket,
      },
    ],
  },
  store: {
    header: { label: 'Loja', icon: IoStorefront },
    paths: [
      {
        label: 'Visualizar loja',
        url: `/community/store/${props.storeId}`,
        icon: IoStorefrontOutline,
      },
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
        url: '/users/dashboard/product-editor',
        icon: IoAdd,
      },
      {
        label: 'Vendas de produtos',
        url: '/users/dashboard/store/orders',
        icon: IoBagCheck,
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
        label: 'Destacar produtos da loja',
        url: '/users/dashboard/ads/products',
        icon: IoFlash,
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
      {
        label: 'Verificação da loja',
        url: `/docs/store-verification`,
        icon: IoFingerPrint,
      },
      {
        label: 'Perguntas Frequêntes',
        url: `/docs/faq`,
        icon: IoInformationCircleOutline,
      },
      {
        label: 'Preçário',
        url: `/docs/pricing`,
        icon: BsCurrencyExchange,
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

const payment_options: TPaymentOptions = [
  { type: 'm-pesa', label: 'M-Pesa', image: mpesa_logo },
  { type: 'paypal', label: 'Paypal', image: paypal_log },
];

const formatSocialNetwork = (data: TSocialNetwork) => {
  if (data) {
    return Object.entries(data)
      .map(([key, value]) => {
        switch (key) {
          case 'facebook':
            return {
              name: 'Facebook',
              url: value,
              icon: IoLogoFacebook,
            };
          case 'instagram':
            return {
              name: 'Instagram',
              url: value,
              icon: FaInstagram,
            };
          case 'website':
            return {
              name: 'Website',
              url: value,
              icon: FaLink,
            };
          case 'linkedin':
            return {
              name: 'LinkedIn',
              url: value,
              icon: FaLinkedinIn,
            };
          case 'whatsapp':
            return {
              name: 'Whatsapp',
              url: value,
              icon: FaWhatsapp,
            };
          default:
            return undefined;
        }
      })
      .sort((a, b) => {
        if (a && b) {
          if (a.name > b.name) return 1;
          return -1;
        }
        return 1;
      });
  }
};

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
};
