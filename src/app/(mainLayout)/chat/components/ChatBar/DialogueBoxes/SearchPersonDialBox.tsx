import Input from "@/components/BaseComponents/Input"
import Search from "@/components/svgs/Search"
import ChannelMember from "./ChannelMember"

export default function SearchPersonDialBox() {
  return (
    <div className="bg-secondary p-4 rounded-xl flex flex-col gap-1 ">
      <Input
        className="mb-4 w-full h-11 bg-big-stone mx-auto"
        placeholder="Search"
        icon={<Search />}
      />
      <ChannelMember />
      <ChannelMember />
      <ChannelMember />
      <ChannelMember />
      <ChannelMember />
      <ChannelMember />
      <ChannelMember />
      <ChannelMember />
    </div>
  )
}
