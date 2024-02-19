export function getNestedField(val, obj, toggle) {
//    console.log(`val: ${val}, obj: ${obj}`);
  return (
    val?.split(".").reduce((obj, key) => obj?.[key], obj) ??
    (toggle ? false : "")
  );
}
