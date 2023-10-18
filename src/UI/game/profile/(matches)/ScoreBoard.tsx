import Match from "@/types/Match"
import Score from "./Score"
import Avatar from "@/components/BaseComponents/Avatar"
type Props = {
  match: Match
}

export default function ScoreBoard({ match }: Props) {
  return (
    <div className="flex flex-grow justify-around items-center">
      <div className="mt-2">
        <Avatar src={match.p_1.url} className="rounded-full h-12 w-12 " />

        <h4 className="text-sm text-center">{match.p_1.username}</h4>
      </div>
      <Score match={match} />
      <div className="mt-2">
        <Avatar src={match.p_2.url} className="rounded-full h-12 w-12 " />

        <h4 className="text-sm text-center">{match.p_2.username}</h4>
      </div>
    </div>
  )
}
