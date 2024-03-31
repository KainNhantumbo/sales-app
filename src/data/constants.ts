import Package from '@/../package.json';
import authorPicture from '@/../public/assets/author.jpg';
import mpesa_logo from '@/../public/trademarks/mpesa logo.png';
import type { Author, Option, Pricing, TPaymentOptions } from '@/types';
import * as Fa from 'react-icons/fa';
import * as Io from 'react-icons/io5';
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
  appName: Package.name,
  version: Package.version,
  notice: Package.notice,
  copyright: `© ${new Date().getFullYear()} ${Package.author.name}`,
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
      icon: Io.IoLogoFacebook
    },
    {
      name: 'Encontre-nos no Instagram',
      url: 'https://www.pinterest.com/travel_sketchpad',
      icon: Fa.FaInstagram
    },
    {
      name: 'Encontre-nos no LinkedIn',
      url: 'https://www.pinterest.com/travel_sketchpad',
      icon: Fa.FaLinkedinIn
    },
    {
      name: 'Encontre-nos no Twitter',
      url: 'https://www.twitter.com/travel_sketchpad',
      icon: Fa.FaTwitter
    }
  ]
};

export const DEFAULT_ERROR_MESSAGE = 'Oops! Algo deu errado. Tente novamente.';

export const urls: Array<{ name: string; url: string; alias: string }> = [
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
    icon: Io.IoCard
  },
  {
    title: 'Venda em diversos canais',
    description:
      'Integre a sua loja virtual com redes sociais, canais de marketplace ou dropshipping em poucos cliques.',
    icon: Io.IoMegaphoneOutline
  },
  {
    title: 'Sem limite de produtos ou de visitas',
    description:
      'Adicione quantos produtos quiser e não tenha limite de vendas ou de visitas na sua loja virtual.',
    icon: Io.IoInfiniteOutline
  },
  {
    title: 'Estratégias de marketing digital',
    description:
      'Aumente suas vendas com campanhas de performance via Google e redes sociais.',
    icon: Io.IoRocketOutline
  },
  {
    title: 'Checkout transparente',
    description:
      'Ofereça a melhor Experiência no seu e-commerce e diminua sua taxa de abandono de carrinho.',
    icon: Io.IoCartOutline
  },
  {
    title: 'Diferentes canais de suporte',
    description:
      'Conte com os diferentes canais de suporte que oferecemos e tenha sempre a ajuda que você precisa na hora certa.',
    icon: Io.IoChatbubbleEllipsesOutline
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

export const denounceReasons: Option[] = denounces_data
  .sort((a, b) => (a > b ? 1 : -1))
  .map((reason) => ({ label: reason, value: reason }));

export const DEFAULT_MIME_TYPES: string[] = ['image/png', 'image/jpeg', 'image/jpg'];

export const states: Array<Option> = [
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
].sort((a, b) => (a.label > b.label ? 1 : -1));

export const orderStatusOptions = order_status_labels.sort((a, b) =>
  a.label > b.label ? 1 : -1
);

export const CART_STORE_KEY: string = 'USER-CART-ITEMS';
