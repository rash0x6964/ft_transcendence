import LinkedAccounts from "@/UI/settings/security/LinkedAccounts"
import PasswordForm from "@/UI/settings/security/PasswordForm"
import TwoFactorAuth from "@/UI/settings/security/TwoFactorAuth"
import { ReactElement, useEffect, useState } from "react"
import { NextPageWithLayout } from "../_app"
import SettingLayout from "@/UI/SettingLayout"
import HeadTitle from "@/components/BaseComponents/HeadTitle"
import User from "@/models/User.model"
import userService from "@/services/UsersService"

const Page: NextPageWithLayout = () => {
  const [hasPassword, setHasPassword] = useState<boolean>(false)
  const [has2FA, setHas2FA] = useState<boolean>(false)

  const getUser = async () => {
    const userData: User = await userService.getCurrent()
    setHasPassword(userData.password)
    setHas2FA(userData.twoFactorAuthEnabled)
  }

  useEffect(() => {
    try {
      getUser()
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <>
      <HeadTitle>Setting | Security</HeadTitle>
      <PasswordForm hasPassword={hasPassword} setHasPassword={setHasPassword} />
      <LinkedAccounts />
      <TwoFactorAuth has2FA={has2FA} setHas2FA={setHas2FA} />
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <SettingLayout>{page}</SettingLayout>
}

export default Page
