import React from "react"
import Trophy from "@/components/svgs/Trophy"
import RP from "@/components/svgs/RP"
import Avatar from "@/components/BaseComponents/Avatar"

type Props = {
	rank: number
	playerAvatar: string
	playerName: string
	rp: number
	winrate: number
	nbGame: number
}

export default function TableRow({
	rank,
	playerAvatar,
	playerName,
	rp,
	winrate,
	nbGame,
}: Props) {
	return (
		<div className="h-14 w-fill bg-secondary drop-shadow-lg rounded-lg flex   pl-7 pr-16 text-sm">
			{/* Rank */}
			<div className="self-center flex gap-3">
				<Trophy />
				<span className="self-center">{rank}</span>
			</div>
			<div className="flex  justify-around flex-1">
				<div className="self-center flex gap-3">
					<Avatar className="w-8 h-8" src={playerAvatar} alt={playerName} />
					<span className="self-center">{playerName}</span>
				</div>

				{/* Rating */}
				<div className="self-center flex gap-3">
					<RP className="text-primary fill-primary" />
					<span className="self-center">{rp} RP</span>
				</div>

				{/* Winrate */}
				<div className="self-center flex gap-3">
					<span>{winrate} %</span>
				</div>

				{/* Game */}
				<div className="self-center flex gap-3">
					<span>{nbGame}</span>
				</div>
			</div>

			{/* player */}

		</div>
	)
}