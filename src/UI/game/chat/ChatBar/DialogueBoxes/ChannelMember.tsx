import AddFriend from "@/components/svgs/AddFriend"
import MailLetter from "@/components/svgs/MailLetter"

export default function Channel() {
  const url = "https://steamavatar.io/img/14777429717elSu.jpg"

  return (
    <div className="flex justify-between w-[28rem]">
      <div className="flex ml-2">
        <img className="m-2 w-10 h-10 rounded-full" src={url} alt="" />
        <p className="text-sm my-auto">K1NCH3RO</p>
      </div>
      <div className="flex my-auto gap-1">
        <MailLetter />
        <AddFriend />
      </div>
    </div>
  )
}
