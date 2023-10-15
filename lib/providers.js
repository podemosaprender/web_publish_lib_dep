'use client'

import {NextUIProvider} from '@nextui-org/react'

export function Providers({children}) {
  return (
    <NextUIProvider>
			<p>NextUIProvider XXX</p>
      {children}
    </NextUIProvider>
  )
}
