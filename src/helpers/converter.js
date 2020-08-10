const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

export const byteConverter = (x) => {
  let l = 0;
  let n = parseInt(x, 10) || 0;

  while (n >= 1024 && ++l) {
    n /= 1024;
  }

  return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
};

const divideNumber = (number) => {
  const decimals = number.split('.')[1];
  const int = String(Math.trunc(number));
  if (int.length <= 3) return int;
  let space = 0;
  let dividedNumber = ' ';

  for (let i = int.length - 1; i >= 0; i--) {
    if (space === 3) {
      dividedNumber = `,${dividedNumber}`;
      space = 0;
    }
    dividedNumber = int.charAt(i) + dividedNumber;
    space++;
  }
  return `${dividedNumber.trim()}.${decimals}`;
};

export const smhCoinConverter = (amount: number) => {
  let v = 0;
  let unit = 'SMH';

  if (amount >= 10 ** 9) {
    v = amount / 10 ** 12;
  } else if (amount >= 10 ** 6) {
    v = amount / 10 ** 9;
    unit = 'GSMD';
  } else if (amount >= 10 ** 4) {
    v = amount / 10 ** 6;
    unit = 'MSMD';
  } else if (amount === 0) {
    // we want to show 0 balance in SMH units
    v = 0;
    unit = 'SMH';
  } else if (!Number.isNaN(amount) && typeof amount === 'number') {
    v = amount;
    unit = 'SMD';
  }

  // truncate to 3 decimals and truncate trailing fractional 0s
  const s = parseFloat(v.toFixed(3)).toString();
  // return { value: s, unit };
  return `${divideNumber(s)} ${unit}`;
};
