export function randomColor() {
  const colors = [
    '#334155',
    '#374151',
    '#3f3f46',
    '#404040',
    '#44403c',
    '#b91c1c',
    '#c2410c',
    '#b45309',
    '#a16207',
    '#4d7c0f',
    '#15803d',
    '#047857',
    '#0f766e',
    '#0e7490',
    '#0369a1',
    '#1d4ed8',
    '#4338ca',
    '#6d28d9',
    '#7e22ce',
    '#a21caf',
    '#be185d',
    '#be123c',
  ];

  const random = Math.floor(Math.random() * colors.length);

  return colors[random];
}
