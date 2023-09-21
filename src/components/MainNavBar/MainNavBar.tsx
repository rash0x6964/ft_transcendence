'use client'
import React from "react"
import PlayerName from "./PlayerName"
import PlayerCoins from "./PlayerCoins"
import NavHistory from "./NavHistory"
import PlayerRP from "./PlayerRP"
import Settings from "../svgs/Settings"

import SettingsButton from "./SettingsButton"
import PlayerLevel from "./PlayerLevel"
type Props = {
	coins: number
}

export default function MainNavBar({ coins }: Props) {
	let history: boolean[] = [true, true, false, false, true]
	let RP: number = 10050;

	return (
		<div className="flex justify-between p-5">

			<svg  className="text-primary my-auto" width="31" height="31" viewBox="0 0 29 31" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
				<path d="M14.0704 0C13.2637 0 12.4704 0.0714 11.6989 0.2142C5.0656 1.4144 0 7.5684 0 14.9498C0 19.7537 2.144 24.038 5.472 26.775C2.3232 27.1082 0.1664 27.7882 0.1664 28.577C0.1664 29.6956 4.5024 30.6 9.8496 30.6C14.9568 30.6 19.6768 29.6004 19.5744 28.6994C21.8045 27.6869 23.7517 26.0816 25.2288 24.038C27.1182 21.4341 28.1414 18.2378 28.1379 14.9498C28.1376 6.7082 21.824 0 14.0704 0ZM20.5248 26.2072C19.632 26.4112 18.7072 26.52 17.7568 26.52C10.512 26.52 4.6368 20.2776 4.6368 12.58C4.6368 9.18 5.7824 6.0622 7.6896 3.6414C9.61467 2.40605 11.8215 1.75461 14.0704 1.7578C20.9152 1.7578 26.4829 7.6738 26.4829 14.9498C26.4832 19.7098 24.096 23.8918 20.5248 26.2072Z" fill="currentColor" />
			</svg>

			<div className="bg-transparent-500  flex justify-center flex-row-reverse  h-fit gap-12">

				<PlayerName src="https://steamavatar.io/img/14777429717elSu.jpg" name="rash0x6964" />
				<PlayerCoins className="my-auto" coins={coins} />
				<NavHistory className="my-auto" history={history} />
				<PlayerLevel className="my-auto" level={10} percentage={50} />
				<PlayerRP className="my-auto" RP={10500} />

			</div>
			<SettingsButton className="my-auto text-white hover:text-white/50 duration-500" onClick={() => alert("asd")} />
		</div>

	)
}
