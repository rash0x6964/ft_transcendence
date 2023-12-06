import MatchDisplayData from "@/types/MatchDisplayData"
import MatchEntry from "./MatchEntry"
import SectionTitle from "../SectionTitle"
import MainButton from "@/components/BaseComponents/MainButton"

type Props = {
  matches: MatchDisplayData[]
  shouldLoadMore: boolean
  onLoadMore: () => void
}

export default function MatchHistory({
  matches,
  shouldLoadMore,
  onLoadMore,
}: Props) {
  return (
    <div className="my-10 flex-1 flex flex-col ">
      <SectionTitle text="Match History" />
      <div className="overflow-y-scroll">
        {matches.map((match) => (
          <MatchEntry key={match.id} match={match} />
        ))}
      </div>
      {shouldLoadMore && (
        <MainButton className="py-4" onClick={onLoadMore}>
          Load More
        </MainButton>
      )}
    </div>
  )
}
