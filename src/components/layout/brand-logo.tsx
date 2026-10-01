import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function BrandLogo({ className, priority = false, sizes = "72px" }: BrandLogoProps) {
  return (
    <Image
      src="/images/rohullah-brand.jpeg"
      alt=""
      width={1080}
      height={1080}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
