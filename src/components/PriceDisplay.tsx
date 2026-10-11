import React from 'react';

export const USD_TO_INR = 85;

export function getInrPrice(usdPrice: number): number {
  return Math.round(usdPrice * USD_TO_INR);
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(amount);
}

interface PriceDisplayProps {
  usd: number;
  className?: string;
  inrClassName?: string;
  usdClassName?: string;
  prefix?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  usd,
  className = '',
  inrClassName = 'font-bold font-mono',
  usdClassName = 'text-[0.7em] text-slate-400 font-normal font-sans ml-1',
  prefix = '',
}) => {
  const inr = getInrPrice(usd);

  return (
    <span className={`inline-flex items-baseline ${className}`}>
      {prefix && <span className="mr-1 text-[0.8em] font-medium text-slate-400">{prefix}</span>}
      <span className={inrClassName}>₹{formatINR(inr)}</span>
      <span className={usdClassName}>(${usd.toLocaleString()})</span>
    </span>
  );
};
