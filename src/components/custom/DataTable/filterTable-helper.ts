/**
 * Convierte un valor booleano, string o null a su representación como string.
 *
 * Útil para preparar valores booleanos antes de enviarlos como query params
 * a una API REST que espera strings (`"true"` / `"false"`).
 *
 * @param value - El valor a convertir
 * @returns `"true"`, `"false"` o `""` si el valor es null
 *
 * @example
 * getBooleanValue(true)   // → "true"
 * getBooleanValue(false)  // → "false"
 * getBooleanValue(null)   // → ""
 * getBooleanValue("true") // → "true"
 */
export function getBooleanValue(value: boolean | string | null): string {
  return typeof value === "boolean" ? String(value) : value ?? "";
}

/**
 * Valida y retorna un valor booleano, o `undefined` si el valor no es boolean.
 *
 * Útil para preparar valores de query params (que llegan como string desde la URL)
 * para usarlos como filtros booleanos en la UI.
 *
 * @param value - El valor a validar
 * @returns El valor si es boolean, o `undefined`
 *
 * @example
 * getValidBoolean(true)     // → true
 * getValidBoolean(false)    // → false
 * getValidBoolean("true")   // → undefined
 * getValidBoolean(undefined)// → undefined
 */
export function getValidBoolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

/**
 * Convierte un string `"true"` / `"false"` (proveniente de un query param de URL)
 * a su valor booleano correspondiente.
 *
 * @param value - String a parsear
 * @returns `true`, `false`, o `undefined` si el string no es válido
 *
 * @example
 * parseBooleanParam("true")  // → true
 * parseBooleanParam("false") // → false
 * parseBooleanParam("")      // → undefined
 * parseBooleanParam(undefined) // → undefined
 */
export function parseBooleanParam(
  value: string | undefined
): boolean | undefined {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}
