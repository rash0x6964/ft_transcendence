import AchievementUser from "@/types/AchievementUser"

type Props = {
  achievement: AchievementUser
}

export default function AchievementEntry({ achievement }: Props) {
  const active = achievement.active ? "" : "saturate-0"

  return (
    <div>
      <img
        className={`h-24 w-24 p-3 rounded-full ${active}`}
        src={achievement.imgUrl}
        alt={achievement.name}
        title={achievement.description}
      />
      <div className="text-sm font-light  flex justify-center">
        {achievement.name}
      </div>
    </div>
  )
}
