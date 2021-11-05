import { DECIMAL_PRECISION } from "src/config";

export const humanFriendlyNumber = (v: number | string) => {

  const formatNumber = (num: string) => {
    return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  const num = Number(v);
  if (num === 0) {
    return "0";
  }
  const smallest = Math.pow(10, -DECIMAL_PRECISION);
  if (num < smallest) {
    return `<${smallest.toFixed(DECIMAL_PRECISION)}`;
  }

  return formatNumber(num.toFixed(DECIMAL_PRECISION))
};