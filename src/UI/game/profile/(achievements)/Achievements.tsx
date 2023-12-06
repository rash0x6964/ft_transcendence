import AchievementEntry from "./AchievementEntry"
import SectionTitle from "../SectionTitle"
import AchievementUser from "@/types/AchievementUser"

type Props = {
  achievements: AchievementUser[]
}

export default function Achievements({ achievements }: Props) {
  return (
    <div className="bg-secondary rounded-2xl h-fit w-1/2 max-w-lg my-10 drop-shadow-lg">
      <SectionTitle text="Achievements" />
      <div className="flex flex-wrap justify-center gap-3 p-3">
        {achievements.map((achievement) => (
          <AchievementEntry key={achievement.name} achievement={achievement} />
        ))}
      </div>
    </div>
  )
}
