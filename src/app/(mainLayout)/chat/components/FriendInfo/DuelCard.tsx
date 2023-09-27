import Avatar from "@/components/BaseComponents/Avatar"
import Duel from "@/components/svgs/Duel"

type Prop = {
  time: number
  scoreLeft: number
  scoreRight: number
}

export default function DuelCard({ time, scoreLeft, scoreRight }: Prop) {
  return (
    <div className="w-[377px] min-h-[66px]  bg-secondary flex items-center justify-around rounded-xl">
      <Avatar
        className="w-12 h-12"
        src="https://steamavatar.io/img/1477351897dU2fO.jpg"
      />
      <p className="text-base text-white font-semibold">{scoreLeft}</p>
      <div className="w-9 flex flex-col items-center ">
        <Duel />
        <p className="text-[10px] text-gray-400 font-semibold ">{`${time} min`}</p>
      </div>
      <p className="text-base text-white font-semibold">{scoreRight}</p>
      <Avatar
        className="w-12 h-12"
        src="https://yt3.googleusercontent.com/MFE5n8IwcXBzXu4BDPlXW7V1iVTnxKsFNd3c2QJEN3on0bmtwjYsiL0fJw7AMNH9gS9ItKj90d8=s900-c-k-c0x00ffffff-no-rj"
        alt="hatim amor"
      />
    </div>
  )
}
