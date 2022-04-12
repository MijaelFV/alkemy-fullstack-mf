import '../styles/globals.css'
import { CssBaseline, ThemeProvider } from "@mui/material"
import { lightTheme } from "../themes/light-theme"
import { UiProvider } from "../context/ui/UiProvider"
import { AuthProvider } from "../context/auth/AuthProvider"

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <UiProvider>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UiProvider>
    </AuthProvider>
  )
}

export default MyApp