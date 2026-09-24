export const presets = [
  {
    name: 'Classic',
    id: 'classic',
    settings: {
      dotsOptions: { type: 'square', color: '#000000' },
      cornersSquareOptions: { type: 'square', color: '#000000' },
      cornersDotOptions: { type: 'square', color: '#000000' },
      backgroundOptions: { color: '#ffffff', transparent: false },
    },
  },
  {
    name: 'Minimal',
    id: 'minimal',
    settings: {
      dotsOptions: { type: 'dots', color: '#374151' },
      cornersSquareOptions: { type: 'dot', color: '#111827' },
      cornersDotOptions: { type: 'dot', color: '#111827' },
      backgroundOptions: { color: '#ffffff', transparent: true },
    },
  },
  {
    name: 'Rounded',
    id: 'rounded',
    settings: {
      dotsOptions: { type: 'rounded', color: '#2563eb' },
      cornersSquareOptions: { type: 'extra-rounded', color: '#1e3a8a' },
      cornersDotOptions: { type: 'dot', color: '#1e3a8a' },
      backgroundOptions: { color: '#ffffff', transparent: false },
    },
  },
  {
    name: 'Brand',
    id: 'brand',
    settings: {
      dotsOptions: { type: 'classy', color: '#7c3aed' },
      cornersSquareOptions: { type: 'extra-rounded', color: '#4c1d95' },
      cornersDotOptions: { type: 'square', color: '#4c1d95' },
      backgroundOptions: { color: '#f3f4f6', transparent: false },
    },
  },
];
