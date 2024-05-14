export function formatNumber(num: number) {
  if (num < 1000) {
    return num.toString(); // No need to format
  }
  const units = ['', 'K', 'M', 'B', 'T']; // Units for abbreviation
  let unitIndex = 0;
  while (num >= 1000 && unitIndex < units.length - 1) {
    num /= 1000;
    unitIndex++;
  }
  const formattedNum = Number(num.toFixed(1));
  const decimalPart = formattedNum % 1 === 0 ? '' : formattedNum.toString().split('.')[1];
  return decimalPart === '0' ? formattedNum.toFixed(0) + ' ' + units[unitIndex] : formattedNum + ' ' + units[unitIndex];
}
