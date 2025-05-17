import { BankIcon, CreditCardIcon, MoneyIcon } from '@phosphor-icons/react'
import React from 'react'

type PaymentMethod = 'credit' | 'debit' | 'cash'

interface PaymentOptionsProps {
  selected: PaymentMethod
  onSelect: (method: PaymentMethod) => void
}

export function PaymentOptions({ selected, onSelect }: PaymentOptionsProps) {
  const methods: {
    type: PaymentMethod
    label: string
    icon: React.ReactNode
  }[] = [
    {
      type: 'credit',
      label: 'Cartão de Crédito',
      icon: <CreditCardIcon size={16} className="text-purple-base" />,
    },
    {
      type: 'debit',
      label: 'Cartão de Débito',
      icon: <BankIcon size={16} className="text-purple-base" />,
    },
    {
      type: 'cash',
      label: 'Dinheiro',
      icon: <MoneyIcon size={16} className="text-purple-base" />,
    },
  ]

  return (
    <>
      {methods.map(({ type, label, icon }) => (
        <button
          key={type}
          onClick={() => onSelect(type)}
          type="button"
          className={`${selected === type ? 'bg-purple-light border-purple-dark border' : 'bg-base-button'} hover:text-base-subtitle hover:bg-base-hover text-base-text flex w-full cursor-pointer items-center gap-3 rounded-md p-4 text-xs uppercase`}
        >
          {icon}
          {label}
        </button>
      ))}
    </>
  )
}
