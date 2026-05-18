import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { SITE } from '@/constants/site';

interface HeroEditorialProps {
  image: { src: string; alt: string };
  eyebrow?: string;
  title?: string;
  ctaLabel?: string;
}

export function HeroEditorial({
  image,
  eyebrow = SITE.season.toUpperCase(),
  title = SITE.tagline,
  ctaLabel = 'EXPLORE FILM',
}: HeroEditorialProps) {
  return (
    <section className="relative flex h-[640px] w-full items-center justify-center overflow-hidden md:h-[921px]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        unoptimized
        className="object-cover grayscale"
        sizes="100vw"
      />
      <div className="relative z-10 mix-blend-difference text-center text-white">
        <p className="font-body text-label-caps mb-stack-md tracking-[0.3em]">
          {eyebrow}
        </p>
        <h2 className="font-display text-headline-xl-mobile md:text-headline-xl mb-stack-lg italic">
          {title}
        </h2>
        <div className="flex justify-center gap-stack-lg">
          <Button variant="solid" className="bg-white !text-black hover:!text-white">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
