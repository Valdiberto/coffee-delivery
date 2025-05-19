'use client'

import { ItemIcon } from '@/components/ItemIcon'
import { paymentMethodLabels, PaymentMethod } from '@/types/payment'
import {
  CurrencyDollarIcon,
  MapPinIcon,
  TimerIcon,
} from '@phosphor-icons/react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

export function SuccessContent() {
  const params = useSearchParams()

  const rua = params.get('rua')
  const numero = params.get('numero')
  const bairro = params.get('bairro')
  const cidade = params.get('cidade')
  const uf = params.get('uf')

  const rawPayment = params.get('pagamento') as PaymentMethod
  const pagamento = paymentMethodLabels[rawPayment]

  return (
    <div className="flex-row lg:flex lg:justify-between">
      <div>
        <div>
          <h1 className="font-baloo text-yellow-dark text-3xl font-extrabold">
            Uhu! Pedido confirmado
          </h1>
          <p className="text-base-subtitle text-xl">
            Agora é só aguardar que logo o café chegará até você
          </p>
        </div>

        <div className="mt-10 rounded-tl-md rounded-tr-[36px] rounded-br-md rounded-bl-[36px] bg-gradient-to-br from-yellow-500 via-yellow-700 to-purple-500 p-[1px]">
          <div className="bg-base-background flex flex-col gap-8 rounded-tl-md rounded-tr-[36px] rounded-br-md rounded-bl-[36px] p-10">
            <div className="flex gap-3">
              <div className="flex items-center">
                <ItemIcon
                  bgColor="bg-purple-base"
                  icon={MapPinIcon}
                  weight="fill"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base-text">
                  Entrega em <strong>{`${rua}, ${numero}`}</strong>{' '}
                </span>
                <span>{`${bairro} - ${cidade}, ${uf}`}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex items-center">
                <ItemIcon
                  bgColor="bg-yellow-base"
                  icon={TimerIcon}
                  weight="fill"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base-text">Previsão de entrega</span>
                <span>
                  <strong>20 min - 30 min</strong>
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex items-center">
                <ItemIcon
                  bgColor="bg-yellow-dark"
                  icon={CurrencyDollarIcon}
                  weight="fill"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base-text">Pagamento na entrega</span>
                <span>
                  <strong>{pagamento}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-end">
        <Image src="/images/Illustration.svg" height={293} width={492} alt="" />
      </div>
    </div>
  )
}
