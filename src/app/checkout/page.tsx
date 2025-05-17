'use client'

import { CounterButtons } from '@/components/CounterButton'
import { PaymentOptions } from '@/components/PaymentOptions'
import { TextInput } from '@/components/TextInput'
import { CartContext } from '@/context/CartContext'
import {
  CurrencyDollarIcon,
  MapPinLineIcon,
  TrashIcon,
} from '@phosphor-icons/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addressSchema, AddressFormData } from '@/schemas/addressSchema'

export default function Checkout() {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  })

  const [paymentMethod, setPaymentMethod] = useState<
    'credit' | 'debit' | 'cash'
  >('credit')
  const { cart, removeFromCart, clearCart, updateItemQuantity } =
    useContext(CartContext)

  const totalItemsPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  )

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(totalItemsPrice)

  const shippingPrice = 3.5

  const formattedShippingPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(shippingPrice)

  const totalPrice = totalItemsPrice + shippingPrice

  const formattedTotalPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(totalPrice)

  function handleRemoveItem(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault()
    const itemId = parseInt(event.currentTarget.value)

    removeFromCart(itemId)
    console.log(itemId)
  }

  function handleCreatePayment(data: AddressFormData) {
    if (cart.length === 0) {
      alert('Seu carrinho está vazio')
      return
    }

    if (!paymentMethod) {
      alert('Selecione uma forma de pagamento')
      return
    }

    console.log('Pedido confirmado!')
    console.log('Carrinho:', cart)
    console.log('Endereço:', data)
    console.log('Forma de pagamento:', paymentMethod)

    alert('Pedido confirmado com sucesso')
    clearCart()

    router.push(
      `/success?rua=${data.rua}&numero=${data.numero}&bairro=${data.bairro}&cidade=${data.cidade}&uf=${data.uf}&pagamento=${paymentMethod}`,
    )
  }

  return (
    <div className="pt-10">
      <form
        onSubmit={handleSubmit(handleCreatePayment)}
        method="post"
        className="flex justify-between"
      >
        <div className="flex flex-col gap-3">
          <h1 className="text-base-subtitle font-baloo mb-3.5 text-lg font-bold">
            Complete seu pedido
          </h1>

          <div className="bg-base-card rounded-md p-10">
            <div className="mb-8 flex items-start gap-2">
              <MapPinLineIcon size={22} className="text-yellow-dark" />
              <div>
                <h2 className="text-base-subtitle">Endereço de Entrega</h2>
                <h3 className="text-base-text text-sm">
                  Informe o endereço onde deseja receber seu pedido
                </h3>
              </div>
            </div>

            <div className="grid max-w-[560px] grid-cols-3 space-y-4 space-x-3">
              <TextInput
                placeholder="CEP"
                className="col-span-1"
                {...register('cep')}
              />
              {errors.cep && (
                <span className="text-xs text-red-500">
                  {errors.cep.message}
                </span>
              )}
              <TextInput
                placeholder="Rua"
                className="col-span-3"
                {...register('rua')}
              />
              <TextInput
                placeholder="Número"
                className="col-span-1"
                {...register('numero')}
              />
              <TextInput
                placeholder="Complemento"
                optional
                className="col-span-2"
                {...register('complemento')}
              />
              <TextInput
                placeholder="Bairro"
                className="col-span-1"
                {...register('bairro')}
              />
              <TextInput
                placeholder="Cidade"
                className="col-span-1"
                {...register('cidade')}
              />
              <TextInput
                placeholder="UF"
                className="col-span-1 mr-3 mb-4"
                {...register('uf')}
              />
            </div>
          </div>

          <div className="bg-base-card rounded-md p-10">
            <div className="mb-8 flex items-start gap-2">
              <CurrencyDollarIcon size={22} className="text-purple-base" />
              <div>
                <h2 className="text-base-subtitle">Pagamento</h2>
                <h3 className="text-base-text text-sm">
                  O pagamento é feito na entrega. Escolha a forma que deseja
                  pagar
                </h3>
              </div>
            </div>

            <div className="flex gap-3">
              <PaymentOptions
                onSelect={setPaymentMethod}
                selected={paymentMethod}
              />
            </div>
          </div>
        </div>
        <div className="flex w-max flex-col gap-3">
          <h1 className="text-base-subtitle font-baloo mb-3.5 text-lg font-bold">
            Café selecionados
          </h1>
          <div
            className="bg-base-card flex flex-col rounded p-10 pt-6"
            style={{
              borderTopLeftRadius: '6px',
              borderBottomLeftRadius: '44px',
              borderTopRightRadius: '44px',
              borderBottomRightRadius: '6px',
            }}
          >
            {cart.length === 0 ? (
              <p>O carrinho está vazio</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.id} className="border-base-button border-b">
                    <div className="mt-4 mb-4 flex gap-5 px-1 py-2">
                      <Image
                        alt={item.name}
                        src={item.img}
                        height={64}
                        width={64}
                      />

                      <div className="flex flex-col gap-2">
                        <h2 className="text-base-subtitle">{item.name}</h2>
                        <div className="flex gap-2">
                          <CounterButtons
                            onQuantityChange={(newQty) =>
                              updateItemQuantity(item.id, newQty)
                            }
                            amount={item.quantity}
                            id={item.id}
                          />
                          <button
                            value={item.id}
                            type="button"
                            onClick={handleRemoveItem}
                            className="group text-base-text hover:bg-base-hover hover:text-base-subtitle bg-base-button flex cursor-pointer items-center gap-1 rounded-md px-2 text-xs uppercase"
                          >
                            <TrashIcon
                              size={16}
                              className="text-purple-base group-hover:text-purple-dark"
                            />
                            Remover
                          </button>
                        </div>
                      </div>
                      <div className="ml-7.5 flex">
                        <span className="text-base-text text-end font-bold">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="text-base-text mt-6 flex flex-col gap-2 text-right text-sm">
                  <div className="flex justify-between">
                    <h2>Total de itens</h2>
                    <span className="text-base">{formattedPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <h2>Entrega</h2>
                    <span className="text-base">{formattedShippingPrice}</span>
                  </div>
                  <div className="text-base-subtitle flex justify-between text-xl font-bold">
                    <h2>Total</h2>
                    <span>{formattedTotalPrice}</span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-yellow-base text-base-white hover:bg-yellow-dark mt-6 cursor-pointer rounded-md px-2 py-3 text-sm font-bold uppercase"
                >
                  confirmar pedido
                </button>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
