'use client';

import moment from 'moment';
export const formatDate = (date: string): string => moment(date).format('LL');

export const formatCurrency = (currency: number): string =>
  Intl.NumberFormat('pt-BR', {
    currency: 'MZN',
    style: 'currency'
  }).format(currency);

export const slidePageUp = () =>
  window.scroll({
    left: 0,
    top: 0,
    behavior: 'smooth'
  });
