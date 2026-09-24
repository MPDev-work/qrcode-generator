import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { useQRSettings } from './hooks/useQRSettings';
import { QRPreview } from './components/QRPreview';
import { CustomizationPanel } from './components/CustomizationPanel';
import { ErrorBoundary } from './components/ErrorBoundary';
import { presets } from './utils/presets';

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  const { settings, updateSetting, resetSettings, applyPreset } =
    useQRSettings();

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <Header theme={theme} toggleTheme={toggleTheme} />

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile: Preview stacked on top. Desktop: Left panel, Right preview */}
            <div className="lg:order-2 lg:w-1/2 xl:w-2/5 flex flex-col gap-6">
              <QRPreview settings={settings} />
            </div>

            <div className="lg:order-1 lg:w-1/2 xl:w-3/5 flex flex-col gap-6">
              <div className="bg-surface-light dark:bg-surface-dark rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                <CustomizationPanel
                  settings={settings}
                  updateSetting={updateSetting}
                  resetSettings={resetSettings}
                  applyPreset={applyPreset}
                  presets={presets}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
