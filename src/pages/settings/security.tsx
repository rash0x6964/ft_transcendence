import LinkedAccounts from "@/UI/settings/security/LinkedAccounts"
import PasswordForm from "@/UI/settings/security/PasswordForm"
import React, { ReactElement } from "react"
import { NextPageWithLayout } from "../_app"
import SettingLayout from "@/UI/SettingLayout"
import HeadTitle from "@/components/BaseComponents/HeadTitle"


const Page: NextPageWithLayout = () => {
  return (
    <>
		<HeadTitle>Setting | Security</HeadTitle>

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
