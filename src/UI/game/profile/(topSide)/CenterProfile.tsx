import Elo from "./Elo"
import Avatar from "@/components/BaseComponents/Avatar"

type Props = {
  username: string
  avatarUrl: string
  rating: number
}

export default function CenterProfile({ avatarUrl, rating, username }: Props) {
  return (
    <div className="relative -top-24">
      <div className="flex flex-col items-center w-40 gap-4">
        <Avatar
          override={true}
          src={avatarUrl}
          className="rounded-[22px] w-40 h-40"
        />
        <div className="font-semibold text-xl">{username}</div>
        <Elo className="-mb-12" RP={rating} />
      </div>
    </div>
  )
}
