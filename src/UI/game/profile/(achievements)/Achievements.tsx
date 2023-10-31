import AchievementEntry from "./AchievementEntry"
import SectionTitle from "../SectionTitle"
import { useEffect, useState } from "react"
import achievementService from "@/services/AchievementService"
import AchievementUser from "@/types/AchievementUser"
import ProfileData from "@/models/ProfileData.model"

type Props = {
  profileData: ProfileData
}

export default function Achievements({ profileData }: Props) {
  const [achievements, setAchievements] = useState<AchievementUser[] | null>(
    null
  )

  useEffect(() => {
    const fetchData = async () => {
      const promises = [
        achievementService.getAllAchievements(),
        achievementService.getUserAchievementsById(profileData.id),
      ]
      const [allAchievements, userAchievements] = await Promise.all(promises)

      const achievs: AchievementUser[] = allAchievements.map((achievement) => {
        return {
          ...achievement,
          active: userAchievements.find((ach) => ach.id === achievement.id)
            ? true
            : false,
        }
      })
      setAchievements(achievs)
    }
    fetchData()
  }, [profileData])

  if (!achievements) return <div>Loading...</div>
  return (
    <div className="bg-secondary rounded-2xl h-fit max-w-lg m-10">
      <SectionTitle text="Achievements" />
      <div className="flex flex-wrap justify-center">
        {achievements.map((achievement) => (
          <AchievementEntry key={achievement.name} achievement={achievement} />
        ))}
      </div>
    </div>
  )
}
