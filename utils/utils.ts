export function isString (string: any): boolean {
  return typeof string === 'string' || string instanceof String
}

export function parseString (string: any, value: string): string {
  if (!isString(string)) {
    throw new Error(`Incorrect or missing ${value}`)
  }

  return string
}
