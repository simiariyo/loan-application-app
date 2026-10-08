type BrandMarkProps = {
  tone: "light" | "dark";
};

export function BrandMark({ tone }: BrandMarkProps) {
  const textColour = tone === "light" ? "text-white" : "text-brand";

  return (
    <span
      className={`inline-flex items-center gap-2 text-lg font-semibold ${textColour}`}
    >
      <span className="grid size-8 place-items-center rounded-md bg-accent text-brand">
        V
      </span>
      VendorCredit
    </span>
  );
}
