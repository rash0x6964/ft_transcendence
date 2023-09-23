import Match from "../(types)/Match"
import MatchEntry from "./MatchEntry"
import SectionTitle from "./SectionTitle"

export default function MatchHistory() {
  const matches: Match[] = [
    { name: "one", type: "Normal", win: true, days: 3 },
    { name: "two", type: "Normal", win: false, days: 3 },
    { name: "three", type: "Ranked", win: true, days: 3 },
    { name: "four", type: "Ranked", win: false, days: 3 },
    { name: "five", type: "Normal", win: true, days: 3 },
  ]

  return (
    <>
      <div className="bg-secondary rounded-2xl m-10">
        <SectionTitle text="Match History" />
        <div>
          {matches.map((match) => (
            <MatchEntry key={match.name} match={match} />
          ))}
        </div>
      </div>
    </>
  )
}
