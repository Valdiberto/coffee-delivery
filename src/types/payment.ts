export type PaymentMethod = 'credit' | 'debit' | 'cash'

export const paymentMethodLabels: Record<PaymentMethod, string> = {
  credit: 'Cartão de Crédito',
  debit: 'Cartão de Débito',
  cash: 'Dinheiro',
}
