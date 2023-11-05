import MatchDisplayData from "@/types/MatchDisplayData"
import MatchEntry from "./MatchEntry"
import SectionTitle from "../SectionTitle"
import { useEffect, useState } from "react"
import matchService from "@/services/MatchService"
import ProfileData from "@/models/ProfileData.model"
import MainButton from "@/components/BaseComponents/MainButton"

type Props = {
  profileData: ProfileData
}

export default function MatchHistory({ profileData }: Props) {
  const [matches, setMatches] = useState<MatchDisplayData[]>([])
  const [offset, setOffset] = useState(5)

  useEffect(() => {
    if (!profileData) return

    const fetchData = async () => {
      try {
        const matchModels = await matchService.getAllMatchesByIdByOffset(
          profileData.id,
          0
        )
        setMatches(await matchService.getMatchProps(profileData, matchModels))
      } catch (error) {
        console.log("Couldn't fetch matches")
      }
    }

    fetchData()
  }, [profileData])

  const onLoadMore = async () => {
    try {
      const _matchAppend = await matchService.getAllMatchesByIdByOffset(
        profileData.id,
        offset
      )
      const _matchAppendModels = await matchService.getMatchProps(
        profileData,
        _matchAppend
      )
      setOffset(offset + 5)
      setMatches(matches.concat(_matchAppendModels))
    } catch (error) {
      console.log("Couldn't fetch more matches")
    }
  }

  return (
    <div className="m-10 flex-1 flex flex-col ">
      <SectionTitle text="Match History" />
      <div className="overflow-y-scroll">
        {matches.map((match) => (
          <MatchEntry key={match.id} match={match} />
        ))}
      </div>
      <MainButton onClick={onLoadMore}>Load More</MainButton>
    </div>
  )
}
