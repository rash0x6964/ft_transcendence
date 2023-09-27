import React from "react"
import MainBtn from "@/components/BaseComponents/MainButton"
import Input from "@/components/BaseComponents/Input"
import AuthBtn from "@/components/BaseComponents/AuthButton"

import { Audiowide } from 'next/font/google'

import Lock from "@/components/svgs/Lock"
import Mail from "@/components/svgs/Mail"
import Pen from "@/components/svgs/Pen"
import Person from "@/components/svgs/Person"
import Logo from "@/components/svgs/Logo"


const audiowide = Audiowide({ weight:"400", subsets:["latin"], display:"swap"})

export default function Page() {
  return (
    <div className="flex w-fit h-full flex-col gap-7 justify-center align-middle mx-auto">
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
        <Input
          placeholder="Username"
          icon={<Person />}
          className="bg-big-stone w-[332px] min-w-[300px]  h-11"
        />{" "}
        <Input
          placeholder="Mail"
          icon={<Mail />}
          className="bg-big-stone w-[332px] min-w-[300px]  h-11"
        />{" "}
        <Input
          placeholder="password"
          icon={<Lock />}
          className="bg-big-stone w-[332px] min-w-[300px]  h-11"
        />
        <MainBtn className="py-3"> Save</MainBtn>
        <div className="flex gap-1 justify-between">
          <span className="w-[143px] h-[1.5px] bg-slate-700 self-center"></span>
          <p className="text-slate-700">OR</p>
          <span className="w-[143px] h-[1.5px] bg-slate-700 self-center"></span>
        </div>
        <div className="flex justify-between">
          <AuthBtn
            provider="42intra"
            className="h-10 w-24 flex justify-center items-center"
          />
          <AuthBtn
            provider="Github"
            className="h-10 w-24 flex justify-center items-center"
          />
          <AuthBtn
            provider="Google"
            className="h-10 w-24 flex justify-center items-center"
          />
        </div>
        <p className="text-sm mx-auto font-light">
          already have an account? <a href="/auth" className="text-primary">Sign in</a>
        </p>
      </div>
    </div>
  )
}
