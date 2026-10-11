// Deterministic color palette for subject/company badges so the same
// subject always renders with the same accent color across the app.
const PALETTE = [
  { bg: '#e0e7ff', fg: '#3730a3' }, // indigo
  { bg: '#fee2e2', fg: '#b91c1c' }, // red
  { bg: '#dcfce7', fg: '#166534' }, // green
  { bg: '#fef3c7', fg: '#92400e' }, // amber
  { bg: '#dbeafe', fg: '#1d4ed8' }, // blue
  { bg: '#fce7f3', fg: '#9d174d' }, // pink
  { bg: '#ede9fe', fg: '#5b21b6' }, // violet
  { bg: '#cffafe', fg: '#155e75' }, // cyan
];

export function colorForLabel(label = '') {
  let hash = 0;
  for (let i = 0; i < label.length; i += 1) {
    hash = (hash * 31 + label.charCodeAt(i)) >>> 0;
  }
  return PALETTE[hash % PALETTE.length];
}
