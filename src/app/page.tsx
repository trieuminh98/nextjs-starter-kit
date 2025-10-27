import Link from '@/components/core/link';

export default async function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center">
      Welcome to the nextjs-starter-kit
      <Link prefetch href={'/hydrated-page'}>
        Hydrated Page
      </Link>
      <Link prefetch href={'/experiment/custom-variant'}>
        Custom Variant
      </Link>
      <Link prefetch href={'/experiment/hydration-with-uses'}>
        Hydration with useSyncExternalStore
      </Link>
    </div>
  );
}
