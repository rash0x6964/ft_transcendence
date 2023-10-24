import React, { ReactElement, useState } from "react"
import MainBtn from "@/components/BaseComponents/MainButton"
import Input from "@/components/BaseComponents/Input"
import AuthBtn from "@/components/BaseComponents/AuthButton"
import { Audiowide } from "next/font/google"
import Lock from "@/components/svgs/Lock"
import Mail from "@/components/svgs/Mail"
import Pen from "@/components/svgs/Pen"
import Person from "@/components/svgs/Person"
import Logo from "@/components/svgs/Logo"
import AuthLayout from "@/UI/AuthLayout"
import { NextPageWithLayout } from "./_app"
import HeadTitle from "@/components/BaseComponents/HeadTitle"
import { object, string } from "yup"
import { signUp } from "@/services/AuthService"
import { setJwtCookie } from "@/services/CookiesService"
import { useRouter } from "next/navigation"

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

const Page: NextPageWithLayout = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setMail] = useState("")
  const [fullname, setFullname] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    let userSchema = object({
      username: string().min(3).max(20).required(),
      fullname: string().min(3).max(20).required(),
      email: string().email().required(),
      password: string().min(10).required(),
    })
    let parsedUser
    try {
      parsedUser = userSchema.validateSync(
        {
          username,
          email,
          password,
          fullname,
        },
        { strict: true }
      )
    } catch (err) {
      console.log(err)
      return
    }
    try {
      const { access_token } = await signUp(parsedUser)
      setJwtCookie(access_token)
      router.push("/")
    } catch (err: any) {
      console.log(err.response.data)
    }
  }

  return (
    <div className="flex w-fit h-full flex-col gap-7 justify-center align-middle mx-auto">
      <HeadTitle>Pong Fury | Sign up</HeadTitle>

      <div className="self-center">
        <p className={"text-5xl pb-2 " + audiowide.className}>PONG FURY</p>
        <Logo className="mx-auto w-7 h-7" />
      </div>
      <form>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Full name"
            icon={<Pen />}
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="bg-big-stone w-[332px] min-w-[300px] h-11"
          />{" "}
          <Input
            placeholder="Username"
            icon={<Person />}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-big-stone w-[332px] min-w-[300px]  h-11"
          />{" "}
          <Input
            placeholder="Mail"
            icon={<Mail />}
            type="mail"
            value={email}
            onChange={(e) => setMail(e.target.value)}
            className="bg-big-stone w-[332px] min-w-[300px]  h-11"
          />{" "}
          <Input
            placeholder="Password"
            icon={<Lock />}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-big-stone w-[332px] min-w-[300px]  h-11"
          />
          <MainBtn className="py-3" onClick={handleSubmit} type="submit">
            {" "}
            Sign Up
          </MainBtn>
          <div className="flex gap-1 justify-between">
            <span className="w-[143px] h-[1.5px] bg-slate-700 self-center"></span>
            <p className="text-slate-700">OR</p>
            <span className="w-[143px] h-[1.5px] bg-slate-700 self-center"></span>
          </div>
          <div className="flex justify-between">
            <AuthBtn
              provider="fortytwo"
              link={true}
              className="h-10 w-24 flex justify-center items-center"
            />
            <AuthBtn
              provider="github"
              link={true}
              className="h-10 w-24 flex justify-center items-center"
            />
            <AuthBtn
              provider="google"
              link={true}
              className="h-10 w-24 flex justify-center items-center"
            />
          </div>
          <p className="text-sm mx-auto font-light">
            already have an account?{" "}
            <a href="/signin" className="text-primary">
              Sign in
            </a>
          </p>
        </div>
      </form>
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>
}

export default Page
