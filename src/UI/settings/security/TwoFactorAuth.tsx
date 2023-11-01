import { NotifcationContext } from "@/UI/NotificationProvider"
import SectionTitle from "@/UI/game/profile/SectionTitle"
import AuthButton from "@/components/BaseComponents/AuthButton"
import MainButton from "@/components/BaseComponents/MainButton"
import Dialogue from "@/components/Dialogue/Dialogue"
import TFAService from "@/services/TFAService"
import NotifData from "@/types/NotifData"
import axios from "axios"
import { useContext, useState } from "react"

type Props = {
  has2FA: boolean
  setHas2FA: (state: boolean) => void
}

export default function TwoFactorAuth({ has2FA, setHas2FA }: Props) {
  const [closed, setClosed] = useState<boolean>(true)
  const [src, setSrc] = useState<string>("")
  const notify: (data: NotifData) => void = useContext(NotifcationContext)

  const enable2FA = async () => {
    try {
      const image = await TFAService.activate2FA()
      setSrc(image)
      setClosed(false)
      setHas2FA(true)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        notify({
          message: "Something went wrong",
          title: " Error",
          type: "notice",
        })
      }
    }
  }

  const disable2FA = async () => {
    try {
      await TFAService.deactivate2FA()
      setHas2FA(false)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        notify({
          message: "Something went wrong",
          title: " Error",
          type: "notice",
        })
      }
    }
  }

  return (
    <>
      <Dialogue onBackDropClick={() => setClosed(true)} closed={closed}>
        <div className="gradient-border-2 p-4  min-w-[29rem]  overflow-y-scroll rounded-xl flex flex-col gap-1">
          <SectionTitle className="pl-0 text-sm" text="Scan QR code" />
          <img className="border-2 border-indigo-600" src={src} />
        </div>
      </Dialogue>

      <div className="bg-secondary rounded-xl gradient-border-2 ">
        <p className="text-base p-5">2FA</p>
        <div className="flex justify-between mx-8 mb-4 ">
          <AuthButton
            provider="googleAuth"
            className="h-10 w-24 flex justify-center items-center"
          />
          <MainButton
            className="w-32 py-3"
            onClick={has2FA ? disable2FA : enable2FA}
          >
            {has2FA ? "Deactivate" : "Activate"}
          </MainButton>
        </div>
      </div>
    </>
  )
}
function notify(arg0: { message: any; title: string; type: string }) {
  throw new Error("Function not implemented.")
}
