import { useState, useCallback } from 'react';

export const defaultSettings = {
  data: '',
  width: 300,
  height: 300,
  margin: 0,
  qrOptions: {
    errorCorrectionLevel: 'Q', // L, M, Q, H
  },
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.4,
    margin: 5,
    crossOrigin: 'anonymous',
  },
  dotsOptions: {
    color: '#1E1B18', // Dark charcoal/black ink from the sample
    type: 'square', // rounded, dots, classy, classy-rounded, square, extra-rounded
  },
  backgroundOptions: {
    color: 'transparent', // Transparent so it merges cleanly with the card background!
    transparent: true,
  },
  cornersSquareOptions: {
    color: '#1E1B18',
    type: 'square', // dot, square, extra-rounded
  },
  cornersDotOptions: {
    color: '#1E1B18',
    type: 'square', // dot, square
  },
  image: null, // URL or base64

  // Logo Customization options
  logoOptions: {
    platformId: null,
    colorMode: 'auto', // 'auto' | 'white' | 'black' | 'brand' | 'custom'
    customColor: '#FFFFFF',
  },

  // Card Template options (matching the 1:1 1000px design sample)
  cardOptions: {
    enabled: true,
    headerText: 'connect with us',
    headerFont: 'Dancing Script', // 'Dancing Script' | 'Caveat' | 'Inter'
    subText: '@YourSocialHandle',
    footerText: 'www.YourSite.com',
    bgColor: '#FED0C5', // Exact soft blush peach from sample
    textColor: '#1E1B18',
    cornerRadius: 80, // for 1000px canvas scale (~24px at preview scale)
  },
};

export function useQRSettings() {
  const [settings, setSettings] = useState(defaultSettings);

  const updateSetting = useCallback((path, value) => {
    setSettings((prev) => {
      const newSettings = { ...prev };

      if (Array.isArray(path)) {
        let current = newSettings;
        for (let i = 0; i < path.length - 1; i++) {
          current[path[i]] = { ...current[path[i]] };
          current = current[path[i]];
        }
        current[path[path.length - 1]] = value;
      } else {
        newSettings[path] = value;
      }
      return newSettings;
    });
  }, []);

  const resetSettings = useCallback(() => {
    setSettings((prev) => ({
      ...defaultSettings,
      data: prev.data, // Keep the text/URL when resetting
    }));
  }, []);

  const applyPreset = useCallback((presetSettings) => {
    setSettings((prev) => ({
      ...prev,
      ...presetSettings,
      dotsOptions: {
        ...prev.dotsOptions,
        ...(presetSettings.dotsOptions || {}),
      },
      backgroundOptions: {
        ...prev.backgroundOptions,
        ...(presetSettings.backgroundOptions || {}),
      },
      cornersSquareOptions: {
        ...prev.cornersSquareOptions,
        ...(presetSettings.cornersSquareOptions || {}),
      },
      cornersDotOptions: {
        ...prev.cornersDotOptions,
        ...(presetSettings.cornersDotOptions || {}),
      },
      cardOptions: {
        ...prev.cardOptions,
        ...(presetSettings.cardOptions || {}),
      },
      logoOptions: {
        ...prev.logoOptions,
        ...(presetSettings.logoOptions || {}),
      },
      data: prev.data,
    }));
  }, []);

  return {
    settings,
    updateSetting,
    resetSettings,
    applyPreset,
  };
}
