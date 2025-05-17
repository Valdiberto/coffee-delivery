'use client'

import { CoffeeList } from '@/components/CoffeeList'
import { ItemIcon } from '@/components/ItemIcon'
import {
  CoffeeIcon,
  PackageIcon,
  ShoppingCartIcon,
  TimerIcon,
} from '@phosphor-icons/react'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <div className="mb-3.5 flex justify-between gap-14 py-23">
        <div className="flex flex-col">
          <div className="flex flex-col gap-4">
            <h1 className="font-baloo text-base-title text-5xl leading-[130%] font-extrabold">
              Encontre o café perfeito para qualquer hora do dia
            </h1>
            <h2 className="text-base-subtitle text-xl leading-[130%]">
              Com o Coffee Delivery você recebe seu café onde estiver, a
              qualquer hora
            </h2>
          </div>

          <div className="text-base-text mt-16 grid grid-cols-2 gap-5 leading-[160%]">
            <div className="flex items-center gap-3">
              <ItemIcon
                icon={ShoppingCartIcon}
                weight="fill"
                bgColor="bg-yellow-dark"
              />
              <span>Compra simples e segura</span>
            </div>

            <div className="flex items-center gap-3">
              <ItemIcon
                icon={PackageIcon}
                weight="fill"
                bgColor="bg-base-text"
              />
              <span className="text-nowrap">
                Embalagem mantém o café intacto
              </span>
            </div>

            <div className="flex items-center gap-3">
              <ItemIcon
                icon={TimerIcon}
                weight="fill"
                bgColor="bg-yellow-base"
              />
              <span>Entrega rápida e rastreada</span>
            </div>

            <div className="flex items-center gap-3">
              <ItemIcon
                icon={CoffeeIcon}
                weight="fill"
                bgColor="bg-purple-base"
              />
              <span className="text-nowrap">
                O café chega fresquinho até você
              </span>
            </div>
          </div>
        </div>
        <div className="h-[360] w-[476]">
          <Image
            src="/images/IntroCoffe.png"
            alt="Intro Coffe"
            width={476}
            height={360}
            className="max-w-fit object-cover"
          />
        </div>
      </div>

      <CoffeeList />
    </>
  )
}
