type Props = {
  name: string
}

export default function Achievement({ name }: Props) {
  const url = "https://cdn-icons-png.flaticon.com/512/3791/3791606.png"

  return <img className="h-24 w-24 p-3 rounded-full" src={url} alt={name} />
}
