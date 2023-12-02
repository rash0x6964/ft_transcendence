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
  const [shouldLoadMore, setShouldLoadMore] = useState(false)

  useEffect(() => {
    if (!profileData) return

    const fetchData = async () => {
      try {
        const matchModels = await matchService.getAllMatchesByIdByOffset(
          profileData.id,
          0
        )
        if (matchModels.length < 5) setShouldLoadMore(false)
        else setShouldLoadMore(true)

        setMatches(await matchService.getMatchProps(profileData, matchModels))
      } catch (error) {
        console.log("Couldn't fetch matches")
      }
    }

    fetchData()
  }, [profileData])

  const onLoadMore = async () => {
    if (shouldLoadMore === false) return

    try {
      const _matchAppend = await matchService.getAllMatchesByIdByOffset(
        profileData.id,
        matches.length
      )
      const _matchAppendModels = await matchService.getMatchProps(
        profileData,
        _matchAppend
      )
      _matchAppend.length === 0 && setShouldLoadMore(false)
      setMatches(matches.concat(_matchAppendModels))
    } catch (error) {
      console.log("Couldn't fetch more matches")
    }
  }

  return (
    <div className="my-10 flex-1 flex flex-col ">
      <SectionTitle text="Match History" />
      <div className="overflow-y-scroll">
        {matches.map((match) => (
          <MatchEntry key={match.id} match={match} />
        ))}
      </div>
      {shouldLoadMore && (
        <MainButton className="py-4" onClick={onLoadMore}>
          Load More
        </MainButton>
      )}
    </div>
  )
}
