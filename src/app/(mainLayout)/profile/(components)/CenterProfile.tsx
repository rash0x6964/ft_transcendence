import PlayerRP from "@/components/MainNavBar/PlayerRP"
import Elo from "./Elo"
import Avatar from "@/components/BaseComponents/Avatar"

export default function CenterProfile() {
  const url =
    "https://steamavatar.io/img/14777429717elSu.jpg"

  return (
    <>
      <div className="relative -top-24">
        <div className=" flex flex-col items-center w-40 gap-4">
          <Avatar override={true} src={url} className="rounded-[22px]" />
          <div className="font-semibold text-xl">rash0x6964</div>
          <Elo className="-mb-12" RP={10050} />
        </div>
      </div>
    </>
  )
}
