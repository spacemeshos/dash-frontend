const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

export const byteConverter = (x) => {
  let l = 0;
  let n = parseInt(x, 10) || 0;

  while (n >= 1024 && ++l) {
    n /= 1024;
  }

  return `${+n.toFixed(3)} ${units[l]}`;
};

const CoinUnits = {
  SMH: 'SMH',
  Smidge: 'Smidge',
};

const packValueAndUnit = (value: number, unit: string) => ({
  value: parseFloat(value.toFixed(3)).toString(),
  unit,
});

export const toSMH = (smidge: number) => smidge / 10 ** 9;
export const toSmidge = (smh: number) => Math.ceil(smh * 10 ** 9);

// Parses number into { value, unit } format.
// Used to format smidge strings
export const parseSmidge = (amount: number) => {
  // If amount is "falsy" (0 | undefined | null)
  if (!amount) return packValueAndUnit(0, CoinUnits.SMH);
  // Show `23.053 SMH` for big amount
  if (amount >= 10 ** 6) return packValueAndUnit(toSMH(amount), CoinUnits.SMH);
  // Or `6739412 Smidge` (without dot) for small amount
  if (!Number.isNaN(amount)) return packValueAndUnit(amount, CoinUnits.Smidge);
  // Show `0 SMH` for zero amount and NaN
  return packValueAndUnit(0, CoinUnits.SMH);
};

// Returns formatted display string for a smidge amount.
// All coin displayed in the app should display amount formatted
export const formatSmidge = (amount: number): string => {
  const { value, unit } = parseSmidge(amount);
  return `${value} ${unit}`;
};
