export function CalculateGained(data: { date: string | number; value: string | number }[]) {
  const dailyGained = [];

  for (let i = 1; i < data.length; i++) {
    const previousValue = data[i - 1].value;
    const currentValue = data[i].value;

    const gained = Number(currentValue) - Number(previousValue);

    dailyGained.push({
      date: data[i].date,
      value: gained,
    });
  }

  return dailyGained;
}
