import React, { useContext, useEffect, useState } from "react"
import Lock from "../../../components/svgs/Lock"
import Input from "@/components/BaseComponents/Input"
import MainButton from "@/components/BaseComponents/MainButton"
import userService from "@/services/UsersService"
import NotifData from "@/types/NotifData"
import { NotifcationContext } from "@/UI/NotificationProvider"
import axios from "axios"
import env from "@/environment/environment"
import { User } from "@/types/User"

export default function PasswordForm() {
  const [password, setPassword] = useState<string>("")
  const [newPassword, setNewPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [user, setUser] = useState<User>({
    avatarUrl: env.defaultAvatar,
    bannerUrl: env.defaultBanner,
    fullName: "fullname",
    email: "email",
    id: "0",
    userName: "username",
    password: false,
  })

  const notify: (data: NotifData) => void = useContext(NotifcationContext)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if ((user.password && !password) || !newPassword) return
    if (newPassword !== confirmPassword)
      return notify({
        message: "new password is not matching",
        title: "Validation Error",
        type: "error",
      })
    try {
      await userService.updatePassword({ password, newPassword })
      setUser({ ...user, password: true })
    } catch (err) {
      if (axios.isAxiosError(err)) {
        notify({
          message: err.response?.data?.message,
          title: "Validation Error",
          type: "error",
        })
      }
    }
  }
  const getUser = async () => {
    const userData: User = await userService.getCurrent()
    setUser(userData)
  }

  useEffect(() => {
    try {
      getUser()
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <div className="bg-secondary rounded-xl gradient-border-2 ">
      <p className="text-base p-5">Change Password</p>
      <div className="px-10 py-3">
        {user.password && (
          <Input
            placeholder="Current Password"
            icon={<Lock />}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-big-stone w-[332px] min-w-[300px]  h-11"
          />
        )}
        <Input
          placeholder="New Password"
          icon={<Lock />}
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="bg-big-stone w-[332px] min-w-[300px] my-4 h-11"
        />
        <Input
          placeholder="Confirm Password"
          icon={<Lock />}
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="bg-big-stone w-[332px] min-w-[300px]  h-11"
        />
      </div>
      <div className="flex justify-end mt-5">
        <MainButton
          className="w-32 py-3 mb-5 mr-7"
          type="submit"
          onClick={handleSubmit}
        >
          {" "}
          Save
        </MainButton>
      </div>
    </div>
  )
}
