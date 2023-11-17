import Avatar from "@/components/BaseComponents/Avatar"
import Check from "@/components/svgs/Check"
import Cross2 from "@/components/svgs/Cross2"
import DialButton from "./DialButton"

export default function NotificationRow() {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <Avatar
          className="w-12 h-12 mr-4"
          src="https://avatars.githubusercontent.com/u/60697106?v=4"
        ></Avatar>
        <div className="flex flex-col gap-2">
          <div className="text-xs text-gray-500">Game invite</div>
          <div className="text-sm text-gray-300">
            KiNCH3RO invited you to lobby
          </div>
          <div></div>
        </div>
      </div>

      <div className="flex my-auto gap-1">
        <DialButton>
          <Check width={16} height={16} />
        </DialButton>
        <DialButton>
          <Cross2 width={16} height={16} />
        </DialButton>
      </div>
    </div>
  )
}
