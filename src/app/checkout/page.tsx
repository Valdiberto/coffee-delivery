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
import { useToast } from '@/context/ToastProvider'
import { formatCurrency } from '@/utils/formatCurrency'

export default function Checkout() {
  const { addToast } = useToast()
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

  const shippingPrice = 3.5

  const totalPrice = totalItemsPrice + shippingPrice

  const formattedPrice = formatCurrency(totalItemsPrice)
  const formattedShippingPrice = formatCurrency(shippingPrice)
  const formattedTotalPrice = formatCurrency(totalPrice)

  function handleRemoveItem(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault()
    const itemId = parseInt(event.currentTarget.value)

    removeFromCart(itemId)
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

    addToast({
      title: 'Pagamento concluído',
      description: `Compra de ${cart.length} café(s) com sucesso.`,
      variant: 'success',
    })

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
        className="flex flex-col gap-8 lg:flex-row lg:items-start"
      >
        <div className="flex w-full flex-col gap-3 lg:max-w-[calc(100%-448px)]">
          <h1 className="text-base-subtitle font-baloo mb-3.5 text-lg font-bold">
            Complete seu pedido
          </h1>

          <div className="bg-base-card rounded-md p-5 lg:p-10">
            <div className="mb-8 flex items-start gap-2">
              <MapPinLineIcon size={22} className="text-yellow-dark" />
              <div>
                <h2 className="text-base-subtitle">Endereço de Entrega</h2>
                <h3 className="text-base-text text-sm">
                  Informe o endereço onde deseja receber seu pedido
                </h3>
              </div>
            </div>

            <div className="grid gap-x-3 gap-y-4 lg:max-w-[560px] lg:grid-cols-[1fr_1fr_auto]">
              <div className="col-span-2 lg:col-span-1">
                <TextInput placeholder="CEP" {...register('cep')} />
                {errors.cep && (
                  <span className="text-xs text-red-500">
                    {errors.cep.message}
                  </span>
                )}
              </div>
              <div className="col-span-3">
                <TextInput placeholder="Rua" {...register('rua')} />
                {errors.rua && (
                  <span className="text-xs text-red-500">
                    {errors.rua.message}
                  </span>
                )}
              </div>
              <div className="col-span-2 lg:col-span-1">
                <TextInput placeholder="Número" {...register('numero')} />
                {errors.numero && (
                  <span className="text-xs text-red-500">
                    {errors.numero.message}
                  </span>
                )}
              </div>

              <div className="col-span-3 lg:col-span-2">
                <TextInput
                  placeholder="Complemento"
                  optional
                  {...register('complemento')}
                />
              </div>
              <div className="col-span-3 lg:col-span-1">
                <TextInput placeholder="Bairro" {...register('bairro')} />
                {errors.bairro && (
                  <span className="text-xs text-red-500">
                    {errors.bairro.message}
                  </span>
                )}
              </div>
              <div className="col-span-2 lg:col-span-1">
                <TextInput placeholder="Cidade" {...register('cidade')} />
                {errors.cidade && (
                  <span className="text-xs text-red-500">
                    {errors.cidade.message}
                  </span>
                )}
              </div>
              <div className="w-20">
                <TextInput placeholder="UF" {...register('uf')} />
                {errors.uf && (
                  <span className="text-xs text-red-500">
                    {errors.uf.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="bg-base-card rounded-md p-5 lg:p-10">
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

            <div className="flex flex-col gap-3 lg:grid lg:grid-cols-3">
              <PaymentOptions
                onSelect={setPaymentMethod}
                selected={paymentMethod}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 lg:w-112">
          <h1 className="text-base-subtitle font-baloo mb-3.5 text-lg font-bold">
            Café selecionados
          </h1>
          <div
            className="bg-base-card flex flex-col rounded p-3 pt-1 lg:p-10 lg:pt-6"
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
                    <div className="mt-4 mb-4 flex gap-3 px-1 py-2 lg:gap-5">
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
                              className="text-purple-base group-hover:text-purple-dark transition-colors duration-300"
                            />
                            Remover
                          </button>
                        </div>
                      </div>
                      <div className="flex lg:ml-7.5">
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
                  className="bg-yellow-base text-base-white hover:bg-yellow-dark mt-6 cursor-pointer rounded-md px-2 py-3 text-sm font-bold uppercase transition-colors duration-300"
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
