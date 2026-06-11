export function GoldFrame({
  src,
  alt,
  className = "",
}: {
  src?: string | null;
  alt: string;
  className?: string;
}) {
  return (
    <span className={`block ${className}`}>
      <span className="block bg-[linear-gradient(135deg,#8a5e1f_0%,#e8cd7a_18%,#9c6f26_38%,#f2dd96_55%,#8a5e1f_72%,#d9b95f_88%,#8a5e1f_100%)] p-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
        <span className="block border border-[#6e4a16]/70 p-[3px]">
          <span className="relative block aspect-[4/5] overflow-hidden">
            {src ? (
              <img
                src={src}
                alt={alt}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <span
                className="absolute inset-0 block bg-champagne"
                aria-hidden="true"
              />
            )}
          </span>
        </span>
      </span>
    </span>
  );
}
