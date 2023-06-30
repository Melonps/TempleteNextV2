import { useMemo } from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Inter } from 'next/font/google'
import CssBaseline from '@mui/material/CssBaseline'
import useMediaQuery from '@mui/material/useMediaQuery'

import Header from '@/components/header'
import Footer from '@/components/footer'

import '../styles/globals.css'

const palette = {
    dark: {
        text: {
            primary: '#fcfffb',
            secondary: '#d6d9e4'
        },
        background: {
            default: '#242424',
            paper: '#2a2a2a'
        },
        primary: {
            main: '#df929b',
            extraDark: '#c06d76',
            dark: '#c76672',
            light: '#ec939d',
            extraLight: '#EBF4FB',
            alpha08: '#0077C714'
        },
        noticeRed: {
            main: '#c06d76',
            dark: '#c8a251',
            light: '#f7d282'
        }
    }
}

const typography = {
    fontFamily: "Inter, 'Noto Sans JP', sans-serif, 'Segoe UI Emoji'",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700
}

const inter = Inter({
    display: 'swap',
    subsets: ['latin']
})

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: 'dark' ? 'dark' : 'light',
                    ...palette.dark
                },
                typography
            }),
        [prefersDarkMode]
    )

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className={`${inter.className} app flex min-h-screen flex-col items-center justify-between p-24`}>
                <Header />
                <Component {...pageProps} />
                <Footer />
            </div>
        </ThemeProvider>
    )
}

export default App
