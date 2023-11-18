import MatchDisplayData from "@/types/MatchDisplayData"
import Score from "./Score"
import Avatar from "@/components/BaseComponents/Avatar"
type Props = {
  match: MatchDisplayData
}

export default function ScoreBoard({ match }: Props) {
  return (
    <div className="flex flex-grow justify-around items-center">
      <div className="mt-2">
        <Avatar
          src={match.p_1.url}
          className="mx-auto rounded-full h-12 w-12 "
        />

        <h4 className="text-sm text-center">{match.p_1.username}</h4>
      </div>
      <Score match={match} />
      <div className="mt-2">
        <Avatar
          src={match.p_2.url}
          className="mx-auto rounded-full h-12 w-12 "
        />

        <h4 className="text-sm text-center">{match.p_2.username}</h4>
      </div>
    </div>
  )
}
