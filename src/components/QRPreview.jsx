import { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import {
  Download,
  Check,
  Copy,
  AlertCircle,
  Image as ImageIcon,
} from 'lucide-react';

export function QRPreview({ settings }) {
  const qrRef = useRef(null);
  const qrCode = useRef(null);
  const [downloadFormat, setDownloadFormat] = useState('png');
  const [copiedText, setCopiedText] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [error, setError] = useState(null);

  // Initialize the QR Code generator once
  useEffect(() => {
    if (!qrRef.current) return;

    // Clear any leftover nodes (e.g. from React StrictMode remounting)
    qrRef.current.innerHTML = '';

    qrCode.current = new QRCodeStyling({
      width: 300,
      height: 300,
      margin: settings.margin ?? 10,
      type: 'svg', // Render as SVG in preview for crispness
      data: settings.data || 'https://example.com',
      qrOptions: settings.qrOptions,
      imageOptions: settings.imageOptions,
      dotsOptions: settings.dotsOptions,
      backgroundOptions: settings.backgroundOptions,
      cornersSquareOptions: settings.cornersSquareOptions,
      cornersDotOptions: settings.cornersDotOptions,
      image: settings.image || '',
    });

    qrCode.current.append(qrRef.current);

    return () => {
      if (qrRef.current) {
        qrRef.current.innerHTML = '';
      }
    };
  }, []);

  // Update QR Code when settings change
  useEffect(() => {
    if (!qrCode.current) return;

    try {
      qrCode.current.update({
        data: settings.data || 'https://example.com',
        width: 300,
        height: 300,
        margin: settings.margin,
        qrOptions: settings.qrOptions,
        imageOptions: settings.imageOptions,
        dotsOptions: settings.dotsOptions,
        backgroundOptions: settings.backgroundOptions,
        cornersSquareOptions: settings.cornersSquareOptions,
        cornersDotOptions: settings.cornersDotOptions,
        image: settings.image || '',
      });
      setError(null);
    } catch (err) {
      console.error('QR Code Generation Error:', err);
      setError(
        'Content is too long for the current error correction level or logo.',
      );
    }
  }, [settings]);

  const handleDownload = () => {
    if (!qrCode.current || !settings.data) return;
    try {
      qrCode.current.download({
        extension: downloadFormat,
        name: 'qrcode',
      });
    } catch (err) {
      console.error('Download failed:', err);
      setError('Failed to download QR code. Please check your settings.');
    }
  };

  const handleCopyText = async () => {
    if (!settings.data) return;
    try {
      await navigator.clipboard.writeText(settings.data);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleCopyImage = async () => {
    if (!qrCode.current || !settings.data) return;
    try {
      const blob = await qrCode.current.getRawData('png');
      if (blob && window.ClipboardItem && navigator.clipboard?.write) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        setCopiedImage(true);
        setTimeout(() => setCopiedImage(false), 2000);
      } else {
        // Fallback to text copy if clipboard item not supported
        handleCopyText();
      }
    } catch (err) {
      console.warn('Clipboard image write failed, falling back to text:', err);
      handleCopyText();
    }
  };

  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 flex flex-col items-center sticky top-24">
      <div className="w-full flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Live Preview
        </h2>
        {settings.data && (
          <span className="text-xs font-medium px-2.5 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">
            Active
          </span>
        )}
      </div>

      {/* QR Code Container Wrapper */}
      <div className="relative bg-white p-4 rounded-2xl shadow-inner border border-gray-100 dark:border-gray-700 flex items-center justify-center min-h-[340px] min-w-[340px] overflow-hidden">
        {/* Isolated DOM container for qr-code-styling. React NEVER renders children inside this div! */}
        <div ref={qrRef} className="flex items-center justify-center" />

        {/* Empty content placeholder overlay (managed entirely by React as a sibling) */}
        {!settings.data && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/85 dark:bg-gray-900/85 backdrop-blur-sm rounded-2xl z-10 p-6 text-center pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
              <Copy className="w-6 h-6" />
            </div>
            <p className="text-gray-800 dark:text-gray-200 font-semibold mb-1">
              Ready to generate
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Type or paste a URL or text to preview your QR code
            </p>
          </div>
        )}

        {/* Error overlay */}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50/95 dark:bg-red-950/95 backdrop-blur-sm p-6 text-center z-20 rounded-2xl">
            <div className="bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 p-3 rounded-full mb-3">
              <AlertCircle className="h-6 w-6" />
            </div>
            <p className="text-red-700 dark:text-red-300 font-semibold mb-1">
              QR Code Issue
            </p>
            <p className="text-xs text-red-600/90 dark:text-red-400/90 leading-relaxed max-w-[240px]">
              {error}
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="w-full mt-6 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <select
            value={downloadFormat}
            onChange={(e) => setDownloadFormat(e.target.value)}
            className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="png">PNG</option>
            <option value="svg">SVG</option>
            <option value="jpeg">JPG</option>
            <option value="webp">WEBP</option>
          </select>
          <button
            onClick={handleDownload}
            disabled={!settings.data || !!error}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleCopyImage}
            disabled={!settings.data || !!error}
            className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Copy QR Code Image to Clipboard"
          >
            {copiedImage ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <ImageIcon className="w-4 h-4" />
            )}
            {copiedImage ? 'Image Copied!' : 'Copy Image'}
          </button>

          <button
            onClick={handleCopyText}
            disabled={!settings.data}
            className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Copy Text to Clipboard"
          >
            {copiedText ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {copiedText ? 'Text Copied!' : 'Copy Text'}
          </button>
        </div>
      </div>
    </div>
  );
}
