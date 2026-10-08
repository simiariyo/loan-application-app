import vendorCreditLogo from "../assets/vendorcredit-logo.svg";

type BrandMarkProps = {
  surface: "dark" | "light";
};

export function BrandMark({ surface }: BrandMarkProps) {
  const logo = (
    <img src={vendorCreditLogo} alt="VendorCredit" className="h-7 w-auto" />
  );

  if (surface === "dark") {
    return logo;
  }

  // The logo has white lettering, so light pages show it on a navy badge.
  return (
    <span className="inline-flex rounded-lg bg-brand px-3 py-2">{logo}</span>
  );
}
