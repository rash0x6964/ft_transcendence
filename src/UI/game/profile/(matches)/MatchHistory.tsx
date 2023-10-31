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
  const [matches, setMatches] = useState<MatchDisplayData[]>([])

  useEffect(() => {
    if (!profileData) return

    const fetchData = async () => {
      try {
        const matchModels = await matchService.getAllMatchesById(profileData.id)
        setMatches(await matchService.getMatchProps(profileData, matchModels))
      } catch (error) {
        console.log("Couldn't fetch matches")
      }
    }

    fetchData()
  }, [profileData])

  return (
    <div className="m-10 flex-1 flex flex-col ">
      <SectionTitle text="Match History" />
      <div className="overflow-y-scroll">
        {matches.map((match) => (
          <MatchEntry key={match.id} match={match} />
        ))}
      </div>
    </div>
  )
}
