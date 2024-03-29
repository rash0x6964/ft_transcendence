import React, { ReactElement, useContext, useEffect, useState } from "react";
import MainBtn from "@/components/BaseComponents/MainButton";
import Input from "@/components/BaseComponents/Input";
import AuthBtn from "@/components/BaseComponents/AuthButton";
import { Audiowide } from "next/font/google";
import Lock from "@/components/svgs/Lock";
import Pen from "@/components/svgs/Pen";
import Logo from "@/components/svgs/Logo";
import AuthLayout from "@/UI/AuthLayout";
import { NextPageWithLayout } from "./_app";
import HeadTitle from "@/components/BaseComponents/HeadTitle";
import authService from "@/services/AuthService";
import cookieService from "@/services/CookiesService";
import { useRouter } from "next/navigation";
import { NotifcationContext } from "@/UI/NotificationProvider";
import NotifData from "@/types/NotifData";
import Dialogue from "@/components/Dialogue/Dialogue";
import AuthDialBox from "@/components/BaseComponents/AuthDialBox";
import TFAService from "@/services/TFAService";
import axios from "axios";
import Link from "next/link";
const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const Page: NextPageWithLayout = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [closeDialogue, setCloseDialogue] = useState(true);
  const [token, setTempToken] = useState("");
  const router = useRouter();
  const notify: (data: NotifData) => void = useContext(NotifcationContext);

  const setToken = (access_token: string) => {
    cookieService.setJwtCookie(access_token);
    router.push("/game");
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!(password && username))
      return notify({
        message: "username and password are required",
        title: "Sign In Error",
        type: "error",
      });
    try {
      const { access_token, tempToken } = await authService.signIn({
        username,
        password,
      });
      if (!tempToken) setToken(access_token);
      else {
        setCloseDialogue(false);
        setTempToken(access_token);
      }
    } catch (err: any) {
      notify({
        message: "You have entered an invalid username or password",
        title: "Sign In Error",
        type: "error",
      });
    }
  };

  const handle2FA = async (code: string) => {
    try {
      console.log(code);
      const { access_token } = await TFAService.verify2Fa({ token, code });
      setToken(access_token);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        notify({
          message:
            err.response?.data?.message ??
            "username and email should be unique",
          title: "Validation Error",
          type: "error",
        });
      }
    }
  };

  useEffect(() => {
    if (!cookieService.get2FACookie()) return;
    const infoCookie = cookieService.getInfoCookie();
    cookieService.deleteInfoCookie();
    cookieService.delete2FACookie();
    setCloseDialogue(false);
    setTempToken(infoCookie!);
  }, []);
  return (
    <div className="flex w-fit h-full flex-col gap-7 justify-center align-middle mx-auto">
      <HeadTitle>Pong Fury | Sign in</HeadTitle>
      <Dialogue closed={closeDialogue}>
        <AuthDialBox onClick={handle2FA} />
      </Dialogue>
      <div className="self-center">
        <p className={"text-5xl pb-2 " + audiowide.className}>PONG FURY</p>
        <Logo className="mx-auto w-7 h-7" />
      </div>
      <form>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Username"
            icon={<Pen />}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-big-stone w-[332px] min-w-[300px] h-11"
          />{" "}
          <div className="flex flex-col gap-1">
            <Input
              placeholder="Password"
              icon={<Lock />}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-big-stone w-[332px] min-w-[300px]  h-11"
            />
          </div>
          <MainBtn className="py-3" onClick={handleSubmit} type="submit">
            {" "}
            Sign In
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
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Page;
