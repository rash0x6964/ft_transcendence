type Props = {
  title: string
  value: string
}

export default function Stat({ title, value }: Props) {
  return (
    <div className="">
      <div className="flex flex-col items-center">
        <p className="text-sm text-gray-600 font-semibold mb-5 mt-2">{title}</p>
        <h4 className="p-1 text-xl font-extrabold">{value}</h4>
      </div>
    </div>
  )
}
