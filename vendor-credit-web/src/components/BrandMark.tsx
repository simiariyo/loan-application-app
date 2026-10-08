import vendorCreditLogo from "../assets/vendorcredit-logo.svg";

type BrandMarkProps = {
  tone: "light" | "dark";
};

export function BrandMark({ tone }: BrandMarkProps) {
  // The logo file is navy, so it is rendered white on the navy panel.
  const toneClasses = tone === "light" ? "brightness-0 invert" : "";

  return (
    <img
      src={vendorCreditLogo}
      alt="VendorCredit"
      className={`h-8 w-auto ${toneClasses}`}
    />
  );
}
