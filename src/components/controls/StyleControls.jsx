const DOT_STYLES = [
  { value: 'square', label: 'Square' },
  { value: 'dots', label: 'Dots' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'extra-rounded', label: 'Extra Rounded' },
  { value: 'classy', label: 'Classy' },
  { value: 'classy-rounded', label: 'Classy Rounded' },
];

const CORNER_SQUARE_STYLES = [
  { value: 'square', label: 'Square' },
  { value: 'dot', label: 'Dot' },
  { value: 'extra-rounded', label: 'Extra Rounded' },
];

const CORNER_DOT_STYLES = [
  { value: 'square', label: 'Square' },
  { value: 'dot', label: 'Dot' },
];

export function StyleControls({ settings, updateSetting }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2.5">
          Pattern Style
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {DOT_STYLES.map((style) => (
            <button
              key={style.value}
              onClick={() =>
                updateSetting(['dotsOptions', 'type'], style.value)
              }
              className={`px-3 py-2.5 border rounded-xl text-sm font-medium transition-all cursor-pointer ${
                settings.dotsOptions.type === style.value
                  ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black ring-1 ring-[#1E90FF]'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-400'
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2.5">
          Corner Square Style
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {CORNER_SQUARE_STYLES.map((style) => (
            <button
              key={style.value}
              onClick={() =>
                updateSetting(['cornersSquareOptions', 'type'], style.value)
              }
              className={`px-3 py-2.5 border rounded-xl text-sm font-medium transition-all cursor-pointer ${
                settings.cornersSquareOptions.type === style.value
                  ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black ring-1 ring-[#1E90FF]'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-400'
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2.5">
          Corner Dot Style
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {CORNER_DOT_STYLES.map((style) => (
            <button
              key={style.value}
              onClick={() =>
                updateSetting(['cornersDotOptions', 'type'], style.value)
              }
              className={`px-3 py-2.5 border rounded-xl text-sm font-medium transition-all cursor-pointer ${
                settings.cornersDotOptions.type === style.value
                  ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black ring-1 ring-[#1E90FF]'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-400'
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
