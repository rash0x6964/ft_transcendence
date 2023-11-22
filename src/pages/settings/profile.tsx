import Pen from "@/components/svgs/Pen"
import Input from "@/components/BaseComponents/Input"
import Mail from "@/components/svgs/Mail"
import Person from "@/components/svgs/Person"
import MainButton from "@/components/BaseComponents/MainButton"
import Avatar from "@/components/BaseComponents/Avatar"
import Change from "@/UI/settings/icons/Change"
import { NextPageWithLayout } from "../_app"
import SettingLayout from "@/UI/SettingLayout"
import { ReactElement, useContext, useEffect, useState } from "react"
import HeadTitle from "@/components/BaseComponents/HeadTitle"
import { ValidationError, object, string } from "yup"
import userService from "@/services/UsersService"
import env from "@/environment/environment"
import Image from "next/image"
import { User } from "@/types/User"
import { NotifcationContext } from "@/UI/NotificationProvider"
import NotifData from "@/types/NotifData"
import axios from "axios"

const Page: NextPageWithLayout = () => {
  const notify: (data: NotifData) => void = useContext(NotifcationContext)
  const [username, setUsername] = useState<string>("")
  const [email, setMail] = useState<string>("")
  const [fullname, setFullname] = useState<string>("")
  const [user, setUser] = useState<User>()
  const [fallback, setFallback] = useState<boolean>(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    let userSchema = object({
      userName: string().min(3).max(60),
      fullName: string().min(3).max(60),
      email: string().email(),
    })
    let parsedUser
    try {
      parsedUser = userSchema.validateSync(
        {
          userName: username,
          email,
          fullName: fullname,
        },
        { strict: true }
      )
    } catch (err) {
      if (err instanceof ValidationError) {
        notify({
          message: err.errors[0],
          title: "Validation Error",
          type: "error",
        })
      }
      return
    }
    try {
      const user = await userService.update(parsedUser)
      setUser(user)
      setFullname(user.fullName)
      setUsername(user.userName)
      setMail(user.email)
      setFallback(false)
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

  const updatePhoto = (url: string, type: string) => {
    if (type == "banners") return userService.update({ bannerUrl: url })
    else return userService.update({ avatarUrl: url })
  }

  const onFileChange = async (e: any) => {
    if (!e.target.files[0]) return
    const formdata = new FormData()
    formdata.append("photo", e.target.files[0], e.target.files[0].name)
    try {
      const res = await userService.uploadPhoto(formdata, e.target.name)
      const user = await updatePhoto(res[0].url, e.target.name)
      setUser(user)
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
    try {
      const currentUser: User = await userService.getCurrent()
      setUser(currentUser)
      setFullname(currentUser.fullName)
      setUsername(currentUser.userName)
      setMail(currentUser.email)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    try {
      getUser()
    } catch (err) {
      console.log(err)
    }
  }, [])
  return (
    <div className="bg-secondary rounded-xl gradient-border-2 drop-shadow-md">
      <HeadTitle>Setting | Profile</HeadTitle>

      <p className="text-base p-5">Profile</p>
      <div className="relative">
        <Image
          width={680}
          height={128}
          src={user?.bannerUrl ?? env.defaultBanner}
          alt=""
          className="w-[680px] h-32  object-cover  mx-auto rounded-xl border-2"
        />
        <div className="relative -top-3 left-[735px] w-[22px] h-[22px] hover:opacity-75 transition-colors ">
          <Change className="" />
          <input
            type="file"
            className="max-w-full max-h-full -translate-y-full opacity-0 cursor-pointer"
            accept="image/png, image/jpeg"
            onChange={onFileChange}
            name="banners"
          ></input>
        </div>
        <div className=" absolute top-10 left-10">
          <Avatar
            src={user?.avatarUrl ?? env.defaultAvatar}
            alt="W3Schools.com"
            className="w-28 h-28 rounded-full relative border-2"
          />
          <div className="relative -top-7 left-20 w-[22px] h-[22px] hover:opacity-75 transition-colors ">
            <Change className="" />
            <input
              type="file"
              className="max-w-full max-h-full -translate-y-full opacity-0 cursor-pointer"
              accept="image/png, image/jpeg"
              onChange={onFileChange}
              name="avatars"
            ></input>
          </div>
        </div>
      </div>
      <form>
        <div className="mt-2">
          <p className="text-base p-5">User Details</p>
          <div className="flex justify-center flex-wrap gap-x-7 gap-y-4">
            <Input
              placeholder="Full name"
              icon={<Pen />}
              value={fullname ?? ""}
              onChange={(e) => setFullname(e.target.value)}
              className="bg-big-stone w-[332px] min-w-[300px] h-11  "
            />
            <Input
              placeholder="Username"
              icon={<Person />}
              value={username ?? ""}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-big-stone w-[332px] min-w-[300px]  h-11"
            />
            <Input
              placeholder="Mail"
              icon={<Mail />}
              value={email ?? ""}
              onChange={(e) => setMail(e.target.value)}
              className="w-[332px] min-w-[300px]  bg-big-stone  h-11"
            />
            <div className="w-[332px] min-w-[300px]"></div>
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
      </form>
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <SettingLayout>{page}</SettingLayout>
}

export default Page
