import { z } from 'zod'

export const addressSchema = z.object({
  cep: z.string().min(1, 'Informe o CEP'),
  rua: z.string().min(1, 'Informe a rua'),
  numero: z.string().min(1, 'Informe o número'),
  complemento: z.string().optional(),
  bairro: z.string().min(1, 'Informe o bairro'),
  cidade: z.string().min(1, 'Informe a cidade'),
  uf: z.string().min(2, 'Informe a UF'),
})

export type AddressFormData = z.infer<typeof addressSchema>
