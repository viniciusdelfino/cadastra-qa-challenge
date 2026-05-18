import Image from 'next/image';
import Link from 'next/link';
import type { FeaturedCollection } from '@/types/product';
import { cn } from '@/lib/cn';

interface FeaturedCollectionsProps {
  collections: FeaturedCollection[];
}

export function FeaturedCollections({ collections }: FeaturedCollectionsProps) {
  const large = collections.find((collection) => collection.size === 'large');
  const small = collections.filter((collection) => collection.size === 'small');

  if (!large) return null;

  return (
    <section className="mt-section-gap mb-section-gap px-margin-mobile md:px-margin-desktop">
      <h3 className="font-display text-headline-lg mb-stack-lg italic">
        Featured Collections
      </h3>
      <div className="grid h-auto grid-cols-1 grid-rows-1 gap-gutter md:h-[1024px] md:grid-cols-12 md:grid-rows-2">
        <FeaturedCard collection={large} large />
        {small.map((collection) => (
          <FeaturedCard key={collection.id} collection={collection} />
        ))}
      </div>
    </section>
  );
}

interface FeaturedCardProps {
  collection: FeaturedCollection;
  large?: boolean;
}

function FeaturedCard({ collection, large = false }: FeaturedCardProps) {
  return (
    <Link
      href={`/collections?collection=${collection.slug}`}
      className={cn(
        'group relative h-[360px] overflow-hidden md:h-auto',
        large ? 'md:col-span-8 md:row-span-2' : 'md:col-span-4 md:row-span-1',
      )}
    >
      <Image
        src={collection.image.src}
        alt={collection.image.alt}
        fill
        unoptimized
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover grayscale transition-transform duration-1000 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/20" />
      <div
        className={cn(
          'absolute text-white',
          large ? 'bottom-stack-lg left-stack-lg' : 'top-stack-md right-stack-md text-right',
        )}
      >
        <p className="font-body text-label-caps mb-2">{collection.eyebrow}</p>
        <h4
          className={cn(
            large
              ? 'font-display text-headline-xl leading-none'
              : 'font-display text-headline-md',
          )}
        >
          {collection.title}
        </h4>
        {large ? (
          <span className="font-body text-label-caps mt-stack-md inline-block border-b border-white pb-1">
            DISCOVER COLLECTION
          </span>
        ) : null}
      </div>
    </Link>
  );
}
