type Props = {
  text: string
}

export default function SectionTitle({ text }: Props) {
  return <h2 className="font-semibold p-3">{text}</h2>
}
