import { useEffect, useRef, useState, useMemo } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { Download, Check, Copy } from 'lucide-react';

export function QRPreview({ settings }) {
  const qrRef = useRef(null);
  const qrCode = useRef(null);
  const [downloadFormat, setDownloadFormat] = useState('png');
  const [copied, setCopied] = useState(false);

  const [error, setError] = useState(null);

  // Initialize the QR Code generator once
  useEffect(() => {
    qrCode.current = new QRCodeStyling({
      width: 300,
      height: 300,
      margin: 10,
      type: 'svg', // Render as SVG in preview for crispness
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 5,
      },
    });

    if (qrRef.current) {
      qrCode.current.append(qrRef.current);
    }
  }, []);

  // Update QR Code when settings change
  useEffect(() => {
    if (!qrCode.current) return;

    try {
      qrCode.current.update({
        data: settings.data || 'https://example.com',
        width: 300, // Fixed preview size
        height: 300,
        margin: settings.margin,
        qrOptions: settings.qrOptions,
        imageOptions: settings.imageOptions,
        dotsOptions: settings.dotsOptions,
        backgroundOptions: settings.backgroundOptions,
        cornersSquareOptions: settings.cornersSquareOptions,
        cornersDotOptions: settings.cornersDotOptions,
        image: settings.image,
      });
      setError(null);
    } catch (err) {
      console.error('QR Code Generation Error:', err);
      setError(
        'Text is too long for the current error correction level or logo.',
      );
    }
  }, [settings]);

  const handleDownload = () => {
    if (!qrCode.current) return;
    qrCode.current.download({
      extension: downloadFormat,
      name: 'qrcode',
    });
  };

  const handleCopy = async () => {
    if (!qrCode.current) return;
    try {
      // qr-code-styling doesn't have a direct "copy to clipboard" for the image,
      // but we can get the raw data if we render to canvas.
      // For simplicity, we just copy the link data.
      if (settings.data) {
        await navigator.clipboard.writeText(settings.data);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 flex flex-col items-center sticky top-24">
      <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-6 self-start">
        Preview
      </h2>

      <div
        ref={qrRef}
        className="bg-white p-4 rounded-xl shadow-inner border border-gray-100 dark:border-gray-700 flex items-center justify-center min-h-[340px] min-w-[340px] relative overflow-hidden"
        // We set fixed sizing to prevent layout shift during re-renders
      >
        {!settings.data && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl z-10">
            <p className="text-gray-500 font-medium">
              Enter content to generate
            </p>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50/95 backdrop-blur-sm p-6 text-center z-20">
            <div className="bg-red-100 text-red-600 p-3 rounded-full mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <p className="text-red-700 font-medium mb-1">
              Error Generating QR Code
            </p>
            <p className="text-sm text-red-600/80">{error}</p>
          </div>
        )}
      </div>

      <div className="w-full mt-8 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <select
            value={downloadFormat}
            onChange={(e) => setDownloadFormat(e.target.value)}
            className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="png">PNG</option>
            <option value="svg">SVG</option>
            <option value="jpeg">JPG</option>
            <option value="webp">WEBP</option>
          </select>
          <button
            onClick={handleDownload}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>

        <button
          onClick={handleCopy}
          disabled={!settings.data}
          className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-6 py-2.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          {copied ? 'Copied Content' : 'Copy Content'}
        </button>
      </div>
    </div>
  );
}
