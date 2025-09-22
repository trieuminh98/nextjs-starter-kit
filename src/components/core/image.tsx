// components/CustomImage.tsx
import { ImageQuality } from '@/types/common';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import NImage, { ImageProps } from 'next/image';
import { memo, SyntheticEvent, useCallback, useState } from 'react';

// Define default sizes for responsive loading
const DEFAULT_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

type CustomImageProps = {
  placeholderType?: 'blur' | 'empty';
  unoptimized?: boolean;
  fallbackImage?: string | StaticImport;
  quality?: ImageQuality;
} & ImageProps;

/**
 * Custom global Image wrapper to centralize defaults:
 * - auto blur placeholder
 * - responsive sizes
 * - lazy loading
 * - default quality
 */
export function Image({
  placeholderType = 'empty',
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
