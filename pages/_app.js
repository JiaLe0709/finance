import '@/styles/globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Navbar from "@/components/Home/navbar";

export default function App({ Component, pageProps }) {

  console.log('Repo: https://github.com/jiale0709/finance')

  return (
    <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
      <Navbar />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
