import AchievementEntry from "./AchievementEntry"
import SectionTitle from "../SectionTitle"
import { useEffect, useState } from "react"
import achievementService from "@/services/AchievementService"
import AchievementUser from "@/types/AchievementUser"

export default function Achievements() {
  const [achievements, setAchievements] = useState<AchievementUser[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const promises = [
        achievementService.getAllAchievements(),
        achievementService.getUserAchievements(),
      ]
      const [allAchievements, userAchievements] = await Promise.all(promises)

      const achievs: AchievementUser[] = allAchievements.map(achievement => {
        return {
          ...achievement,
          active: userAchievements.find(ach => ach.id === achievement.id)
            ? true
            : false,
        }
      })
      setAchievements(achievs)
    }
    fetchData()
  }, [])

  return (
    <div className="bg-secondary rounded-2xl h-fit max-w-lg m-10">
      <SectionTitle text="Achievements" />
      <div className="flex flex-wrap justify-center">
        {achievements.map(achievement => (
          <AchievementEntry key={achievement.name} achievement={achievement} />
        ))}
      </div>
    </div>
  )
}
