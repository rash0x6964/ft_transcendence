import Match from "../(types)/Match"
import MatchInfo from "./MatchInfo"

type Props = {
  match: Match
}

export default function MatchEntry({ match }: Props) {
  return (
    <>
      <div className="flex gap-5 p-3">
        <MatchInfo type={match.type} win={match.win} days={match.days} />
        <div>Match {match.name}</div>
      </div>
    </>
  )
}
