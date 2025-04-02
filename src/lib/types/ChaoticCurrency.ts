export interface ChaoticCurrency {
  currency: string // E.g. DKK or USD
  gross: number // With VAT (E.g. Danish moms +25%)
  net: number // Excluding VAT
  vat: number // E.g. 25
}