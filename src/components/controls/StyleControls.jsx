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
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Pattern Style
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {DOT_STYLES.map((style) => (
            <button
              key={style.value}
              onClick={() =>
                updateSetting(['dotsOptions', 'type'], style.value)
              }
              className={`px-3 py-2 border rounded-xl text-sm font-medium transition-colors ${
                settings.dotsOptions.type === style.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Corner Square Style
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {CORNER_SQUARE_STYLES.map((style) => (
            <button
              key={style.value}
              onClick={() =>
                updateSetting(['cornersSquareOptions', 'type'], style.value)
              }
              className={`px-3 py-2 border rounded-xl text-sm font-medium transition-colors ${
                settings.cornersSquareOptions.type === style.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Corner Dot Style
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {CORNER_DOT_STYLES.map((style) => (
            <button
              key={style.value}
              onClick={() =>
                updateSetting(['cornersDotOptions', 'type'], style.value)
              }
              className={`px-3 py-2 border rounded-xl text-sm font-medium transition-colors ${
                settings.cornersDotOptions.type === style.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
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
