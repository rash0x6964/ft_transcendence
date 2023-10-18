import Check from "@/components/svgs/Check"
import Cross2 from "@/components/svgs/Cross2"

export default function FriendRequest() {
  const url = "https://steamavatar.io/img/1477742864kHhXM.jpg"

  return (
    <div className="flex justify-between w-[28rem] mr-4">
      <div className="flex ml-4">
        <img className="m-2 w-10 h-10 rounded-full" src={url} alt="" />
        <p className="text-sm my-auto">K1NCH3RO</p>
      </div>
      <div className="flex my-auto gap-1">
        <Check />
        <Cross2 />
      </div>
    </div>
  )
}
