import React from 'react'
import MainButton from '@/components/BaseComponents/MainButton'
import { NextPageWithLayout } from '../_app'
import { ReactElement } from "react";
import Layout from "@/UI/Layout";

const Page: NextPageWithLayout = () => {

  return (
	<div>
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
