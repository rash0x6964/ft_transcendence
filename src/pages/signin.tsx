import React, { ReactElement } from "react"
import MainBtn from "@/components/BaseComponents/MainButton"
import Input from "@/components/BaseComponents/Input"
import AuthBtn from "@/components/BaseComponents/AuthButton"
import { Audiowide } from "next/font/google"
import Lock from "@/components/svgs/Lock"
import Pen from "@/components/svgs/Pen"
import Logo from "@/components/svgs/Logo"
import AuthLayout from "@/UI/AuthLayout"
import { NextPageWithLayout } from "./_app"
import HeadTitle from "@/components/BaseComponents/HeadTitle"
const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

const Page: NextPageWithLayout = () => {

  return (
    <div className="flex w-fit h-full flex-col gap-7 justify-center align-middle mx-auto">
		<HeadTitle>Pong Fury | Sign in</HeadTitle>
      <div className="self-center">
        <p className={"text-5xl pb-2 " + audiowide.className}>PONG FURY</p>
        <Logo className="mx-auto w-7 h-7" />
      </div>
      <div className="flex flex-col gap-4">
        <Input
          placeholder="Full name"
          icon={<Pen />}
          className="bg-big-stone w-[332px] min-w-[300px] h-11"
        />{" "}
        <div className="flex flex-col gap-1">
          <Input
            placeholder="password"
            icon={<Lock />}
            className="bg-big-stone w-[332px] min-w-[300px]  h-11"
          />
          <a className="font-light self-end text-[10px] text-primary" href="">Forgot password?</a>
        </div>
        <MainBtn className="py-3"> Save</MainBtn>
        <div className="flex gap-1 justify-between">
          <span className="w-[143px] h-[1.5px] bg-slate-700 self-center"></span>
          <p className="text-slate-700">OR</p>
          <span className="w-[143px] h-[1.5px] bg-slate-700 self-center"></span>
        </div>
        <div className="flex justify-between">
          <AuthBtn
            provider="fortytwo"
            className="h-10 w-24 flex justify-center items-center"
          />
          <AuthBtn
            provider="github"
            className="h-10 w-24 flex justify-center items-center"
          />
          <AuthBtn
            provider="google"
            className="h-10 w-24 flex justify-center items-center"
          />
        </div>
        <p className="text-sm mx-auto font-light">
          Don&apos;t have an account? <a href="/singUp" className="text-primary">Sign up</a>
        </p>
      </div>
    </div>
  )
}


Page.getLayout = function getLayout(page: ReactElement) {
	return (
		<AuthLayout>
			{page}
		</AuthLayout>
	)
}

export default Page
