import '../styles/global.css'; //A: tailwind/NexUI styles
//SEE: https://nextui.org/docs/frameworks/nextjs#add-provider-to-root
import {Providers} from "../lib/providers";

export default function RootLayout({children}) {
  return (
    <html lang="en" className='dark'>
      <body>
				<p>Hola</p>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

console.log("ROOT LAYOUT")
