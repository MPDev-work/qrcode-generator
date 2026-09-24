export function Switch({ checked, onChange, label, description, id }) {
  return (
    <label
      htmlFor={id}
      className="inline-flex items-center gap-3 cursor-pointer select-none group"
    >
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        {/* Switch track: matches user sample with #1E90FF (dodgerblue) when checked */}
        <div
          className={`w-12 h-6.5 rounded-full transition-colors duration-200 ease-in-out ${
            checked
              ? 'bg-[#1E90FF]'
              : 'bg-gray-300 dark:bg-gray-600 group-hover:bg-gray-400 dark:group-hover:bg-gray-500'
          }`}
        />
        {/* Switch thumb: crisp white circle */}
        <div
          className={`absolute top-0.5 left-0.5 w-5.5 h-5.5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
            checked ? 'translate-x-5.5' : 'translate-x-0'
          }`}
        />
      </div>

      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {label}
            </span>
          )}
          {description && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
}
