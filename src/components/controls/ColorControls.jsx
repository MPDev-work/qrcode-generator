export function ColorControls({ settings, updateSetting }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          QR Code Color
        </label>
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={settings.dotsOptions.color}
            onChange={(e) => {
              updateSetting(['dotsOptions', 'color'], e.target.value);
              updateSetting(['cornersSquareOptions', 'color'], e.target.value);
              updateSetting(['cornersDotOptions', 'color'], e.target.value);
            }}
            className="w-12 h-12 p-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer"
          />
          <input
            type="text"
            value={settings.dotsOptions.color}
            onChange={(e) => {
              updateSetting(['dotsOptions', 'color'], e.target.value);
              updateSetting(['cornersSquareOptions', 'color'], e.target.value);
              updateSetting(['cornersDotOptions', 'color'], e.target.value);
            }}
            className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 uppercase font-mono"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Background Color
        </label>
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={
              settings.backgroundOptions.color === 'transparent'
                ? '#ffffff'
                : settings.backgroundOptions.color
            }
            onChange={(e) =>
              updateSetting(['backgroundOptions', 'color'], e.target.value)
            }
            disabled={settings.backgroundOptions.color === 'transparent'}
            className="w-12 h-12 p-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer disabled:opacity-50"
          />
          <input
            type="text"
            value={settings.backgroundOptions.color}
            onChange={(e) =>
              updateSetting(['backgroundOptions', 'color'], e.target.value)
            }
            disabled={settings.backgroundOptions.color === 'transparent'}
            className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 uppercase font-mono disabled:opacity-50"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => {
            const isTransparent =
              settings.backgroundOptions.color === 'transparent';
            updateSetting(
              ['backgroundOptions', 'color'],
              isTransparent ? '#ffffff' : 'transparent',
            );
          }}
          className={`w-10 h-6 rounded-full p-1 transition-colors ${
            settings.backgroundOptions.color === 'transparent'
              ? 'bg-blue-600'
              : 'bg-gray-300 dark:bg-gray-600'
          }`}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${
              settings.backgroundOptions.color === 'transparent'
                ? 'translate-x-4'
                : 'translate-x-0'
            }`}
          />
        </button>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Transparent Background
        </span>
      </div>
    </div>
  );
}
