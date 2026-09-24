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
      <div className="lg:h-max w-screen min-h-screen flex flex-col justify-center overflow-hidden mb-5">
        <Header theme={theme} toggleTheme={toggleTheme} />

        <main className="flex-1 w-full px-2.5 mt-20">
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="lg:order-2 lg:w-[300px] flex flex-col gap-2.5">
              <QRPreview settings={settings} />
            </div>

            <div className="lg:order-1 lg:w-[calc(100%-430px)] flex flex-col gap-6">
              <div className="bg-surface-light dark:bg-surface-dark rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden">
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
