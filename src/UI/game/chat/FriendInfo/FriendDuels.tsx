import DuelCard from "./DuelCard"
import matchService from "@/services/MatchService"
import { useContext, useEffect, useState } from "react"
import MatchDisplayData from "@/types/MatchDisplayData"
import { ProfileContext } from "@/UI/ActiveUserProvider"

type Props = { id: string | null; className: string }

export default function FriendDuels({ id, className }: Props) {
  const [duels, setDuels] = useState<MatchDisplayData[] | null>(null)
  const { profileData } = useContext(ProfileContext)

  useEffect(() => {
    if (!id) return

    const fetchData = async () => {
      try {
        const matchs = await matchService.getVsMatchesByIdByOffset(id, 0)
        const matchDisplayData = await matchService.getMatchProps(
          profileData,
          matchs
        )
        setDuels(matchDisplayData)
      } catch (error) {}
    }

    fetchData()
  }, [id])

  return (
    <div className={className}>
      <p className="my-4 text-gray-300 text-base font-semibold">Duels</p>
      <div className="flex flex-col gap-2 overflow-y-scroll animate__animated animate__fadeIn">
        {duels && duels.length > 0 ? (
          duels.map((item) => <DuelCard key={item.id} data={item} />)
        ) : duels && duels.length === 0 ? (
          <p className="text-center font-light">no match found</p>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
