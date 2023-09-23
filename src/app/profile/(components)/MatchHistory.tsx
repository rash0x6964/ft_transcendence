import Match from "../(types)/Match"
import Player from "../(types)/Player"
import MatchEntry from "./MatchEntry"
import SectionTitle from "./SectionTitle"

export default function MatchHistory() {
  const url =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBLE2R35SV62Enw03QHS5AY-LUr6HOhmHvrA&usqp=CAU"
  const p_1: Player = { username: "samini", url }
  const p_2: Player = { username: "ghalix", url }
  const s_1: number = 5
  const s_2: number = 3

  const matches: Match[] = [
    { name: "one", type: "Normal", win: true, days: 3, p_1, p_2, s_1, s_2 },
    { name: "two", type: "Normal", win: false, days: 3, p_1, p_2, s_1, s_2 },
    { name: "three", type: "Ranked", win: true, days: 3, p_1, p_2, s_1, s_2 },
    { name: "four", type: "Ranked", win: false, days: 3, p_1, p_2, s_1, s_2 },
    { name: "five", type: "Normal", win: true, days: 3, p_1, p_2, s_1, s_2 },
  ]

  return (
    <>
      <div className="m-10">
        <SectionTitle text="Match History" />
        <div>
          {matches.map(match => (
            <MatchEntry key={match.name} match={match} />
          ))}
        </div>
      </div>
    </>
  )
}
