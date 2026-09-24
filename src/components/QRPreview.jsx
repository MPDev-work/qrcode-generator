import { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import {
  Download,
  Check,
  Copy,
  AlertCircle,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react';

export function QRPreview({ settings }) {
  const qrRef = useRef(null);
  const qrCode = useRef(null);
  const [downloadFormat, setDownloadFormat] = useState('png');
  const [copiedText, setCopiedText] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState(null);

  const card = settings.cardOptions || {};
  const isCard = card.enabled;
  const previewQrSize = isCard ? 200 : 280;

  // Initialize the QR Code generator once
  useEffect(() => {
    if (!qrRef.current) return;

    // Clear any leftover nodes (e.g. StrictMode remounting)
    qrRef.current.innerHTML = '';

    qrCode.current = new QRCodeStyling({
      width: previewQrSize,
      height: previewQrSize,
      margin: settings.margin ?? 0,
      type: 'canvas', // Canvas mode provides reliable rasterization & SVG conversion
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
        width: previewQrSize,
        height: previewQrSize,
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
  }, [settings, previewQrSize]);

  // Generate 1000px high-resolution canvas matching the user's design sample
  const generate1000pxCanvas = async () => {
    if (document.fonts) {
      try {
        await document.fonts.ready;
      } catch (e) {
        console.warn('Font loading check error', e);
      }
    }

    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 1000;
    const ctx = canvas.getContext('2d');

    // Create high-res 1000px QR instance
    const highResQr = new QRCodeStyling({
      width: isCard ? 560 : 1000,
      height: isCard ? 560 : 1000,
      margin: isCard ? 0 : settings.margin,
      type: 'canvas',
      data: settings.data || 'https://example.com',
      qrOptions: settings.qrOptions,
      imageOptions: settings.imageOptions,
      dotsOptions: settings.dotsOptions,
      backgroundOptions: isCard
        ? { color: 'transparent', transparent: true }
        : settings.backgroundOptions,
      cornersSquareOptions: settings.cornersSquareOptions,
      cornersDotOptions: settings.cornersDotOptions,
      image: settings.image || '',
    });

    const qrBlob = await highResQr.getRawData('png');
    const qrImg = await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = URL.createObjectURL(qrBlob);
    });

    if (isCard) {
      const bgColor = card.bgColor || '#FED0C5';
      const textColor = card.textColor || '#1E1B18';
      const fontName = card.headerFont || 'Dancing Script';

      // 1. Draw 1000x1000 Card with rounded corners (80px radius)
      ctx.save();
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(0, 0, 1000, 1000, 80);
      } else {
        ctx.rect(0, 0, 1000, 1000);
      }
      ctx.fillStyle = bgColor;
      ctx.fill();
      ctx.clip();

      // 2. Top Heading Script ("connect with us")
      if (card.headerText) {
        ctx.fillStyle = textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        if (fontName === 'Dancing Script') {
          ctx.font = '700 72px "Dancing Script", cursive';
        } else if (fontName === 'Caveat') {
          ctx.font = '700 84px "Caveat", cursive';
        } else {
          ctx.font = '700 42px "Inter", sans-serif';
        }
        ctx.fillText(card.headerText, 500, 145);
      }

      // 3. Center QR Code (560 x 560 px, centered at 500, 500)
      ctx.drawImage(qrImg, 220, 220, 560, 560);

      // 4. Bottom Texts
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      if (card.subText && card.footerText) {
        ctx.font = '600 32px "Inter", sans-serif';
        ctx.fillStyle = textColor;
        ctx.fillText(card.subText, 500, 840);

        ctx.font = '400 26px "Inter", sans-serif';
        ctx.fillStyle = textColor;
        ctx.fillText(card.footerText, 500, 888);
      } else if (card.subText || card.footerText) {
        const text = card.subText || card.footerText;
        ctx.font = '600 32px "Inter", sans-serif';
        ctx.fillStyle = textColor;
        ctx.fillText(text, 500, 860);
      }

      ctx.restore();
    } else {
      ctx.drawImage(qrImg, 0, 0, 1000, 1000);
    }

    URL.revokeObjectURL(qrImg.src);
    return canvas;
  };

  // Download Handler (1000x1000px 1:1 ratio)
  const handleDownload = async () => {
    if (!qrCode.current || !settings.data) return;
    setIsExporting(true);

    try {
      if (downloadFormat === 'svg' && !isCard) {
        // Direct clean SVG export
        await qrCode.current.download({
          extension: 'svg',
          name: 'jvke-qrcode-1000px',
        });
      } else {
        const canvas = await generate1000pxCanvas();
        const mimeType =
          downloadFormat === 'jpeg'
            ? 'image/jpeg'
            : downloadFormat === 'webp'
              ? 'image/webp'
              : 'image/png';

        const blob = await new Promise((resolve) =>
          canvas.toBlob(resolve, mimeType, 0.95),
        );

        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `jvke-card-1000px.${downloadFormat === 'jpeg' ? 'jpg' : downloadFormat}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }
    } catch (err) {
      console.error('Download failed:', err);
      setError('Failed to download high-resolution card. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // Copy Image Handler (1000px High Res)
  const handleCopyImage = async () => {
    if (!qrCode.current || !settings.data) return;
    setIsExporting(true);

    try {
      const canvas = await generate1000pxCanvas();
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, 'image/png'),
      );

      if (blob && window.ClipboardItem && navigator.clipboard?.write) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        setCopiedImage(true);
        setTimeout(() => setCopiedImage(false), 2000);
      } else {
        handleCopyText();
      }
    } catch (err) {
      console.warn('Clipboard image write failed, falling back to text:', err);
      handleCopyText();
    } finally {
      setIsExporting(false);
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

  // Determine font family for preview heading
  const getHeaderFontFamily = () => {
    const f = card.headerFont || 'Dancing Script';
    if (f === 'Dancing Script') return "'Dancing Script', cursive";
    if (f === 'Caveat') return "'Caveat', cursive";
    return "'Inter', sans-serif";
  };

  return (
    <div className="lg:fixed sticky lg:w-[420px] w-full bg-surface-light dark:bg-surface-dark rounded-3xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col items-center right-2.5 bottom-2.5 top-[58px]">
      <div className="w-full flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <span>Live Preview</span>
            {/* <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
              1:1 • 1000px
            </span> */}
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {isCard ? 'Aesthetic Card Template' : 'Standard QR Code'}
          </p>
        </div>

        {settings.data && (
          <span className="text-xs font-semibold px-2.5 py-1 bg-black text-white dark:bg-white dark:text-black rounded-full flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E90FF] animate-pulse" />
            Live
          </span>
        )}
      </div>

      {/* Main Preview Container */}
      <div className="w-full flex items-center justify-center">
        {/* The 1:1 Aspect Ratio Card Preview (Matches User Sample Image!) */}
        <div
          className={`relative w-full max-w-[340px] aspect-square rounded-[32px] flex flex-col items-center justify-between p-5 transition-all duration-300 overflow-hidden ${
            !isCard ? 'bg-white dark:bg-gray-900' : ''
          }`}
          style={isCard ? { backgroundColor: card.bgColor || '#FED0C5' } : {}}
        >
          {/* Card Top Heading */}
          {isCard && (
            <div className="w-full text-center pt-1 px-2 z-10">
              <span
                className="text-2xl font-bold tracking-wide select-none block leading-tight truncate"
                style={{
                  color: card.textColor || '#1E1B18',
                  fontFamily: getHeaderFontFamily(),
                }}
              >
                {card.headerText || 'connect with us'}
              </span>
            </div>
          )}

          {/* QR Code Canvas Node */}
          <div className="my-auto flex items-center justify-center z-10">
            {/* Dedicated isolated div for qr-code-styling DOM manipulation */}
            <div ref={qrRef} className="flex items-center justify-center" />
          </div>

          {/* Card Bottom Links */}
          {isCard && (
            <div
              className="w-full text-center pb-1 px-2 z-10 flex flex-col items-center"
              style={{ color: card.textColor || '#1E1B18' }}
            >
              <span className="text-xs font-semibold tracking-tight block max-w-[280px] truncate leading-tight">
                {card.subText || '@YourSocialHandle'}
              </span>
              <span className="text-[11px] font-normal opacity-85 block max-w-[280px] truncate leading-tight mt-0.5">
                {card.footerText || 'www.YourSite.com'}
              </span>
            </div>
          )}

          {/* Empty Placeholder Overlay */}
          {!settings.data && !error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/85 dark:bg-gray-900/85 backdrop-blur-xs rounded-[32px] z-20 p-6 text-center pointer-events-none">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <p className="text-gray-900 dark:text-gray-100 font-semibold text-sm mb-1">
                Enter your link or text
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-[200px]">
                Your 1000px card will render live here automatically
              </p>
            </div>
          )}

          {/* Error Overlay */}
          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50/95 dark:bg-red-950/95 backdrop-blur-xs p-6 text-center z-20 rounded-[32px]">
              <div className="bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 p-2.5 rounded-full mb-2">
                <AlertCircle className="h-6 w-6" />
              </div>
              <p className="text-red-700 dark:text-red-300 font-semibold text-sm mb-1">
                Generation Notice
              </p>
              <p className="text-xs text-red-600/90 dark:text-red-400/90 leading-relaxed max-w-[240px]">
                {error}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Controls & Format Selector */}
      <div className="w-full mt-6 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <select
            value={downloadFormat}
            onChange={(e) => setDownloadFormat(e.target.value)}
            className="px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:border-[#1E90FF] cursor-pointer"
          >
            <option value="png">PNG</option>
            <option value="jpeg">JPG</option>
            <option value="webp">WEBP</option>
            <option value="svg">SVG Vector</option>
          </select>

          {/* Primary Button: Black as requested */}
          <button
            onClick={handleDownload}
            disabled={!settings.data || !!error || isExporting}
            className="flex-1 bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer active:scale-98"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Generating...' : 'Download'}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleCopyImage}
            disabled={!settings.data || !!error || isExporting}
            className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:border-gray-400"
            title="Copy 1000px High-Res Card Image to Clipboard"
          >
            {copiedImage ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <ImageIcon className="w-4 h-4 text-[#1E90FF]" />
            )}
            <span>{copiedImage ? 'Card Copied!' : 'Copy Card'}</span>
          </button>

          <button
            onClick={handleCopyText}
            disabled={!settings.data}
            className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:border-gray-400"
            title="Copy Link/Text"
          >
            {copiedText ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            <span>{copiedText ? 'Text Copied!' : 'Copy Text'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
