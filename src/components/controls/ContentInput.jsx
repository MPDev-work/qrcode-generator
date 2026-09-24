export function ContentInput({ settings, updateSetting }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-black dark:text-white mb-6 tracking-tight">
          Create your QR code
        </h3>
        <textarea
          id="data"
          value={settings.data}
          onChange={(e) => updateSetting('data', e.target.value)}
          placeholder="Paste a URL or enter text..."
          className="w-full h-40 px-4 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-[#1E90FF] focus:ring-4 focus:ring-[#1E90FF]/20 text-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-none transition-all"
        />
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          The QR code & 1000px card update automatically as you type.
        </p>
      </div>
    </div>
  );
}
