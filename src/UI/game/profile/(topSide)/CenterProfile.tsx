import RP from "@/components/svgs/RP"
import Elo from "./Elo"
import Avatar from "@/components/BaseComponents/Avatar"

type Props = {
  username: string
  avatarUrl: string
  rating: number
}

export default function CenterProfile({ avatarUrl, rating, username }: Props) {
  return (
    <div className="flex flex-col items-center gap-2 ">
      <Avatar className="w-40 h-40 border border-gray-400" src={avatarUrl} />
      <h1 className="text-xl text-white font-medium">{username}</h1>
      <div className="flex">
        <RP width={24} height={24} className=" text-primary mr-1" />
        <div className="font-semibold text-gray-400">{rating}</div>
      </div>
    </div>
  )
}
