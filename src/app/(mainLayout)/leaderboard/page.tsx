import Podium from "./(components)/Podium"
import TableRow from "./(components)/TableRow"
import TableHead from "./(components)/TableHead"
export default function page() {
	return (
		<div className="mx-auto flex flex-col gap-5 container pt-24">
			<div className="flex gap-5 justify-around mb-8">
				<div></div>
				<Podium
					playerAvatar="https://steamavatar.io/img/1477742918oUeJT.jpg"
					playerName="rash"
					position={1}
					rp={8500}
				/>

				<Podium
					playerAvatar="https://steamavatar.io/img/1477742918oUeJT.jpg"
					playerName="ghali"
					position={2}
					rp={8500}
				/>

				<Podium
					playerAvatar="https://steamavatar.io/img/1477742918oUeJT.jpg"
					playerName="samini"
					position={3}
					rp={8500}
				/>
				<div className="order-5"></div>
			</div>

			<div className="flex flex-col ">
				<TableHead className="h-14 w-fill flex   pl-8 pr-16   text-sm text-slate-600 " />
				<div className="flex flex-col gap-3">
					<TableRow
						nbGame={510}
						playerAvatar="https://steamavatar.io/img/1477742911B8IH3.jpg"
						playerName="KINSHIRO"
						rank={4}
						rp={8500}
						winrate={50}
					/>
					<TableRow
						nbGame={510}
						playerAvatar="https://steamavatar.io/img/1477742911B8IH3.jpg"
						playerName="KINSHIRO"
						rank={4}
						rp={8500}
						winrate={50}
					/>
					<TableRow
						nbGame={510}
						playerAvatar="https://steamavatar.io/img/1477742911B8IH3.jpg"
						playerName="KINSHIRO"
						rank={4}
						rp={8500}
						winrate={50}
					/>
					<TableRow
						nbGame={510}
						playerAvatar="https://steamavatar.io/img/1477742911B8IH3.jpg"
						playerName="KINSHIRO"
						rank={4}
						rp={8500}
						winrate={50}
					/>
				</div>


			</div>
		</div>
	)
}
