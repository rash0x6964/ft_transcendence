import Match from "../(types)/Match"
import Score from "./Score"

type Props = {
  match: Match
}

export default function ScoreBoard({ match }: Props) {
  return (
    <>
      <div className="flex flex-grow justify-around items-center">
        <div className="mt-2">
          <img
            className="rounded-full max-h-[50px]"
            src={match.p_1.url}
            alt=""
          />
          <h4>{match.p_1.username}</h4>
        </div>
        <Score match={match} />
        <div className="mt-2">
          <img
            className="rounded-full max-h-[50px]"
            src={match.p_2.url}
            alt=""
          />
          <h4>{match.p_2.username}</h4>
        </div>
      </div>
    </>
  )
}
