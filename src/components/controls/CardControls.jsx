import { Type, AtSign, Globe, Palette } from 'lucide-react';
import { Switch } from '../common/Switch';

const PALETTES = [
  { name: 'Blush (Sample)', bg: '#FED0C5', text: '#1E1B18' },
  { name: 'Warm Cream', bg: '#FDF0D5', text: '#2B2118' },
  { name: 'Pastel Sage', bg: '#DCE7E1', text: '#1B3B36' },
  { name: 'Lavender Haze', bg: '#E8D7F1', text: '#3D314A' },
  { name: 'Midnight Noir', bg: '#161618', text: '#F4F4F6' },
  { name: 'Clean White', bg: '#FFFFFF', text: '#111827' },
];

const FONTS = [
  {
    id: 'Dancing Script',
    label: 'Cursive (Sample)',
    sample: 'connect with us',
    style: { fontFamily: "'Dancing Script', cursive" },
  },
  {
    id: 'Caveat',
    label: 'Handwritten',
    sample: 'connect with us',
    style: { fontFamily: "'Caveat', cursive" },
  },
  {
    id: 'Inter',
    label: 'Modern Sans',
    sample: 'CONNECT WITH US',
    style: { fontFamily: "'Inter', sans-serif" },
  },
];

export function CardControls({ settings, updateSetting }) {
  const card = settings.cardOptions || {};

  const handleApplyPalette = (palette) => {
    updateSetting(['cardOptions', 'bgColor'], palette.bg);
    updateSetting(['cardOptions', 'textColor'], palette.text);
    // Also update QR code color to match text for aesthetic harmony!
    updateSetting(['dotsOptions', 'color'], palette.text);
    updateSetting(['cornersSquareOptions', 'color'], palette.text);
    updateSetting(['cornersDotOptions', 'color'], palette.text);
  };

  return (
    <div className="space-y-6">
      {/* Switch Button matching user sample */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/60 rounded-2xl">
        <Switch
          id="card-template-toggle"
          checked={card.enabled}
          onChange={(checked) =>
            updateSetting(['cardOptions', 'enabled'], checked)
          }
          label="1:1 Square Card Template (1000px)"
          description="Renders the aesthetic card sample with custom typography & 1000px resolution"
        />
      </div>

      {card.enabled && (
        <>
          {/* Top Heading */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <Type className="w-4 h-4 text-[#1E90FF]" />
              Card Heading (Top Script)
            </label>
            <input
              type="text"
              value={card.headerText || ''}
              onChange={(e) =>
                updateSetting(['cardOptions', 'headerText'], e.target.value)
              }
              placeholder="connect with us"
              className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:border-[#1E90FF] text-gray-900 dark:text-gray-100 text-sm"
            />
          </div>

          {/* Heading Font Style */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Heading Font Style
            </label>
            <div className="grid grid-cols-3 gap-2">
              {FONTS.map((font) => (
                <button
                  key={font.id}
                  type="button"
                  onClick={() =>
                    updateSetting(['cardOptions', 'headerFont'], font.id)
                  }
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    (card.headerFont || 'Dancing Script') === font.id
                      ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black shadow-xs ring-1 ring-[#1E90FF]'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-400'
                  }`}
                >
                  <span
                    className={`block text-[11px] mb-1 font-medium ${
                      (card.headerFont || 'Dancing Script') === font.id
                        ? 'text-gray-300 dark:text-gray-600'
                        : 'text-gray-400'
                    }`}
                  >
                    {font.label}
                  </span>
                  <span className="text-sm truncate block" style={font.style}>
                    {font.sample}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Social Handle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <AtSign className="w-4 h-4 text-[#1E90FF]" />
              Social Handle / Subtitle
            </label>
            <input
              type="text"
              value={card.subText || ''}
              onChange={(e) =>
                updateSetting(['cardOptions', 'subText'], e.target.value)
              }
              placeholder="@YourSocialHandle"
              className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:border-[#1E90FF] text-gray-900 dark:text-gray-100 text-sm"
            />
          </div>

          {/* Website / Footer Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#1E90FF]" />
              Website / Tagline
            </label>
            <input
              type="text"
              value={card.footerText || ''}
              onChange={(e) =>
                updateSetting(['cardOptions', 'footerText'], e.target.value)
              }
              placeholder="www.YourSite.com"
              className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:border-[#1E90FF] text-gray-900 dark:text-gray-100 text-sm"
            />
          </div>

          {/* Aesthetic Color Palettes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <Palette className="w-4 h-4 text-[#1E90FF]" />
              Card Aesthetic Presets
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PALETTES.map((p) => {
                const isSelected =
                  card.bgColor === p.bg && card.textColor === p.text;
                return (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => handleApplyPalette(p)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-black bg-gray-50 dark:bg-gray-800/80 ring-2 ring-[#1E90FF]'
                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300'
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-lg border border-black/10 shadow-inner flex items-center justify-center text-[10px] font-bold"
                      style={{ backgroundColor: p.bg, color: p.text }}
                    >
                      Aa
                    </div>
                    <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">
                      {p.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Card Colors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Card Background Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={card.bgColor || '#FED0C5'}
                  onChange={(e) =>
                    updateSetting(['cardOptions', 'bgColor'], e.target.value)
                  }
                  className="w-10 h-10 p-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer"
                />
                <input
                  type="text"
                  value={card.bgColor || '#FED0C5'}
                  onChange={(e) =>
                    updateSetting(['cardOptions', 'bgColor'], e.target.value)
                  }
                  className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-xs uppercase font-mono text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-[#1E90FF]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Card Text & Ink Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={card.textColor || '#1E1B18'}
                  onChange={(e) => {
                    updateSetting(['cardOptions', 'textColor'], e.target.value);
                    updateSetting(['dotsOptions', 'color'], e.target.value);
                    updateSetting(
                      ['cornersSquareOptions', 'color'],
                      e.target.value,
                    );
                    updateSetting(
                      ['cornersDotOptions', 'color'],
                      e.target.value,
                    );
                  }}
                  className="w-10 h-10 p-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer"
                />
                <input
                  type="text"
                  value={card.textColor || '#1E1B18'}
                  onChange={(e) => {
                    updateSetting(['cardOptions', 'textColor'], e.target.value);
                    updateSetting(['dotsOptions', 'color'], e.target.value);
                    updateSetting(
                      ['cornersSquareOptions', 'color'],
                      e.target.value,
                    );
                    updateSetting(
                      ['cornersDotOptions', 'color'],
                      e.target.value,
                    );
                  }}
                  className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-xs uppercase font-mono text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-[#1E90FF]"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
