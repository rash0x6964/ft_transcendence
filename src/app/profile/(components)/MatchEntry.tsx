import Match from "../(types)/Match"
import MatchInfo from "./MatchInfo"
import ScoreBoard from "./ScoreBoard"

type Props = {
  match: Match
}

export default function MatchEntry({ match }: Props) {
  return (
    <>
      <div className="bg-secondary rounded-2xl m-4 flex gap-5 p-3 h-[90px] w-[1044px]">
        <MatchInfo type={match.type} win={match.win} days={match.days} />
        <ScoreBoard />
      </div>
    </>
  )
}
