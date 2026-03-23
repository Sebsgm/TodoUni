/**
 * Cada entrada tiene:
 *  l  → colores para modo claro  (bg, bd, tx)
 *  d  → colores para modo oscuro (bg, bd, tx)
 *  pdf→ colores para jsPDF       (bg:[r,g,b], tx:[r,g,b])
 */
export const COLORS = [
  {
    l:   { bg: '#FFD6DA', bd: '#FFA0AA', tx: '#7A1525' },
    d:   { bg: '#4A1520', bd: '#8B3040', tx: '#FFB3BC' },
    pdf: { bg: [255, 214, 218], tx: [122, 21, 37] },
  },
  {
    l:   { bg: '#D6EEFF', bd: '#9AC8FF', tx: '#0F3D7A' },
    d:   { bg: '#0F2D4A', bd: '#1E5A8B', tx: '#99CCFF' },
    pdf: { bg: [214, 238, 255], tx: [15, 61, 122] },
  },
  {
    l:   { bg: '#D6F5E8', bd: '#8EE5C0', tx: '#0F5C36' },
    d:   { bg: '#0F3D24', bd: '#1E7A47', tx: '#99E6C2' },
    pdf: { bg: [214, 245, 232], tx: [15, 92, 54] },
  },
  {
    l:   { bg: '#FFE8D6', bd: '#FFC899', tx: '#7A3D0F' },
    d:   { bg: '#4A2810', bd: '#8B4E1E', tx: '#FFCC99' },
    pdf: { bg: [255, 232, 214], tx: [122, 61, 15] },
  },
  {
    l:   { bg: '#EDD6FF', bd: '#CC99FF', tx: '#4D0F7A' },
    d:   { bg: '#2D0F4A', bd: '#5C1E8B', tx: '#CC99FF' },
    pdf: { bg: [237, 214, 255], tx: [77, 15, 122] },
  },
  {
    l:   { bg: '#FFFBD6', bd: '#FFE866', tx: '#5C4D00' },
    d:   { bg: '#3D3800', bd: '#7A7000', tx: '#FFF070' },
    pdf: { bg: [255, 251, 214], tx: [92, 77, 0] },
  },
  {
    l:   { bg: '#FFD6ED', bd: '#FF99CC', tx: '#7A0F4D' },
    d:   { bg: '#4A0F30', bd: '#8B1E5C', tx: '#FF99CC' },
    pdf: { bg: [255, 214, 237], tx: [122, 15, 77] },
  },
  {
    l:   { bg: '#D6F5F5', bd: '#80E5E5', tx: '#0F5C5C' },
    d:   { bg: '#0F3D3D', bd: '#1E7A7A', tx: '#99EDED' },
    pdf: { bg: [214, 245, 245], tx: [15, 92, 92] },
  },
]

export const colorSet = (ci, darkMode) =>
  darkMode ? COLORS[ci % COLORS.length].d : COLORS[ci % COLORS.length].l
