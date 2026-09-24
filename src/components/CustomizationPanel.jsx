import { useState } from 'react';
import {
  Link,
  Square,
  Palette,
  Sparkles,
  Image as ImageIcon,
  Settings2,
  RefreshCw,
} from 'lucide-react';
import { ContentInput } from './controls/ContentInput';
import { CardControls } from './controls/CardControls';
import { ColorControls } from './controls/ColorControls';
import { StyleControls } from './controls/StyleControls';
import { LogoSelector } from './controls/LogoSelector';
import { AdvancedControls } from './controls/AdvancedControls';

const SECTIONS = [
  { id: 'content', label: 'Content', icon: Link, component: ContentInput },
  { id: 'card', label: 'Card Template', icon: Square, component: CardControls },
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
  const [activeSection, setActiveSection] = useState('card');

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-black dark:text-white tracking-tight">
            Customize
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Configure content, 1000px card template, dots, colors & logos
          </p>
        </div>
        <button
          onClick={resetSettings}
          className="p-2 text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Preset Pill Buttons */}
      <div className="p-5 border-b border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/30">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mr-1">
            Presets:
          </span>
          {presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset.settings)}
              className="whitespace-nowrap px-3.5 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all cursor-pointer active:scale-95"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col sm:flex-row">
        {/* Sidebar Tabs */}
        <div className="w-full sm:w-48 sm:border-r border-gray-100 dark:border-gray-800 p-3.5 flex sm:flex-col gap-1 overflow-x-auto sm:overflow-visible">
          {SECTIONS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all whitespace-nowrap text-left text-xs font-semibold cursor-pointer ${
                activeSection === id
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-black dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
              {activeSection === id && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#1E90FF]" />
              )}
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
