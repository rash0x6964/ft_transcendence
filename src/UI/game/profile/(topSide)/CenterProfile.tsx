import Elo from "./Elo"
import Avatar from "@/components/BaseComponents/Avatar"

type Props = {
  avatarUrl: string
  rating: number
}

export default function CenterProfile({ avatarUrl, rating }: Props) {
  return (
    <div className="relative -top-24">
      <div className="flex flex-col items-center w-40 gap-4">
        <Avatar override={true} src={avatarUrl} className="rounded-[22px]" />
        <div className="font-semibold text-xl">rash0x6964</div>
        <Elo className="-mb-12" RP={rating} />
      </div>
    </div>
  )
}
