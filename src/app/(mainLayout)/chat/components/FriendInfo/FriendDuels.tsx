import PropWithClass from "@/types/PropWithClass"
import DuelCard from "./DuelCard"

export default function FriendDuels({ className }: PropWithClass) {
  return (
    <div className={className}>
      <p className="my-4 text-gray-300 text-base font-semibold ">Duels</p>
      <div className="h-[90%] flex flex-col gap-2 overflow-y-scroll">
        <DuelCard scoreLeft={4} scoreRight={2} time={14} />
        <DuelCard scoreLeft={4} scoreRight={2} time={14} />
        <DuelCard scoreLeft={4} scoreRight={2} time={14} />
        <DuelCard scoreLeft={4} scoreRight={2} time={14} />
        <DuelCard scoreLeft={4} scoreRight={2} time={14} />
        <DuelCard scoreLeft={4} scoreRight={2} time={14} />
        <DuelCard scoreLeft={4} scoreRight={2} time={14} />
        <DuelCard scoreLeft={4} scoreRight={2} time={14} />
        <DuelCard scoreLeft={4} scoreRight={2} time={14} />
        <DuelCard scoreLeft={4} scoreRight={2} time={14} />
        <DuelCard scoreLeft={4} scoreRight={2} time={14} />
        <DuelCard scoreLeft={4} scoreRight={2} time={14} />
        <DuelCard scoreLeft={4} scoreRight={2} time={14} />
        <DuelCard scoreLeft={4} scoreRight={2} time={14} />
        <DuelCard scoreLeft={4} scoreRight={2} time={14} />
      </div>
    </div>
  )
}
