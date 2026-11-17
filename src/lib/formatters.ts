export function formatWhatsapp(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11)
  if (!digits) return ""
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
}

export function parseCost(value: string): number {
  if (!value) return 0
  const normalized = String(value).trim().replace(",", ".")
  const parsed = Number(normalized)
  return isNaN(parsed) ? 0 : parsed
}

export function formatCostForInput(value: number): string {
  if (!value || isNaN(value) || value <= 0) {
    return ""
  }
  return value.toFixed(2).replace(".", ",")
}
