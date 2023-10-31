import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { WebSocketContext } from "./WebSocketContextWrapper";
import User from "@/models/User.model";
import { NotifcationContext } from "./NotificationProvider";
import { getJwtCookie } from "@/services/CookiesService";
import Lobby from "@/models/Lobby.model";
import { useRouter } from "next/router";

export const LobbyContext = createContext<Lobby | null>(null)
export default function LobbyProvider({ children }: PropsWithChildren) {
	const notify = useContext(NotifcationContext)
	const router = useRouter();
	const [lobby, setLobby] = useState<Lobby | null>(null);
	const socket = useContext(WebSocketContext)
	useEffect(() => {
		if (!socket)
			return;
		socket.emit("getLobbyData", { token: getJwtCookie() })

		const onlobbyInvite = ((data: any) => {

			notify(
				{
					buttonEvent: () => {
						socket.emit("lobbyAccept", { token: getJwtCookie(), data: data })

					},
					buttonTitle: "Accept",
					title: "lobby invite",
					message: `${data.username} invited you to lobby`,
					imgSrc: data.avatarUrl,

				}
			)
		})

		const onLeaveLobby = () => {
			setLobby(null);
		}
		const onLobbyCreated = ((data: Lobby) => {
			router.push("/game/lobby")

			setLobby(data);
		})
		const onLobbyChange = (lobby: Lobby) => {
			alert("yes")
			console.log(lobby);

			setLobby(lobby);
		}
		socket.on("lobbyData", onLobbyCreated);
		socket.on("lobbyInvite", onlobbyInvite);
		socket.on("leaveLobby", onLeaveLobby);
		socket.on("lobbyChange", onLobbyChange)
		return () => {
			socket.off("lobbyCreated", onLobbyCreated);
			socket.off("lobbyData", onlobbyInvite);
			socket.off("leaveLobby", onLeaveLobby);
			socket.off("lobbyChange", onLobbyChange)


		}

	}, [])
	return (
		<LobbyContext.Provider value={lobby}>
			{children}
		</LobbyContext.Provider>
	)
}
