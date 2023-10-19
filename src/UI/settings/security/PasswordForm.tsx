import React from "react"
import Lock from "../../../components/svgs/Lock"
import Input from "@/components/BaseComponents/Input"
import MainButton from "@/components/BaseComponents/MainButton"

export default function PasswordForm() {
  return (
    <div className="bg-secondary rounded-xl gradient-border-2 ">
      <p className="text-base p-5">Change Password</p>
      <div className="px-10 py-3">
        <Input
          placeholder="Current Password"
          icon={<Lock />}
          className="bg-big-stone w-[332px] min-w-[300px]  h-11"
        />
        <Input
          placeholder="New Password"
          icon={<Lock />}
          className="bg-big-stone w-[332px] min-w-[300px] my-4 h-11"
        />
        <Input
          placeholder="Confirm Password"
          icon={<Lock />}
          className="bg-big-stone w-[332px] min-w-[300px]  h-11"
        />
      </div>
      <div className="flex justify-end mt-5">
        <MainButton className="w-32 py-3 mb-5 mr-7"> Save</MainButton>
      </div>
    </div>
  )
}
