import Bell from "../svgs/Bell"
import NotifData from "@/types/NotifData"
import Avatar from "./Avatar"
import MainButton from "./MainButton"
type Props = {
  onClick?: () => void
  notifData: NotifData
  className?: string
}

export default function Notification({ className, notifData, onClick }: Props) {
  if (notifData.type == "error")
    return (
      <div
        className={`bg-backdrop w-[26rem]  py-2 px-4 rounded-lg  border border-red-500 fixed z-[100] transition-all  right-0 mb-2 mr-20 ${className}`}
      >
        <div className="w-full h-full ">
          <div className="flex justify-between mb-2">
            <div className="text-sm text-gray-500">{notifData.title}</div>
            <Bell className="text-red-500" width={20} height={20} />
          </div>
          <div className="flex ">
            <div className="my-auto">{notifData.message}</div>
          </div>
        </div>
      </div>
    )
  else if (notifData.type == "success")
    return (
      <div
        className={`bg-backdrop w-[26rem]  py-2 px-4 rounded-lg  border border-green-500 fixed z-[100] transition-all  right-0 mb-2 mr-20 ${className}`}
      >
        <div className="w-full h-full ">
          <div className="flex justify-between mb-2">
            <div className="text-sm text-gray-500">{notifData.title}</div>
            <Bell className="text-green-500" width={20} height={20} />
          </div>
          <div className="flex ">
            <div className="my-auto">{notifData.message}</div>
          </div>
        </div>
      </div>
    )
  else if (notifData.type == "notice")
    return (
      <div
        className={`bg-backdrop w-[26rem]  py-2 px-4 rounded-lg  border border-yellow-500 fixed z-[100] transition-all  right-0 mb-2 mr-20 ${className}`}
      >
        <div className="w-full h-full ">
          <div className="flex justify-between mb-2">
            <div className="text-sm text-gray-500">{notifData.title}</div>
            <Bell className="text-yellow-500" width={20} height={20} />
          </div>
          <div className="flex ">
            <div className="my-auto">{notifData.message}</div>
          </div>
        </div>
      </div>
    )
  else
    return (
      <div
        className={`bg-backdrop w-screen sm:w-[26rem]  py-2 px-4 rounded-lg  border border-primary fixed z-[100] transition-all mr-0 sm:mr-20 right-0 mb-2 sm:mx-auto ${className}`}
      >
        <div className="w-full h-full ">
          <div className="flex justify-between mb-2">
            <div className="text-sm text-gray-500">{notifData.title}</div>
            <Bell className="text-primary" width={20} height={20} />
          </div>
          <div className="flex justify-between">
            <div className="flex">
              {notifData.imgSrc && (
                <Avatar
                  className="w-10 h-10 mr-2 my-auto"
                  src={notifData.imgSrc}
                />
              )}
              <div className="my-auto">{notifData.message}</div>
            </div>
            {notifData.buttonEvent && (
              <MainButton
                onClick={() => {
                  onClick && onClick()
                  notifData.buttonEvent && notifData.buttonEvent()
                }}
                className="ml-1 px-4 py-2 h-fit my-auto "
              >
                {notifData.buttonTitle}
              </MainButton>
            )}
          </div>
        </div>
      </div>
    )
}
