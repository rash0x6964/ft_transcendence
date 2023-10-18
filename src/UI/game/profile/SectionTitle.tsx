type Props = {
  text: string
  className?: string
}

export default function SectionTitle({ text, className }: Props) {
  return <h2 className={className + " font-semibold p-3"}>{text}</h2>
}
