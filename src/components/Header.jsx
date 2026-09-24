import { QrCode } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Header({ theme, toggleTheme }) {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-surface-dark sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <QrCode className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              QR Code Generator
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>
      </div>
    </header>
  );
}
