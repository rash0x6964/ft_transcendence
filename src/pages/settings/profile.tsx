import Pen from "@/components/svgs/Pen"
import Input from "@/components/BaseComponents/Input"
import Mail from "@/components/svgs/Mail"
import Person from "@/components/svgs/Person"
import MainButton from "@/components/BaseComponents/MainButton"
import Avatar from "@/components/BaseComponents/Avatar"
import Change from "@/UI/settings/icons/Change"
import { NextPageWithLayout } from "../_app"
import SettingLayout from "@/UI/SettingLayout"
import { ReactElement, useEffect, useState } from "react"
import HeadTitle from "@/components/BaseComponents/HeadTitle"
import { object, string } from "yup"
import { getCurrent, update, uploadPhoto } from "@/services/UsersService"
import env from "@/environment/environment"
import Image from "next/image"
import { User } from "@/types/User"

const Page: NextPageWithLayout = () => {
  const [username, setUsername] = useState<string>("")
  const [email, setMail] = useState<string>("")
  const [fullname, setFullname] = useState<string>("")
  const [user, setUser] = useState<User>()
  const [fallback, setFallback] = useState<boolean>(false)
  const [fallbackAvatar, setFallbackAvatar] = useState<boolean>(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    let userSchema = object({
      userName: string().min(3).max(20),
      fullName: string().min(3).max(20),
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
      console.log(err)
      return
    }
    try {
      console.log(parsedUser)
      const user = await update(parsedUser)
      setUser(user)
      setFullname(user.fullName)
      setUsername(user.userName)
      setMail(user.email)
      setFallback(false)
      setFallbackAvatar(false)
    } catch (err) {
      console.log(err)
    }
  }

  const updatePhoto = (url: string, type: string) => {
    console.log("url :", url)
    if (type == "banners") return update({ bannerUrl: url })
    else return update({ avatarUrl: url })
  }

  const onFileChange = async (e: any) => {
    if (!e.target.files[0]) return
    const formdata = new FormData()
    formdata.append("photo", e.target.files[0], e.target.files[0].name)
    try {
      const res = await uploadPhoto(formdata, e.target.name)
      const user = await updatePhoto(res[0].url, e.target.name)
      setUser(user)
      setFallback(false)
      setFallbackAvatar(false)
    } catch (err) {
      console.log(err)
    }
  }
  const getUser = async () => {
    const currentUser: User = await getCurrent()
    setUser(currentUser)
    setFullname(currentUser.fullName)
    setUsername(currentUser.userName)
    setMail(currentUser.email)
  }
  const reloadBanner = (e) => {
    if (fallback || !user) return
    setTimeout(() => {
      e.target.src = `${env.endPoint}${user.bannerUrl}`
    }, 200)
    setFallback(true)
  }

  const reloadAvatar = (e) => {
    if (fallbackAvatar || !user) return
    setTimeout(() => {
      e.target.src = `${env.endPoint}${user.avatarUrl}`
    }, 200)
    setFallbackAvatar(true)
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
          src={
            user
              ? `${env.endPoint}/${user.bannerUrl}`
              : "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"
          }
          alt="W3Schools.com"
          className="w-[680px] h-32  object-cover  mx-auto rounded-xl border-2"
          onError={reloadBanner}
        />
        <div className="relative -top-3 left-[735px] w-[22px] h-[22px]">
          <Change className="cursor-pointer" />
          <input
            type="file"
            className="max-w-full max-h-full -translate-y-full opacity-0"
            accept="image/png, image/jpeg"
            onChange={onFileChange}
            name="banners"
          ></input>
        </div>
        <div className=" absolute top-10 left-10">
          <Avatar
            src={
              user
                ? `${env.endPoint}/${user.avatarUrl}`
                : "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"
            }
            alt="W3Schools.com"
            className="w-28 h-28 rounded-full relative border-2"
            OnError={reloadAvatar}
          />
          <div className="relative -top-7 left-20 w-[22px] h-[22px] ">
            <Change className="cursor-pointer" />
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
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="bg-big-stone w-[332px] min-w-[300px] h-11  "
            />
            <Input
              placeholder="Username"
              icon={<Person />}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-big-stone w-[332px] min-w-[300px]  h-11"
            />
            <Input
              placeholder="Mail"
              icon={<Mail />}
              value={email ? email : ""}
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
