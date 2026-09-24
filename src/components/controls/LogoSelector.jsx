import { Upload } from 'lucide-react';
import { useRef } from 'react';

const PLATFORMS = [
  { id: 'facebook', name: 'Facebook', icon: 'facebook' },
  { id: 'instagram', name: 'Instagram', icon: 'instagram' },
  { id: 'tiktok', name: 'TikTok', icon: 'tiktok' },
  { id: 'youtube', name: 'YouTube', icon: 'youtube' },
  { id: 'telegram', name: 'Telegram', icon: 'telegram' },
  { id: 'whatsapp', name: 'WhatsApp', icon: 'whatsapp' },
  { id: 'x', name: 'X', icon: 'x' },
  { id: 'linkedin', name: 'LinkedIn', icon: 'linkedin' },
  { id: 'github', name: 'GitHub', icon: 'github' },
  { id: 'discord', name: 'Discord', icon: 'discord' },
  { id: 'snapchat', name: 'Snapchat', icon: 'snapchat' },
  { id: 'spotify', name: 'Spotify', icon: 'spotify' },
  { id: 'reddit', name: 'Reddit', icon: 'reddit' },
];

export function LogoSelector({ settings, updateSetting }) {
  const fileInputRef = useRef(null);

  const handleLogoSelect = (platform) => {
    // If selecting the already selected platform, remove it
    if (settings.image?.includes(platform.icon)) {
      updateSetting('image', null);
      updateSetting(['qrOptions', 'errorCorrectionLevel'], 'Q'); // Reset to Q
      return;
    }

    // We use unpkg or jsdelivr for simple-icons. Using SVG directly.
    const url = `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${platform.icon}.svg`;
    updateSetting('image', url);
    updateSetting(['qrOptions', 'errorCorrectionLevel'], 'H'); // Ensure H for logo
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      updateSetting('image', event.target.result);
      updateSetting(['qrOptions', 'errorCorrectionLevel'], 'H');
    };
    reader.readAsDataURL(file);

    // Reset input so the same file can be uploaded again if cleared
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {settings.image && (
        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
          <p className="text-sm text-amber-800 dark:text-amber-300">
            <strong>Note:</strong> Adding a logo sets Error Correction to High.
            Ensure the logo size doesn't make the QR code unscannable.
          </p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Upload Custom Logo
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer"
        >
          <div className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400">
            <Upload className="w-6 h-6" />
            <span className="text-sm font-medium">
              Click to upload an image
            </span>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>

        {settings.image && (
          <button
            onClick={() => updateSetting('image', null)}
            className="mt-3 text-sm text-red-600 hover:text-red-700 dark:text-red-400 font-medium"
          >
            Remove Current Logo
          </button>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Social Media Logos
        </label>
        <div className="flex flex-wrap gap-3">
          {PLATFORMS.map((platform) => {
            const isSelected = settings.image?.includes(platform.icon);
            return (
              <button
                key={platform.id}
                onClick={() => handleLogoSelect(platform)}
                className={`p-3 border rounded-xl flex items-center justify-center transition-colors ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                title={platform.name}
              >
                <img
                  src={`https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${platform.icon}.svg`}
                  alt={platform.name}
                  className={`w-6 h-6 ${
                    // Make icons readable in dark mode if they are naturally black
                    platform.icon === 'github' ||
                    platform.icon === 'x' ||
                    platform.icon === 'tiktok'
                      ? 'dark:invert'
                      : ''
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {settings.image && (
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Logo Size
              </label>
              <span className="text-sm text-gray-500">
                {Math.round(settings.imageOptions.imageSize * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="0.5"
              step="0.05"
              value={settings.imageOptions.imageSize}
              onChange={(e) =>
                updateSetting(
                  ['imageOptions', 'imageSize'],
                  parseFloat(e.target.value),
                )
              }
              className="w-full accent-blue-600"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                updateSetting(
                  ['imageOptions', 'hideBackgroundDots'],
                  !settings.imageOptions.hideBackgroundDots,
                )
              }
              className={`w-10 h-6 rounded-full p-1 transition-colors ${
                settings.imageOptions.hideBackgroundDots
                  ? 'bg-blue-600'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${
                  settings.imageOptions.hideBackgroundDots
                    ? 'translate-x-4'
                    : 'translate-x-0'
                }`}
              />
            </button>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Hide dots behind logo
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
