import "@/styles/globals.css"

import type { AppProps } from "next/app"
import Head from "next/head"

import { RobotoMono } from "@/lib/fonts"
import { tw } from "@/lib/utils/cssTools"

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0"
				/>
			</Head>
			<div className={tw(RobotoMono.variable, "font-roboto-mono")}>
				<Component {...pageProps} />
			</div>
		</>
	)
}
