export function toCamelCase(input: string): string {
  return input
    .trim()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[A-Z]/, (c) => c.toLowerCase())
}

export function toHumanReadable(input: string): string {
  const normalized = input
    .trim()
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .toLowerCase()

  if (!normalized) return ''

  return normalized.replace(/\b[a-z]/g, (c) => c.toUpperCase())
}
