import Avatar from "@/components/BaseComponents/Avatar"
import { motion } from "framer-motion"
import DialButton from "./DialButton"
import Cross2 from "@/components/svgs/Cross2"
import Check from "@/components/svgs/Check"
import NotificationRow from "./NotificationRow"

export default function NotificationBox() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="w-[40rem] h-1/2 origin-bottom-left flex flex-col  drop-shadow-md gradient-border-2 absolute bottom-0 ml-14 pt-3 pl-6 pr-4  rounded-md mb-24 z-50 "
    >
      <div className=" text-gray-500 font-normal mb-8 ">Notifications</div>
      <div className="flex flex-col gap-4 overflow-scroll flex-1">
        <NotificationRow />
        <NotificationRow />
        <NotificationRow />
        <NotificationRow />
        <NotificationRow />
        <NotificationRow />
        <NotificationRow />
        <NotificationRow />
        <NotificationRow />
        <NotificationRow />
        <NotificationRow />
      </div>
    </motion.div>
  )
}
