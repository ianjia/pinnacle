export const svgPlaceholder = (
  w: number,
  h: number,
  {
    label = '',
    emoji = '',
    colors = ['#7DD3FC', '#A78BFA'],
    corner = 28,
  }: { label?: string; emoji?: string; colors?: [string, string] | string[]; corner?: number }
) => {
  const [c1, c2] = colors;
  const font = Math.floor(Math.min(w, h) / 12);
  const svg = `
  <svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='${c1}'/>
        <stop offset='100%' stop-color='${c2}'/>
      </linearGradient>
      <radialGradient id='shine' cx='75%' cy='70%' r='60%'>
        <stop offset='0%' stop-color='white' stop-opacity='.18'/>
        <stop offset='100%' stop-color='white' stop-opacity='0'/>
      </radialGradient>
    </defs>
    <rect x='0' y='0' width='${w}' height='${h}' rx='${corner}' ry='${corner}' fill='url(#g)'/>
    <circle cx='${w * 0.82}' cy='${h * 0.78}' r='${Math.min(w, h) * 0.50}' fill='url(#shine)'/>
    <text x='6%' y='12%' font-family='ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto'
          font-size='${font}' fill='white' opacity='.9'>
      ${emoji ? emoji + ' ' : ''}${label}
    </text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};
