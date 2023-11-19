import { ReactNode } from "react"
import Unfriend from "../svgs/Unfriend"
import Mail from "../svgs/Mail"
import Swords from "../svgs/Swords"
import Sword from "../svgs/Sword"

type Props = {
  onClick?: () => void
  action: "Unfriend" | "Challenge" | "Message"
}

export default function MiniProfileButtons({ onClick, action }: Props) {
  return (
    <div
      className="flex flex-col gap-y-2 hover:opacity-75 duration-500 hover:text-gray-300"
      onClick={onClick}
    >
      <div className="h-14 w-14 rounded-xl border border-gray-600 flex justify-center items-center cursor-pointer">
        {action == "Unfriend" && <Unfriend />}
        {action == "Message" && <Mail />}
        {action == "Challenge" && (
          <Sword className="text-white" width={24} height={24} />
        )}
      </div>
      <p className="text-xs text-gray-500 self-center">{action}</p>
    </div>
  )
}
