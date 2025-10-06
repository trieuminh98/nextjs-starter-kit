// components/CustomImage.tsx
import { ImageQuality } from '@/types/common';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import NImage, { ImageProps } from 'next/image';
import { memo, SyntheticEvent, useCallback, useMemo, useState } from 'react';

// Define default sizes for responsive loading
const DEFAULT_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

type CustomImageProps = {
  placeholderType?: 'blur' | 'empty';
  unoptimized?: boolean;
  fallbackImage?: string | StaticImport;
  quality?: ImageQuality;
  placeholderColor?: string;
} & ImageProps;

/**
 * Custom global Image wrapper to centralize defaults:
 * - auto blur placeholder
 * - responsive sizes
 * - lazy loading
 * - default quality
 */
export function Image({
  placeholderColor = '#E5E7EB',
  placeholderType = 'blur',
  unoptimized = false,
  sizes = DEFAULT_SIZES,
  quality = 75,
  loading = 'lazy',
  decoding = 'async',
  width = 100,
  height = 100,
  fallbackImage = '/image-placeholder.png',
  src,
  onError,
  style,
  blurDataURL,
  ...rest
}: CustomImageProps) {
  const [isErr, setErr] = useState(false);

  const handleError = useCallback(
    (e: SyntheticEvent<HTMLImageElement, Event>) => {
      if (!isErr && fallbackImage && src !== fallbackImage) {
        setErr(true);
      }
      onError?.(e);
    },
    [isErr, fallbackImage, src, onError]
  );

  // Generate tiny colored SVG as blur placeholder to match requested skeleton color
  const blurDataURLValue = useMemo(() => {
    if (blurDataURL) return blurDataURL;
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><rect width='100%' height='100%' fill='${placeholderColor}'/></svg>`;
    return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  }, [placeholderColor, blurDataURL]);

  return (
    <NImage
      {...rest}
      style={{
        contentVisibility: 'auto',
        containIntrinsicSize: `${height}px ${width}px`,
        ...style,
      }}
      src={isErr || !src ? fallbackImage : src}
      placeholder={placeholderType}
      blurDataURL={blurDataURLValue}
      unoptimized={unoptimized}
      sizes={sizes}
      width={width}
      height={height}
      quality={quality}
      decoding={decoding}
      loading={loading}
      onError={handleError}
    />
  );
}

export default memo(Image);
