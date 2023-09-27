import PlayerRP from "@/components/MainNavBar/PlayerRP"
import Elo from "./Elo"
import Avatar from "@/components/BaseComponents/Avatar"

export default function CenterProfile() {
  const url =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBLE2R35SV62Enw03QHS5AY-LUr6HOhmHvrA&usqp=CAU"

  return (
    <>
      <div className="relative -top-24">
        <div className=" flex flex-col items-center w-40 gap-4">
          <Avatar src={url} className="rounded-[20px]" />
          <div className="font-semibold text-xl">rash0x6964</div>
          <Elo className="-mb-12" RP={10050} />
        </div>
      </div>
    </>
  )
}
