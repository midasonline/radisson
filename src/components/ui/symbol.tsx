type SymbolIconProps = {
  variant?: "light" | "dark";
};

export default function SymbolIcon({ variant = "dark" }: SymbolIconProps) {
  const src =
    variant === "light" ? "/images/logo-light.svg" : "/images/logo-dark.svg";

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      className="block h-auto w-full select-none object-contain"
    />
  );
}
