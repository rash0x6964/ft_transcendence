import Avatar from "@/components/BaseComponents/Avatar"

type Prop = {
	src: string
	alt?: string
	username: string
	lastMessage: string
	time: string
	isOnline: boolean
	isSelected: boolean
	id: string
	handleClick: (id: string) => void
}

export default function FriendBar({
	src,
	alt,
	username,
	lastMessage,
	time,
	isOnline,
	handleClick,
	isSelected,
	id,
}: Prop) {
	return (
		<div
			onClick={() => handleClick(id)}
			className={`bg-secondary flex group relative w-96 h-[73px] rounded-xl items-center transition-colors p-2 gap-x-2 hover:border-primary border-2 cursor-pointer ${isSelected ? "border-primary" : "border-transparent"
				} `}
		>
			{/* <div
        className={`w-full h-full rounded-xl top-0 left-0 blur-[2px]  absolute border-2 group-hover:border-primary  ${
          isSelected ? "border-primary" : "border-transparent"
        } `}
      ></div> */}
			<Avatar src={src} alt={alt} className="w-12 h-12" />
			<div className="w-12 h-12 grow">
				<p className="text-gray-300 text-base font-semibold">{username}</p>
				<p className="text-gray-600 text-sm truncate">{lastMessage}</p>
			</div>
			<div className="h-full flex flex-col justify-between items-end">
				<p className="text-gray-400 text-sm">{time}</p>
				<div
					className={
						"h-[10px] w-[10px] bg-green-400 rounded-full " +
						(isOnline ? "bg-green-400" : "bg-red-500")
					}
				></div>
			</div>
		</div>
	)
}
