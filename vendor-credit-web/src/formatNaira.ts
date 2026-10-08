const nairaCurrency = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const nairaDigits = new Intl.NumberFormat("en-NG");

export function formatNaira(amount: number) {
  return nairaCurrency.format(amount);
}

export function formatNairaDigits(amount: number) {
  return nairaDigits.format(amount);
}
