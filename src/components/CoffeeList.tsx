import { coffees } from '@/data/coffees'
import { ShoppingCartIcon } from '@phosphor-icons/react'
import Image from 'next/image'
import { CounterButtons } from './CounterButton'
import { useContext, useState } from 'react'
import { CartContext } from '@/context/CartContext'

export function CoffeeList() {
  const { addToCart } = useContext(CartContext)

  const [quantities, setQuantities] = useState(() =>
    coffees.reduce(
      (acc, coffee) => {
        acc[coffee.id] = 1
        return acc
      },
      {} as Record<number, number>,
    ),
  )

  function updateQuantity(id: number, newQuantity: number) {
    setQuantities((prev) => ({
      ...prev,
      [id]: newQuantity,
    }))
  }

  return (
    <div className="pt-8">
      <h1 className="font-baloo text-[32px] leading-[130%] font-extrabold">
        Nossos cafés
      </h1>

      <div className="mt-14 grid grid-cols-4 gap-x-8 gap-y-10">
        {coffees.map((item) => (
          <div
            key={item.id}
            className="bg-base-card flex flex-col items-center px-5 pb-5"
            style={{
              borderTopLeftRadius: '6px',
              borderBottomLeftRadius: '36px',
              borderTopRightRadius: '36px',
              borderBottomRightRadius: '6px',
            }}
          >
            <Image
              alt=""
              src={item.img}
              width={120}
              height={120}
              className="relative top-[-10px]"
            />
            <div className="bg-yellow-light flex gap-1 rounded-full px-2 py-1">
              {item.tag.map((tag, index) => (
                <span
                  key={index}
                  className="text-yellow-dark text-[10px] leading-[130%] font-bold"
                >
                  {tag.toUpperCase()}
                </span>
              ))}
            </div>
            <h1 className="font-baloo text-base-subtitle leading[130%] mt-4 text-center text-xl font-bold">
              {item.name}
            </h1>
            <span className="text-base-label text-center text-sm leading-[130%]">
              {item.description}
            </span>

            <div className="mt-8.25 flex items-center gap-2">
              <h3 className="leadgin-[130%] text-base-text text-right text-sm">
                R${' '}
                <span className="font-baloo mr-[15px] text-2xl leading-[130%] font-extrabold">
                  {item.price.toFixed(2)}
                </span>
              </h3>

              <CounterButtons
                onQuantityChange={(newQty) => updateQuantity(item.id, newQty)}
                id={item.id}
                amount={quantities[item.id]}
              />

              <button
                type="button"
                onClick={() =>
                  addToCart({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    img: item.img,
                    quantity: quantities[item.id],
                  })
                }
                className="bg-purple-dark hover:bg-purple-base cursor-pointer rounded-md p-2"
              >
                <ShoppingCartIcon
                  size={22}
                  weight="fill"
                  className="text-base-card"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
