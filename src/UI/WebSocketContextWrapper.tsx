import { PropsWithChildren, createContext, useEffect, useMemo, useState } from "react";
import io, { Socket } from "socket.io-client"
import env from "@/environment/environment";

export const WebSocketContext = createContext<Socket | null>(null);

export default function WebSocketContextProvider({ children }: PropsWithChildren) {
	const socket = useMemo(() => io(env.socketEndPoint), [])
	console.log(process.env.DB_HOST)
	useEffect(() => {
		if (socket) {
			const onConnect = () => {
				console.log("connected " + socket.id); // x8WIv7-mJelg7on_ALbx
			};

			const onDisconnect = () => {
				console.log("disconnected " + socket.id); // undefined
			}
			socket.on("connect", onConnect);

			socket.on("disconnect", onDisconnect);

			return () => {
				socket.off("connected", onConnect);
				socket.off("disconnected", onDisconnect);
			}
		}

	}, [])
	return (
		<WebSocketContext.Provider value={socket}>
			{children}
		</WebSocketContext.Provider>
	)
}
