import { Upload, Palette, Check } from 'lucide-react';
import { useRef } from 'react';
import { Switch } from '../common/Switch';
import { SOCIAL_PLATFORMS, getSocialSvgDataUri } from '../../utils/socialIcons';

const COLOR_PRESETS = [
  { id: 'white', label: 'White', color: '#FFFFFF' },
  { id: 'black', label: 'Black', color: '#000000' },
  { id: 'dodgerblue', label: 'Dodgerblue', color: '#1E90FF' },
  { id: 'brand', label: 'Brand Color', color: null }, // Dynamic based on platform
  { id: 'custom', label: 'Custom', color: null },
];

export function LogoSelector({ settings, updateSetting }) {
  const fileInputRef = useRef(null);
  const logo = settings.logoOptions || {
    platformId: null,
    colorMode: 'white',
    customColor: '#FFFFFF',
  };

  const selectedPlatform = SOCIAL_PLATFORMS.find(
    (p) => p.id === logo.platformId,
  );

  const resolveEffectiveColor = (mode, platform, customColor) => {
    if (mode === 'white') return '#FFFFFF';
    if (mode === 'black') return '#000000';
    if (mode === 'dodgerblue') return '#1E90FF';
    if (mode === 'brand' && platform) return platform.brand || '#1E90FF';
    if (mode === 'custom') return customColor || '#FFFFFF';
    // 'auto' default: white for dark mode & cards, or dark for light
    const isDark = document.documentElement.classList.contains('dark');
    return isDark ? '#FFFFFF' : '#000000';
  };

  const handleLogoSelect = (platform) => {
    // If selecting already selected, deselect
    if (logo.platformId === platform.id) {
      updateSetting('image', null);
      updateSetting(['logoOptions', 'platformId'], null);
      updateSetting(['qrOptions', 'errorCorrectionLevel'], 'Q');
      return;
    }

    const effectiveColor = resolveEffectiveColor(
      logo.colorMode || 'white',
      platform,
      logo.customColor,
    );

    const dataUri = getSocialSvgDataUri(platform.path, effectiveColor, 200);
    updateSetting('image', dataUri);
    updateSetting(['logoOptions', 'platformId'], platform.id);
    updateSetting(['qrOptions', 'errorCorrectionLevel'], 'H');
  };

  const handleColorModeChange = (mode) => {
    updateSetting(['logoOptions', 'colorMode'], mode);

    if (selectedPlatform) {
      const color = resolveEffectiveColor(
        mode,
        selectedPlatform,
        logo.customColor,
      );
      const dataUri = getSocialSvgDataUri(selectedPlatform.path, color, 200);
      updateSetting('image', dataUri);
    }
  };

  const handleCustomColorChange = (newColor) => {
    updateSetting(['logoOptions', 'colorMode'], 'custom');
    updateSetting(['logoOptions', 'customColor'], newColor);

    if (selectedPlatform) {
      const dataUri = getSocialSvgDataUri(selectedPlatform.path, newColor, 200);
      updateSetting('image', dataUri);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      updateSetting('image', event.target.result);
      updateSetting(['logoOptions', 'platformId'], null); // Custom upload, not standard vector platform
      updateSetting(['qrOptions', 'errorCorrectionLevel'], 'H');
    };
    reader.readAsDataURL(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {settings.image && (
        <div className="p-3.5 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-xl">
          <p className="text-xs text-amber-800 dark:text-amber-300">
            <strong>Note:</strong> Adding a logo sets Error Correction to High
            (H) so your QR code scans reliably.
          </p>
        </div>
      )}

      {/* Social Media Logos Grid */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Social Media Logos
          </label>
          <span className="text-xs text-gray-400">
            {selectedPlatform ? selectedPlatform.name : 'Select an icon'}
          </span>
        </div>

        {/* Buttons Grid: In dark mode, icons are pure white (dark:fill-white) */}
        <div className="flex flex-wrap gap-2.5">
          {SOCIAL_PLATFORMS.map((platform) => {
            const isSelected = logo.platformId === platform.id;
            return (
              <button
                key={platform.id}
                type="button"
                onClick={() => handleLogoSelect(platform)}
                className={`p-3 border rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? 'border-black bg-black dark:border-white dark:bg-white shadow-xs ring-2 ring-[#1E90FF]'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/90 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
                title={platform.name}
              >
                {/* Inline SVG: in dark mode, fills with pure white. In light mode, fills with dark charcoal */}
                <svg
                  viewBox="0 0 24 24"
                  className={`w-5 h-5 transition-colors ${
                    isSelected
                      ? 'fill-white dark:fill-black'
                      : 'fill-gray-900 dark:fill-white'
                  }`}
                >
                  <path d={platform.path} />
                </svg>
              </button>
            );
          })}
        </div>
      </div>

      {/* Customize Logo Color (when a social platform is selected) */}
      {selectedPlatform && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/60 rounded-2xl space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5 uppercase tracking-wider">
              <Palette className="w-3.5 h-3.5 text-[#1E90FF]" />
              Customize {selectedPlatform.name} Logo Color
            </label>
            <span
              className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-xs inline-block"
              style={{
                backgroundColor: resolveEffectiveColor(
                  logo.colorMode || 'white',
                  selectedPlatform,
                  logo.customColor,
                ),
              }}
            />
          </div>

          {/* Color Mode Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {COLOR_PRESETS.map((p) => {
              const isSelected = (logo.colorMode || 'white') === p.id;
              const previewBg =
                p.id === 'brand'
                  ? selectedPlatform.brand
                  : p.id === 'custom'
                    ? logo.customColor || '#FFFFFF'
                    : p.color;

              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleColorModeChange(p.id)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black shadow-xs ring-1 ring-[#1E90FF]'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full border border-black/15 shadow-2xs"
                      style={{ backgroundColor: previewBg }}
                    />
                    <span>{p.label}</span>
                  </div>
                  {isSelected && <Check className="w-3 h-3 text-[#1E90FF]" />}
                </button>
              );
            })}
          </div>

          {/* Custom Color Picker if 'custom' is active or user wants to pick exact color */}
          {(logo.colorMode === 'custom' ||
            logo.colorMode === 'white' ||
            logo.colorMode === 'black') && (
            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Custom Color Picker:
              </span>
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="color"
                  value={logo.customColor || '#FFFFFF'}
                  onChange={(e) => handleCustomColorChange(e.target.value)}
                  className="w-9 h-9 p-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer"
                />
                <input
                  type="text"
                  value={logo.customColor || '#FFFFFF'}
                  onChange={(e) => handleCustomColorChange(e.target.value)}
                  className="w-28 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-xs uppercase font-mono text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-[#1E90FF]"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Upload Custom Logo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Or Upload Image File
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl hover:border-[#1E90FF] hover:bg-blue-50/20 dark:hover:bg-blue-900/10 transition-colors cursor-pointer"
        >
          <div className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400">
            <Upload className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            <span className="text-sm font-medium">
              Click to upload custom image (PNG/JPG/SVG)
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
            onClick={() => {
              updateSetting('image', null);
              updateSetting(['logoOptions', 'platformId'], null);
            }}
            className="mt-3 text-xs text-red-600 hover:text-red-700 dark:text-red-400 font-semibold cursor-pointer"
          >
            Remove Current Logo
          </button>
        )}
      </div>

      {/* Logo Size and Hide Dots Switch */}
      {settings.image && (
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Logo Size
              </label>
              <span className="text-xs font-semibold text-gray-500">
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
              className="w-full accent-black dark:accent-white cursor-pointer"
            />
          </div>

          <div className="pt-2">
            <Switch
              id="hide-bg-dots"
              checked={settings.imageOptions.hideBackgroundDots}
              onChange={(checked) =>
                updateSetting(['imageOptions', 'hideBackgroundDots'], checked)
              }
              label="Hide Dots Behind Logo"
              description="Keep the area directly under the logo clean for better visibility"
            />
          </div>
        </div>
      )}
    </div>
  );
}
