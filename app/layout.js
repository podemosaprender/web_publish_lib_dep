import '../styles/global.css'; //A: tailwind/NexUI styles
//SEE: https://nextui.org/docs/frameworks/nextjs#add-provider-to-root
import {Providers} from "../lib/providers";

export default function RootLayout({children}) {
  return (
    <html lang="en" suppressHydrationWarning className='dark'>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
