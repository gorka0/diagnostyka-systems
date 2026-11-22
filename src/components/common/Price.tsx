import React from 'react';
import { COMPANY_DATA } from '@/data/company';
import { formatPrice } from '@/data/parse-rules';

export interface PriceProps {
  amount: number | null | undefined;
  prefix?: string;
  className?: string;
}

/**
 * Komponent <Price />: centralne miejsce renderowania kwot w serwisie.
 * Gdy COMPANY_DATA.showPrices === false, komponent nic nie renderuje (zwraca null).
 * Gdy COMPANY_DATA.showPrices === true, formatuje kwotę wg standardu ("49 600 zł netto").
 */
export const Price: React.FC<PriceProps> = ({ amount, prefix = '', className = '' }) => {
  if (!COMPANY_DATA.showPrices || amount === null || amount === undefined) {
    return null;
  }
  const formatted = formatPrice(amount, prefix);
  if (!formatted) return null;
  return <span className={className}>{formatted}</span>;
};

export default Price;
