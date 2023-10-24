import type { ReactElement } from 'react'
import { NextPageWithLayout } from '@/pages/_app'
import Layout from '@/UI/Layout'
import Head from 'next/head'
const Page: NextPageWithLayout = () => {
	return <p>hello world</p>
}

Page.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			<Head>
				<title>Pong Fury</title>
			</Head>
			{page}
		</Layout>
	)
}

export default Page
