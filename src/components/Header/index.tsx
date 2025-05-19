'use client'

import { MapPinIcon, ShoppingCartIcon } from '@phosphor-icons/react'
import { Logo } from './Logo'
import { useContext } from 'react'
import { CartContext } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useToast } from '@/context/ToastProvider'

export function Header() {
  const { addToast } = useToast()
  const { cart } = useContext(CartContext)
  const router = useRouter()

  function handleCheckoutButton() {
    if (cart.length > 0) {
      router.push('/checkout')
    } else {
      addToast({
        title: 'Oopsie',
        description: 'Seu carrinho está vazio.',
        variant: 'error',
      })
    }
  }

  return (
    <header className="py-8">
      <div className="flex justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="bg-purple-light text-purple-dark flex items-center gap-0.5 rounded-md p-2 text-sm"
          >
            <MapPinIcon
              weight="fill"
              className="text-purple-base h-5.5 w-5.5"
            />
            Porto Alegre, RS
          </button>

          <button
            type="button"
            onClick={handleCheckoutButton}
            className="bg-yellow-light relative flex cursor-pointer items-center rounded-md p-2"
          >
            {cart.length === 0 ? (
              <div className=""></div>
            ) : (
              <div className="bg-yellow-dark text-base-white absolute top-[-8px] left-6 flex h-5 w-5 items-center justify-center rounded-full text-center text-xs">
                {cart.length}
              </div>
            )}
            <ShoppingCartIcon
              weight="fill"
              className="text-yellow-dark h-5.5 w-5.5"
            />
          </button>
        </div>
      </div>
    </header>
  )
}
