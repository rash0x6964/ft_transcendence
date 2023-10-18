import MainButton from "@/components/BaseComponents/MainButton"
import LinkIcn from "../icons/LinkIcn"

export default function Link() {
  return (
    <MainButton className="w-28 h-10 py-3">
      <div className="flex justify-between px-2 items-center">
        <p>Link</p>
        <LinkIcn />
      </div>
    </MainButton>
  )
}
