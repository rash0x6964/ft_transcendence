import Achievement from "@/models/Achievement.model"
import AchievementUser from "@/types/AchievementUser"

type Props = {
  achievement: Achievement
}

export default function AchStat({ achievement }: Props) {
  return (
    <div className="flex flex-col items-center my-auto group relative">
      <div className="p-3 rounded-md z-[200] bottom-0 -mb-8 ml-4 left-0 absolute flex-col hidden group-hover:flex bg-backdrop w-56 ">
        <div className="text-xs text-gray-500"> {achievement.description}</div>
      </div>
      <img
        className={`h-16 w-16 rounded-full `}
        src={achievement.imgUrl}
        alt={achievement.name}
      />
      <div className="text-gray-600 text-sm font-medium">
        {achievement.name}
      </div>
    </div>
  )
}
