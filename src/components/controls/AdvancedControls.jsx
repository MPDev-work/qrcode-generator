export function AdvancedControls({ settings, updateSetting }) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            QR Code Margin
          </label>
          <span className="text-sm text-gray-500">{settings.margin}px</span>
        </div>
        <input
          type="range"
          min="0"
          max="50"
          step="1"
          value={settings.margin}
          onChange={(e) => updateSetting('margin', parseInt(e.target.value))}
          className="w-full accent-blue-600"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Error Correction Level
        </label>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          Higher levels allow the QR code to be read even if part of it is
          covered or damaged.
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
              className={`py-2 text-sm font-medium rounded-xl border transition-colors ${
                settings.qrOptions.errorCorrectionLevel === level.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
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
