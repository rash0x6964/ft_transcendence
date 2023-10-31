import MatchDisplayData from "@/types/MatchDisplayData"
import MatchEntry from "./MatchEntry"
import SectionTitle from "../SectionTitle"
import { useEffect, useState } from "react"
import matchService from "@/services/MatchService"
import ProfileData from "@/models/ProfileData.model"

type Props = {
  profileData: ProfileData
}

export default function MatchHistory({ profileData }: Props) {
  const [matches, setMatches] = useState<MatchDisplayData[] | null>(null)

  useEffect(() => {
    if (!profileData) return

    const fetchData = async () => {
      const matchModels = await matchService.getAllMatchesById(profileData.id)
      setMatches(await matchService.getMatchProps(profileData, matchModels))
    }

    fetchData()
  }, [profileData])

  if (!matches) return <div>Loading...</div>
  return (
    <div className="m-10 flex-1 flex flex-col ">
      <SectionTitle text="Match History" />
      <div className="overflow-y-scroll">
        {matches.map((match) => (
          <MatchEntry key={match.name} match={match} />
        ))}
      </div>
    </div>
  )
}
