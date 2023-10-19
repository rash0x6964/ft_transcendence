import type { ReactElement } from 'react'
import { NextPageWithLayout } from '@/pages/_app'
import Layout from '@/UI/Layout'
const Page: NextPageWithLayout = () => {
	return <p>hello world</p>
}

Page.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			{page}
		</Layout>
	)
}

export default Page
