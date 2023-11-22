import Avatar from "@/components/BaseComponents/Avatar"
import { motion } from "framer-motion"
import DialButton from "./DialButton"
import Cross2 from "@/components/svgs/Cross2"
import Check from "@/components/svgs/Check"
import NotificationRow from "./NotificationRow"
import { useContext, useEffect } from "react"
import {
  NotifcationContext,
  NotifciationsContext,
} from "@/UI/NotificationProvider"
import NotifData from "@/types/NotifData"

type Props = {
  boxRef: React.Ref<HTMLDivElement>
}

export default function NotificationBox({ boxRef }: Props) {
  const [notifciations, setNotifications] = useContext(NotifciationsContext)
  const notify = useContext(NotifcationContext)

  return (
    <motion.div
      ref={boxRef}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="w-[35rem] h-1/2 origin-bottom-left gap-4 flex flex-col  drop-shadow-md gradient-border-2 absolute bottom-0 ml-12 pt-3 pl-6 pr-4  rounded-md mb-12 z-50 "
    >
      <div className=" text-gray-500 font-normal  ">Notifications</div>
      <div className="flex flex-col gap-4 overflow-scroll flex-1 ">
        {notifciations.map((notifData, i) => (
          <NotificationRow
            onClick={() =>
              setNotifications((prev: NotifData[]) => {
                prev.splice(i, 1)
                return prev
              })
            }
            onDecline={() =>
              setNotifications((prev: NotifData[]) => [
                ...prev.slice(0, i),
                ...prev.slice(i + 1, prev.length),
              ])
            }
            notifData={notifData}
            key={"notif" + i}
          />
        ))}
      </div>
    </motion.div>
  )
}
