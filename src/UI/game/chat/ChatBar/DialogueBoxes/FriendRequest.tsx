import Check from "@/components/svgs/Check"
import DialButton from "./DialButton"
import Cross2 from "@/components/svgs/Cross2"
import Avatar from "@/components/BaseComponents/Avatar"

type Props = {
  senderData: any
  onAccept?: () => void
  onDecline?: () => void
}
export default function FriendRequest({
  senderData,
  onAccept,
  onDecline,
}: Props) {
  return (
    <div className="flex justify-between w-[28rem] mr-4">
      <div className="flex ml-4">
        <Avatar
          href={`/game/profile/${senderData.userName}`}
          className="m-2 w-10 h-10 rounded-full"
          src={senderData.avatarUrl}
          alt={senderData.userName}
        />
        <p className="text-sm my-auto">{senderData.userName}</p>
      </div>
      <div className="flex my-auto gap-1">
        <DialButton onClick={onAccept}>
          <Check width={16} height={16} />
        </DialButton>
        <DialButton onClick={onDecline}>
          <Cross2 width={16} height={16} />
        </DialButton>
      </div>
    </div>
  )
}
