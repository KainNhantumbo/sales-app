import moment from 'moment';

export function formatDate(date: string): string {
  return moment(date).format('LL');
}

export function formatCurrency(currency: number) {
  
}