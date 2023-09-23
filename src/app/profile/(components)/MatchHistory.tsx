import MatchEntry from "./MatchEntry"
import SectionTitle from "./SectionTitle"

export default function MatchHistory() {
  const matches = [
    { name: "one" },
    { name: "two" },
    { name: "three" },
    { name: "four" },
    { name: "five" },
  ]

  return (
    <>
      <div className="bg-secondary rounded-2xl m-10">
        <SectionTitle text="Match History" />
        <div>
          {matches.map((match) => (
            <MatchEntry key={match.name} name={match.name} />
          ))}
        </div>
      </div>
    </>
  )
}
