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
  const [achievements, setAchievements] = useState<AchievementUser[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = [
          achievementService.getAllAchievements(),
          achievementService.getUserAchievementsById(profileData.id),
        ]
        const [allAchievements, userAchievements] = await Promise.all(promises)

        const achievs: AchievementUser[] = allAchievements.map(
          (achievement) => {
            return {
              ...achievement,
              active: userAchievements.find((ach) => ach.id === achievement.id)
                ? true
                : false,
            }
          }
        )
        setAchievements(achievs)
      } catch (error) {
        console.log("Couldn't fetch achievements")
      }
    }
    fetchData()
  }, [profileData])

  return (
    <div className="bg-secondary rounded-2xl h-fit w-1/2 max-w-lg m-10">
      <SectionTitle text="Achievements" />
      <div className="flex flex-wrap justify-center">
        {achievements.map((achievement) => (
          <AchievementEntry key={achievement.name} achievement={achievement} />
        ))}
      </div>
    </div>
  )
}
