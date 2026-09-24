import { ThemeToggle } from './ThemeToggle';

export function Header({ theme, toggleTheme }) {
  return (
    <header className="fixed inset-x-0 border-b border-gray-200/80 dark:border-gray-800 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-md top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Jvke Logo */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-bold tracking-tight text-black dark:text-white">
                  Jvke
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#1E90FF]/15 text-[#1E90FF] dark:bg-[#1E90FF]/25 dark:text-[#1E90FF] tracking-wider uppercase">
                  Studio
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>
      </div>
    </header>
  );
}
