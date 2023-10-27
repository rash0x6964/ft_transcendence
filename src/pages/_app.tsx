import { createContext, useEffect, useMemo, type ReactElement, type ReactNode, useState } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import "@/globals.css"
import 'animate.css';

import dynamic from 'next/dynamic'
import WebSocketContextProvider from '@/UI/WebSocketContextWrapper'
import io from 'socket.io-client'
import NotificationProvider from '@/UI/NotificationProvider';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	// const [socket,setSocket] = useState(null)


	// Use the layout defined at the page level, if available
	const getLayout = Component.getLayout ?? ((page) => page)

	return (
		<NotificationProvider>
			{getLayout(<Component {...pageProps} />)}
		</NotificationProvider>


	)
}


export default dynamic(() => Promise.resolve(MyApp), {
	ssr: false,
})
