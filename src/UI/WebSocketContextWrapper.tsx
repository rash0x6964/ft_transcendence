import { PropsWithChildren, createContext, useEffect, useMemo } from "react";
import io, { Socket } from "socket.io-client"
import env from "@/environment/environment";
import { getJwtCookie } from "@/services/CookiesService";

export const WebSocketContext = createContext<Socket | null>(null);

export default function WebSocketContextProvider({ children }: PropsWithChildren) {
	const socket = useMemo(() => io(env.socketEndPoint, {
		transports: ["websocket"],
		query:
		{
			userId: getJwtCookie()
		}
	}), [])
	useEffect(() => {
		if (socket) {
			const onConnect = () => {
				socket.emit("connected", { token: getJwtCookie() });
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
