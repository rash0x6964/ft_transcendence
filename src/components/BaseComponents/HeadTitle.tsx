import Head from "next/head"
import { PropsWithChildren } from "react"

export default function HeadTitle({children}:PropsWithChildren) {
	return (
		<Head>
			<title>{children}</title>
		</Head>
	)
}
