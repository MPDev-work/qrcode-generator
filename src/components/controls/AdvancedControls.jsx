export function AdvancedControls({ settings, updateSetting }) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            QR Code Margin
          </label>
          <span className="text-xs font-semibold text-gray-500">
            {settings.margin}px
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="50"
          step="1"
          value={settings.margin}
          onChange={(e) => updateSetting('margin', parseInt(e.target.value))}
          className="w-full accent-black dark:accent-white cursor-pointer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Error Correction Level
        </label>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          Higher levels allow the QR code to be read even if part of it is
          covered by a logo or damaged.
        </p>
        <div className="grid grid-cols-4 gap-2">
          {[
            { value: 'L', label: 'L (7%)' },
            { value: 'M', label: 'M (15%)' },
            { value: 'Q', label: 'Q (25%)' },
            { value: 'H', label: 'H (30%)' },
          ].map((level) => (
            <button
              key={level.value}
              onClick={() =>
                updateSetting(
                  ['qrOptions', 'errorCorrectionLevel'],
                  level.value,
                )
              }
              className={`py-2.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                settings.qrOptions.errorCorrectionLevel === level.value
                  ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black shadow-xs ring-1 ring-[#1E90FF]'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-400'
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
