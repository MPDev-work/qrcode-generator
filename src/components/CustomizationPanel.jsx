import { useState } from 'react';
import {
  Link,
  Palette,
  Sparkles,
  Image as ImageIcon,
  Settings2,
  RefreshCw,
} from 'lucide-react';
import { ContentInput } from './controls/ContentInput';
import { ColorControls } from './controls/ColorControls';
import { StyleControls } from './controls/StyleControls';
import { LogoSelector } from './controls/LogoSelector';
import { AdvancedControls } from './controls/AdvancedControls';

const SECTIONS = [
  { id: 'content', label: 'Content', icon: Link, component: ContentInput },
  { id: 'colors', label: 'Colors', icon: Palette, component: ColorControls },
  { id: 'style', label: 'Style', icon: Sparkles, component: StyleControls },
  { id: 'logo', label: 'Logo', icon: ImageIcon, component: LogoSelector },
  {
    id: 'advanced',
    label: 'Advanced',
    icon: Settings2,
    component: AdvancedControls,
  },
];

export function CustomizationPanel({
  settings,
  updateSetting,
  resetSettings,
  applyPreset,
  presets,
}) {
  const [activeSection, setActiveSection] = useState('content');

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Customize
        </h2>
        <button
          onClick={resetSettings}
          className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset.settings)}
              className="whitespace-nowrap px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col sm:flex-row">
        {/* Sidebar Tabs */}
        <div className="w-full sm:w-48 sm:border-r border-gray-100 dark:border-gray-800 p-4 flex sm:flex-col gap-2 overflow-x-auto sm:overflow-visible">
          {SECTIONS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors whitespace-nowrap text-left ${
                activeSection === id
                  ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 sm:p-8 min-h-[400px]">
          {SECTIONS.map(({ id, component: Component }) => (
            <div
              key={id}
              className={
                activeSection === id
                  ? 'block animate-in fade-in slide-in-from-right-4 duration-300'
                  : 'hidden'
              }
            >
              <Component settings={settings} updateSetting={updateSetting} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
