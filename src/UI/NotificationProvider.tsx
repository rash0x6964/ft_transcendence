import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react"
import Notification from "@/components/BaseComponents/Notification"
import NotifData from "@/types/NotifData"

export const NotifcationContext = createContext<
  (data: NotifData, insert?: boolean) => void | null
>(() => {})

export const NotifciationsContext = createContext<[NotifData[], any]>([
  [],
  null,
])

export default function NotificationProvider({ children }: PropsWithChildren) {
  const defaultObj: NotifData = {
    message: "wow",
    title: "xD",
  }

  const notifTime = 3000
  const [notifications, setNotifications] = useState<NotifData[]>([])
  const [notification, setNotication] = useState<NotifData>(defaultObj)
  const [styleData, setStyleData] = useState("-bottom-64")
  const [queuedNotif, setQueueNotification] = useState(0)
  const notify = (data: NotifData, insert = false) => {
    if (insert)
      setNotifications((prevNotifs) =>
        prevNotifs.concat({ createdAt: Date.now(), ...data })
      )
    if (queuedNotif > 0) {
      setTimeout(() => {
        setNotication(data)
        setQueueNotification((prevState) => prevState - 1)
      }, notifTime * queuedNotif + 1000)

      setQueueNotification((prevState) => prevState + 1)
    } else setNotication(data)
  }
  useEffect(() => {
    if (notification == defaultObj) return
    setQueueNotification((prevState) => prevState + 1)
    setStyleData("-bottom-0")
    let timeout = setTimeout(() => {
      setStyleData("-bottom-64")
      setQueueNotification((prevState) => prevState - 1)
    }, notifTime)
    return () => {
      clearTimeout(timeout)
    }
  }, [notification])

  return (
    <NotifcationContext.Provider value={notify}>
      <NotifciationsContext.Provider value={[notifications, setNotifications]}>
        <Notification
          onClick={() => setStyleData("-bottom-64")}
          notifData={notification}
          className={styleData}
        />
        {children}
      </NotifciationsContext.Provider>
    </NotifcationContext.Provider>
  )
}
