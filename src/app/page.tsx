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
      <div className="mt-2 grid-cols-1 gap-14 lg:mb-3.5 lg:flex lg:w-full lg:justify-between lg:py-23">
        <Image
          src="/images/bg-intro.png"
          alt="background"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          width={1920}
          height={400}
          priority
        />

        <div className="flex flex-col">
          <div className="flex flex-col gap-4">
            <h1 className="font-baloo text-base-title text-3xl leading-[130%] font-extrabold lg:text-5xl">
              Encontre o café perfeito para qualquer hora do dia
            </h1>
            <h2 className="text-base-subtitle text-lg lg:text-xl">
              Com o Coffee Delivery você recebe seu café onde estiver, a
              qualquer hora
            </h2>
          </div>

          <div className="text-base-text mt-8 grid grid-cols-1 gap-5 lg:mt-16 lg:grid-cols-2">
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
        <div className="mt-6 w-[340px]">
          <Image
            src="/images/IntroCoffe.png"
            alt="Intro Coffe"
            width={476}
            height={360}
            className="lg:max-w-fit lg:object-cover"
          />
        </div>
      </div>

      <CoffeeList />
    </>
  )
}
