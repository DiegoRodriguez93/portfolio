// EU/EEA countries subject to GDPR
const GDPR_COUNTRIES = new Set([
  "AT","BE","BG","CY","CZ","DE","DK","EE","ES","FI","FR","GR","HR",
  "HU","IE","IT","LT","LU","LV","MT","NL","PL","PT","RO","SE","SI","SK",
  // EEA non-EU
  "NO","IS","LI",
  // UK (retained GDPR)
  "GB",
  // Switzerland (similar regime)
  "CH",
]);

export default function handler(req, res) {
  // Vercel injects these headers automatically
  const country = req.headers["x-vercel-ip-country"] || "";
  const region  = req.headers["x-vercel-ip-country-region"] || "";

  const isGDPR = GDPR_COUNTRIES.has(country.toUpperCase());
  const isCCPA = country.toUpperCase() === "US" && region.toUpperCase() === "CA";

  const required = isGDPR || isCCPA;

  res.setHeader("Cache-Control", "no-store");
  return res.json({ required, country: country || null, region: region || null });
}
