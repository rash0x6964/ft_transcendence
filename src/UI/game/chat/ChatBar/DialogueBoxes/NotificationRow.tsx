import Avatar from "@/components/BaseComponents/Avatar"
import Check from "@/components/svgs/Check"
import Cross2 from "@/components/svgs/Cross2"
import DialButton from "./DialButton"
import NotifData from "@/types/NotifData"
import datePipe, { timePipe } from "@/pipes/date.pipes"
type Props = {
  onClick?: () => void
  onDecline?: () => void
  notifData: NotifData
  className?: string
}
export default function NotificationRow({
  onClick,
  notifData,
  onDecline,
  className,
}: Props) {
  return (
    <div className="flex justify-between">
      <div className="flex">
        {notifData.imgSrc && (
          <Avatar className="w-12 h-12 mr-4" src={notifData.imgSrc}></Avatar>
        )}
        <div className="flex flex-col gap-2">
          <div className="text-xs text-gray-500">
            {notifData.title} <span> - </span>
            {notifData.createdAt && (
              <span>{datePipe(new Date(notifData.createdAt))}</span>
            )}
          </div>
          <div className="text-sm text-gray-300">{notifData.message}</div>
          <div></div>
        </div>
      </div>

      <div className="flex my-auto gap-1">
        {notifData.buttonEvent && (
          <DialButton
            onClick={() => {
              onClick && onClick()
              notifData.buttonEvent && notifData.buttonEvent()
            }}
          >
            <Check width={16} height={16} />
          </DialButton>
        )}

        <DialButton onClick={onDecline}>
          <Cross2 width={16} height={16} />
        </DialButton>
      </div>
    </div>
  )
}
