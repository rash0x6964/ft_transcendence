import LinkedAccounts from "@/UI/settings/security/LinkedAccounts"
import PasswordForm from "@/UI/settings/security/PasswordForm"
import React, { ReactElement } from "react"
import { NextPageWithLayout } from "../_app"
import SettingLayout from "@/UI/SettingLayout"


const Page: NextPageWithLayout = () => {
  return (
    <>
      <PasswordForm />
      <LinkedAccounts />
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
	return (
		<SettingLayout>
			{page}
		</SettingLayout>
	)
}

export default Page
