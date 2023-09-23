import MatchInfo from "./MatchInfo"

type Props = {
  name: string
}

export default function MatchEntry({ name }: Props) {
  return (
    <>
      <div className="flex">
        <MatchInfo />
        <div>Match {name}</div>
      </div>
    </>
  )
}
