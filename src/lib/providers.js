//INFO: control all context providers from here

'use client'

import * as React from "react";
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes' //SEE: https://github.com/pacocoursey/next-themes

export function Providers({themeProps, children}) {
  return (
    <NextUIProvider>
			<ThemeProvider attribute="class" {...themeProps}>
	      {children}
			</ThemeProvider>
    </NextUIProvider>
  )
}
