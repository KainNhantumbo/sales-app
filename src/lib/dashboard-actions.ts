import { DashboardAction } from '@/types';
import { BiUser } from 'react-icons/bi';
import * as Bs from 'react-icons/bs';
import * as Fa from 'react-icons/fa';
import * as Io from 'react-icons/io5';

export function createDashboardActions(props: {
  userId: string;
  storeId: string;
}): DashboardAction {
  return {
    user: {
      header: { label: 'Conta', icon: BiUser },
      paths: [
        {
          label: 'Configurações da Conta',
          url: '/dashboard/users/editor',
          icon: Bs.BsPersonGear
        },
        {
          label: 'Visualizar Perfil',
          url: `/community/profile/${props.userId}`,
          icon: Bs.BsPersonVideo3
        },
        {
          label: 'Minhas Encomendas',
          url: `/dashboard/users/orders`,
          icon: Bs.BsBox2
        },
        {
          label: 'Produtos Favoritos',
          url: `/dashboard/products/favorite?id=${props.userId}`,
          icon: Bs.BsBox2Heart
        }
      ]
    },
    store: {
      header: { label: 'Loja', icon: Io.IoStorefront },
      paths: [
        {
          label: 'Visualizar Loja',
          url: `/community/store/${props.storeId}`,
          icon: Io.IoStorefrontOutline
        },
        {
          label: 'Configurações da Loja',
          url: '/dashboard/store/editor',
          icon: Io.IoCog
        },
        {
          label: 'Gerir Produtos',
          url: '/dashboard/products',
          icon: Io.IoCog
        },
        {
          label: 'Adicionar Produto',
          url: '/dashboard/products/editor',
          icon: Io.IoAdd
        },
        {
          label: 'Vendas de Produtos',
          url: '/dashboard/store/orders',
          icon: Io.IoBagCheck
        }
      ]
    },
    transaction: {
      header: { label: 'Transações', icon: Fa.FaDollarSign },
      paths: [
        {
          label: 'Pagamento de Planos e Subscrições',
          url: '/dashboard/transactions/subscriptions',
          icon: Bs.BsCreditCard2Front
        },
        {
          label: 'Pagamento de Anúncios',
          url: '/dashboard/transactions/advertisements',
          icon: Io.IoCardOutline
        }
      ]
    },
    ad: {
      header: { label: 'Anúncios', icon: Fa.FaAd },
      paths: [
        {
          label: 'Criar Anúncio',
          url: '/dashboard/advertisements/editor',
          icon: Io.IoAdd
        },
        {
          label: 'Gerir Anúncios',
          url: '/dashboard/advertisements/collections',
          icon: Io.IoCog
        }
        // ,{
        //   label: 'Destacar Produtos da Loja',
        //   url: '/dashboard/advertisements/products',
        //   icon: Io.IoFlash
        // }
      ]
    }
  };
}
