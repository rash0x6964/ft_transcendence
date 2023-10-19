import Input from "@/components/BaseComponents/Input"
import Search from "@/components/svgs/Search"
import CreateChanelIcn from "@/components/svgs/CreateChanelIcn"

export default function TopBar() {
  return (
    <div className="flex gap-2 mb-4">
      <Input
        placeholder="Search"
        icon={<Search />}
        className="w-80 h-14 bg-big-stone"
      />
      <div className="flex items-center justify-center bg-big-stone rounded-lg h-14 w-14">
        <CreateChanelIcn />
      </div>
    </div>
  )
}
