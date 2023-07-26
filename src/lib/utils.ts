import moment from 'moment';

export const formatDate = (date: string): string => moment(date).format('LL');

export const formatCurrency = (currency: number): string =>
  Intl.NumberFormat('pt-BR', {
    currency: 'MZN',
    style: 'currency',
  }).format(currency);
