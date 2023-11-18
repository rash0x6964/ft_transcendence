import DuelCard from "./DuelCard"
import matchService from "@/services/MatchService"
import { useContext, useEffect, useState } from "react"
import MatchDisplayData from "@/types/MatchDisplayData"
import { ProfileContext } from "@/UI/ActiveUserProvider"

type Props = { id: string | null; className: string }

export default function FriendDuels({ id, className }: Props) {
  const [duels, setDuels] = useState<MatchDisplayData[]>([])
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
      <p className="my-4 text-gray-300 text-base font-semibold ">Duels</p>
      <div className="flex flex-col gap-2 overflow-y-scroll">
        {duels.map((item) => {
          return <DuelCard key={item.id} data={item} />
        })}
      </div>
    </div>
  )
}
