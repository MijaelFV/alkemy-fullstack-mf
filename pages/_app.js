import '../styles/globals.css'
import { CssBaseline, ThemeProvider } from "@mui/material"
import { lightTheme } from "../themes/light-theme"
import { UiProvider } from "../context/ui/UiProvider"

function MyApp({ Component, pageProps }) {
  return (
    <UiProvider>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </UiProvider>
  )
}

export default MyApp