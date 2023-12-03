import AchievementUser from "@/types/AchievementUser"

type Props = {
  achievement: AchievementUser
}

export default function AchievementEntry({ achievement }: Props) {
  const active = achievement.active ? "" : "saturate-0"

  return (
    <div className="relative group">
      <div className="p-3 rounded-md z-[200] bottom-0 -mb-8 ml-4 left-0 absolute flex-col hidden group-hover:flex bg-backdrop w-56 ">
        <div className="text-sm">{achievement.name}</div>
        <div className="text-xs text-gray-500"> {achievement.description}</div>
      </div>
      <img
        className={`h-20 w-20 p-1 object-cover rounded-full ${active}`}
        src={achievement.imgUrl}
        alt={achievement.name}
      />
    </div>
  )
}
