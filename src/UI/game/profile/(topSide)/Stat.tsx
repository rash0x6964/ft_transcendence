type Props = {
  title: string
  value: string
}

export default function Stat({ title, value }: Props) {
  return (
    <div className="flex flex-col items-center my-auto">
      <div className="text-white text-xl font-semibold mb-1">{value}</div>
      <div className="text-gray-600 text-sm font-medium">{title}</div>
    </div>
  )
}
