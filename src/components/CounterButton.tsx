import { CartContext } from '@/context/CartContext'
import { MinusIcon, PlusIcon } from '@phosphor-icons/react'
import { useContext } from 'react'

export interface CounterButtonsProps {
  amount: number
  id: number
  onQuantityChange: (newQuantity: number) => void
}

export function CounterButtons({
  amount,
  id,
  onQuantityChange,
}: CounterButtonsProps) {
  const { updateItemQuantity } = useContext(CartContext)

  function handlePlus() {
    const newQuantity = amount + 1

    onQuantityChange(newQuantity)
    updateItemQuantity(id, newQuantity)
  }

  function handleMinus() {
    if (amount > 1) {
      const newQuantity = amount - 1

      onQuantityChange(newQuantity)
      updateItemQuantity(id, newQuantity)
    }
  }

  return (
    <div className="bg-base-button flex items-center gap-1 rounded-md px-2 py-1">
      <MinusIcon
        onClick={handleMinus}
        weight="bold"
        size={14}
        className="text-purple-base hover:text-purple-dark cursor-pointer"
      />
      <span className="text-base-title text-center">{amount}</span>
      <PlusIcon
        onClick={handlePlus}
        weight="bold"
        size={14}
        className="text-purple-base hover:text-purple-dark cursor-pointer"
      />
    </div>
  )
}
