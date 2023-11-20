import Avatar from "@/components/BaseComponents/Avatar"
type Props = {
  src: string
  name: string

  onClick: () => void
}
export default function SearchChannels({ src, name, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="flex gap-4 hover:bg-gray-800 p-2 rounded-md cursor-pointer"
    >
      <Avatar className="w-10 h-10" src={src} />
      <div className="my-auto">{name}</div>
    </div>
  )
}
