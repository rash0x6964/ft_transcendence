import FriendBar from "./FriendBar"

type Prop = {
	selectedId: number
	handleClick: (id: number) => void
}
export default function FriendsList({ selectedId, handleClick }: Prop) {
	return (
		<div className="flex flex-col h-[40%] gap-2 overflow-y-scroll">
			<FriendBar
				id={1}
				handleClick={handleClick}
				isSelected={1 == selectedId}
				src="https://cdn.intra.42.fr/users/b0639683a7b57757fd405aa1f25abafe/aqiouami.jpg"
				username="bored Turtle"
				isOnline={true}
				lastMessage="madarch webserv"
				time="14:23 PM"
			/>
			<FriendBar
				id={1}
				handleClick={handleClick}
				isSelected={1 == selectedId}
				src="https://steamavatar.io/img/1477742899SkLXW.jpg"
				username="K!nch3r0"
				isOnline={true}
				lastMessage="ana wa3r f pong"
				time="14:23 PM"
			/>
			<FriendBar
				id={2}
				handleClick={handleClick}
				isSelected={2 == selectedId}
				src="https://steamavatar.io/img/1477787728ToDvT.jpg"
				username="Rash0x3434"
				isOnline={true}
				lastMessage="ana wa3r f msmn "
				time="14:22 PM"
			/>
			<FriendBar
				id={3}
				handleClick={handleClick}
				isSelected={3 == selectedId}
				src="https://steamavatar.io/img/1477351906o9rtl.jpg"
				username="Mohcine"
				isOnline={false}
				lastMessage="sleeps"
				time="14:21 PM"
			/>
			<FriendBar
				id={4}
				handleClick={handleClick}
				isSelected={4 == selectedId}
				src="https://cdn.intra.42.fr/users/8cc22afccbd73c4af44925f3955ecee7/ohaimad.jpg"
				username="OthmanBG"
				isOnline={false}
				lastMessage="love husa"
				time="14:20 PM"
			/>
			<FriendBar
				id={5}
				handleClick={handleClick}
				isSelected={5 == selectedId}
				src="https://cdn.discordapp.com/attachments/1030486343064760441/1155918912379158598/A22AC2E2-4959-48B1-B571-9574A3819A55.jpg"
				username="OtamneBgXLL"
				isOnline={true}
				lastMessage=" the best ux designer"
				time="14:13 PM"
			/>
			<FriendBar
				id={6}
				handleClick={handleClick}
				isSelected={6 == selectedId}
				src="https://cdn.intra.42.fr/users/1fca89153519be2ec5fd99b3e9db7385/aarbaoui.jpg"
				username="Anas"
				isOnline={true}
				lastMessage="ana wa3r f bocadillos"
				time="14:13 PM"
			/>
			<FriendBar
				id={7}
				handleClick={handleClick}
				isSelected={7 == selectedId}
				src="https://cdn.intra.42.fr/users/559a4b35ac4e090c3f93ba96b0d809cd/iabkadri.jpg"
				username="Issam"
				isOnline={true}
				lastMessage="CPP chakhsian"
				time="14:13 PM"
			/>
			<FriendBar
				id={8}
				handleClick={handleClick}
				isSelected={8 == selectedId}
				src="https://steamavatar.io/img/1477787728ToDvT.jpg"
				username="Rash0x3434"
				isOnline={true}
				lastMessage="ana wa3r f pong"
				time="14:43 PM"
			/>
			<FriendBar
				id={9}
				handleClick={handleClick}
				isSelected={9 == selectedId}
				src="https://steamavatar.io/img/1477787728ToDvT.jpg"
				username="K!nch3r0"
				isOnline={true}
				lastMessage="ana wa3r f pong"
				time="14:01 PM"
			/>
			<FriendBar
				id={10}
				handleClick={handleClick}
				isSelected={10 == selectedId}
				src="https://steamavatar.io/img/1477787728ToDvT.jpg"
				username="K!nch3r0"
				isOnline={true}
				lastMessage="ana wa3r f pong"
				time="14:23 PM"
			/>
		</div>
	)
}
