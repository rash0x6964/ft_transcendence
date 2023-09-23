type Props = {
  type: "Normal" | "Ranked"
  win: boolean
}

export default function MatchInfo({ type, win }: Props) {
  return (
    <>
      <div className="p-3">Info</div>
    </>
  )
}
