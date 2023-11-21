import Avatar from "@/components/BaseComponents/Avatar"
import { useState } from "react"
type Props = {
  src: string
  name: string
  onClick: () => void
}
export default function SearchUsers({ src, name, onClick }: Props) {
  const [loading, setLoading] = useState(false)
  return (
    <div
      onClick={() => {
        setLoading(true)
        onClick()
      }}
      className="flex gap-4 hover:bg-gray-800 p-2 rounded-md cursor-pointer"
    >
      <Avatar className="w-10 h-10" src={src} />
      <div className="flex justify-between flex-1">
        <div className="my-auto">{name}</div>
        <div className="scale-75">
          {loading && <span className="scale-50 loaderLobby "></span>}
        </div>
      </div>
    </div>
  )
}
