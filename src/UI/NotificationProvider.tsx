import { Dispatch, PropsWithChildren, SetStateAction, createContext, useEffect, useState } from "react"
import Notification from "@/components/BaseComponents/Notification";
import NotifData from "@/types/NotifData";

export const NotifcationContext = createContext<(data: NotifData) => void | null>(() => { })

export default function NotificationProvider({ children }: PropsWithChildren) {

	const defaultObj: NotifData =
	{
		message: "wow",
		title: "xD",

	}

	const notifTime = 3000;
	const [notification, setNotication] = useState<NotifData>(defaultObj);
	const [styleData, setStyleData] = useState("-bottom-64")
	const [queuedNotif, setQueueNotification] = useState(0);
	const notify = (data: NotifData) => {
		if (queuedNotif > 0) {

			setTimeout(() => {
				setNotication(data);
				setQueueNotification(prevState => prevState - 1)

			}, notifTime * queuedNotif + 1000);
			setQueueNotification(prevState => prevState + 1)
		}
		else
			setNotication(data);
	}
	useEffect(() => {

		if (notification == defaultObj)
			return;
		setQueueNotification(prevState => prevState + 1)
		setStyleData("-bottom-0");
		let timeout = setTimeout(() => {
			setStyleData("-bottom-64")
			setQueueNotification(prevState => prevState - 1)
		}, notifTime);
		() => {
			clearTimeout(timeout);
		}

	}, [notification])

	return (
		<NotifcationContext.Provider value={notify} >
			<Notification notifData={notification} className={styleData} />
			{children}
		</NotifcationContext.Provider>
	)
}
