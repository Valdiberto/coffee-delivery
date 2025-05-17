'use client'

import { InputHTMLAttributes } from 'react'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  optional?: boolean
  className?: string
}

export function TextInput({
  optional = false,
  className,
  ...props
}: TextInputProps) {
  return (
    <div
      className={`${className} focus-within:ring-yellow-dark ring-base-button bg-base-input border-base-button itemscenter relative flex justify-between rounded-sm border p-3 ring-1`}
    >
      <input
        className="peer text-base-text placeholder:text-base-label w-full outline-none"
        {...props}
      />
      {optional && (
        <span className="text-base-label absolute top-1/2 right-3 -translate-y-1/2 italic peer-focus:hidden peer-[&:not(:placeholder-shown)]:hidden">
          Opcional
        </span>
      )}
    </div>
  )
}
