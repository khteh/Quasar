export function validateGSURL(val) {
  return val.toString().startsWith("gs://");
}

export function validateQNumber(val) {
  return val.toString().length > 0 && val <= 999;
}