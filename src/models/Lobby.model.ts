import { UUID } from "crypto"
import UserData from "./UserData.model"

export default interface Lobby {
	id?: UUID,
	players: [UserData, UserData]
	ranked: boolean,
	mode: string
	owner: string,
	queueLobby: boolean
	gameData: any
	lobbySate: "ingame" | "idle" | "inQueue"
	isOwner?: boolean

}
