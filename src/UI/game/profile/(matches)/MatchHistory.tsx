import MatchDisplayData from "@/types/MatchDisplayData"
import MatchEntry from "./MatchEntry"
import SectionTitle from "../SectionTitle"
import { useEffect, useState } from "react"
import matchService from "@/services/MatchService"

export default function MatchHistory() {
  const [matches, setMatches] = useState(new Array<MatchDisplayData>())

  useEffect(() => {
    const fetchData = async () => {
      const matchModels = await matchService.getAllMatches()
      setMatches(await matchService.getMatchProps(matchModels))
    }

    fetchData()
  }, [])

  return (
    <div className="m-10 flex-1 flex flex-col ">
      <SectionTitle text="Match History" />
      <div className="overflow-y-scroll">
        {matches.map(match => (
          <MatchEntry key={match.name} match={match} />
        ))}
      </div>
    </div>
  )
}
