import { useState, useCallback } from 'react';

export const defaultSettings = {
  data: '',
  width: 300,
  height: 300,
  margin: 10,
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
    color: '#000000',
    type: 'square', // rounded, dots, classy, classy-rounded, square, extra-rounded
  },
  backgroundOptions: {
    color: '#ffffff',
    transparent: false,
  },
  cornersSquareOptions: {
    color: '#000000',
    type: 'square', // dot, square, extra-rounded
  },
  cornersDotOptions: {
    color: '#000000',
    type: 'square', // dot, square
  },
  image: null, // URL or base64
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
      ...defaultSettings,
      ...presetSettings,
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
