import Image from "next/image";

type CourseImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export default function CourseImage({
  src,
  alt,
  priority = false,
  sizes = "100vw",
  className = "",
}: CourseImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      unoptimized
      sizes={sizes}
      className={className}
    />
  );
}
