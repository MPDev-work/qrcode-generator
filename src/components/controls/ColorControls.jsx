import { Switch } from '../common/Switch';

export function ColorControls({ settings, updateSetting }) {
  const isTransparent = settings.backgroundOptions.color === 'transparent';

  return (
    <div className="space-y-6">
      {/* QR Code Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          QR Code Pattern Color
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
            className="flex-1 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:border-[#1E90FF] text-gray-900 dark:text-gray-100 uppercase font-mono text-sm"
          />
        </div>
      </div>

      {/* Background Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Background Color
        </label>
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={isTransparent ? '#ffffff' : settings.backgroundOptions.color}
            onChange={(e) =>
              updateSetting(['backgroundOptions', 'color'], e.target.value)
            }
            disabled={isTransparent}
            className="w-12 h-12 p-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer disabled:opacity-40"
          />
          <input
            type="text"
            value={settings.backgroundOptions.color}
            onChange={(e) =>
              updateSetting(['backgroundOptions', 'color'], e.target.value)
            }
            disabled={isTransparent}
            className="flex-1 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:border-[#1E90FF] text-gray-900 dark:text-gray-100 uppercase font-mono text-sm disabled:opacity-40"
          />
        </div>
      </div>

      {/* Switch Button matching user sample */}
      <div className="pt-2">
        <Switch
          id="transparent-bg"
          checked={isTransparent}
          onChange={(checked) => {
            updateSetting(
              ['backgroundOptions', 'color'],
              checked ? 'transparent' : '#ffffff',
            );
          }}
          label="Transparent Background"
          description="Render without background fill for overlaying on designs & cards"
        />
      </div>
    </div>
  );
}
