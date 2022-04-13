import '../styles/globals.css'
import { CssBaseline, ThemeProvider } from "@mui/material"
import { lightTheme } from "../themes/light-theme"
import { UiProvider } from "../context/ui/UiProvider"
import { AuthProvider } from "../context/auth/AuthProvider"
import { EntryProvider } from "../context/entry/EntryProvider"

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <EntryProvider>
        <UiProvider>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UiProvider>
      </EntryProvider>
    </AuthProvider>
  )
}

export default MyApp