import { ChannelUser } from "@/models/Channel.model"
import MemberCard from "./MemberCard"
import { MouseEvent } from "react"

type Props = {
  offline?: boolean
  members: ChannelUser[]
  title: string
  handleContextMenu: (
    e: MouseEvent<HTMLDivElement>,
    data: ChannelUser | undefined
  ) => void
}

export default function MemberSection({
  offline = false,
  members,
  handleContextMenu,
  title,
}: Props) {
  if (members.length <= 0) return <></>
  return (
    <>
      <span className="text-gray-400 text-sm">
        {title} - {title == "Owner" ? "👑" : members.length}
      </span>

      {members.map((item) => {
        return (
          <MemberCard
            offline={offline}
            key={item.userID}
            onContextMenu={handleContextMenu}
            playerAvatar={item.user?.avatarUrl ?? ""}
            playerName={item.user?.userName ?? "Unknown"}
            playerState={offline ? "offline" : item.user?.state ?? ""}
            data={item}
          />
        )
      })}
    </>
  )
}
