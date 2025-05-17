import { ElementType } from 'react'
import { IconProps } from '@phosphor-icons/react'

export interface ItemIconProps extends IconProps {
  icon: ElementType<IconProps>
  bgColor: string
}

export function ItemIcon({ icon: Icon, bgColor, ...props }: ItemIconProps) {
  return (
    <div className={`flex h-8 w-8 rounded-full p-2 ${bgColor}`}>
      <Icon className="text-base-background" {...props} />
    </div>
  )
}
