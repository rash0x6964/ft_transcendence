import { PropsWithChildren, createContext, useContext, useEffect, useMemo } from "react";
import io, { Socket } from "socket.io-client"
import env from "@/environment/environment";
import cookieService from "@/services/CookiesService";
import { HttpClient } from "@/services/HttpClient";
import { NotifcationContext } from "./NotificationProvider";
import User from "@/models/User.model";

export const WebSocketContext = createContext<Socket | null>(null);

export default function WebSocketContextProvider({ children }: PropsWithChildren) {
	const socket = useMemo(() => io(env.socketEndPoint, {
		transports: ["websocket"],
		query:
		{
			userId: cookieService.getJwtCookie()
		}
	}), [])
	useEffect(() => {
		if (socket) {

			const onConnect = () => {
				HttpClient.get("/channelUser/myChannels").then(({ data }: { data: string[] }) => {
					socket.emit("connected", { token: cookieService.getJwtCookie(), data: data });


				}).catch(err => {
				})

			};


			socket.on("connect", onConnect);
			return () => {

				socket.off("connected", onConnect);
				socket.disconnect()
			}
		}

	}, [])
	return (
		<WebSocketContext.Provider value={socket}>
			{children}
		</WebSocketContext.Provider>
	)
}
