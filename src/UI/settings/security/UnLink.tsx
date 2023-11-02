import MainButton from "@/components/BaseComponents/MainButton"
import LinkIcn from "../icons/LinkIcn"

type Props = {
  provider: "GITHUB" | "INTRA" | "GOOGLE"
}

export default function UnLink({ provider }: Props) {
  return (
    <MainButton className="bg-red-700 w-28 h-10 py-3">
      <div className="flex justify-between px-2 items-center">
        <p>Unlink</p>
        <LinkIcn />
      </div>
    </MainButton>
  )
}
