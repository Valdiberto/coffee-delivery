'use client'

import { Suspense } from 'react'
import { SuccessContent } from './SuccessContent'

export default function Success() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <SuccessContent />
    </Suspense>
  )
}
