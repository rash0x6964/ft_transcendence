import Avatar from "@/components/BaseComponents/Avatar"
import Duel from "@/components/svgs/Duel"
import MatchDisplayData from "@/types/MatchDisplayData"

export default function DuelCard({ data }: { data: MatchDisplayData}) {
  return (
    <div className="w-[377px] min-h-[66px]  bg-secondary flex items-center justify-around rounded-xl">
      <Avatar
        className="w-12 h-12"
        alt={data.p_1.username}
        src={data.p_1.url}
      />
      <p className="text-base text-white font-semibold">{data.s_1}</p>
      <div className="w-9 flex flex-col items-center ">
        <Duel />
        <p className="text-[10px] text-gray-400 font-semibold text-center">{data.duration}</p>
      </div>
      <p className="text-base text-white font-semibold">{data.s_2}</p>
      <Avatar
        className="w-12 h-12"
        src={data.p_2.url}
        alt={data.p_2.username}
      />
    </div>
  )
}
