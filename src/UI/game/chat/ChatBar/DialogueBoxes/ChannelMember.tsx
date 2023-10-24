import MailLetter from "@/components/svgs/MailLetter"
import DialButton from "./DialButton"
import AddUser from "@/components/svgs/AddUser"
type Props =
	{
		className:string,
		userName: string,
		src: string,
		onSendRequest?: () => void
		onMessage?: () => void
	}

export default function Channel({className ,userName, src, onSendRequest, onMessage }: Props) {

	return (
		<div className={`flex justify-between w-[28rem] transition-all duration-500 ${className}`}>
			<div className="flex ml-2">
				<img className="m-2 w-10 h-10 rounded-full" src={src} alt={userName} />
				<p className="text-sm my-auto">{userName}</p>
			</div>
			<div className="flex my-auto gap-1">
				<DialButton onClick={onMessage}>
					<MailLetter width={16} height={16} />
				</DialButton>
				<DialButton onClick={onSendRequest}>
					<AddUser width={16} height={16} />
				</DialButton>
			</div>
		</div>
	)
}
