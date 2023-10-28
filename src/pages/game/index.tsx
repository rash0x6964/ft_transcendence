import { NextPageWithLayout } from "../_app"
import { ReactElement } from "react";
import Layout from "@/UI/Layout";
import UrlPipe from "@/pipes/url.pipe";

const Page: NextPageWithLayout = () => {

	return (
		<div>
			yes
		</div>
	)
}


Page.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			{page}
		</Layout>
	)
}

export default Page
