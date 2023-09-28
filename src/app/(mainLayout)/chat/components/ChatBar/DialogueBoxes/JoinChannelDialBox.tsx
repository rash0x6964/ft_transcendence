import Avatar from "@/components/BaseComponents/Avatar"
import Input from "@/components/BaseComponents/Input"
import MainButton from "@/components/BaseComponents/MainButton"
import RadioGroup from "@/components/RadioGroup/RadioGroup"
import Lock from "@/components/svgs/Lock"
import TVIcn from "@/components/svgs/TVIcn"

export default function JoinChannelDialBox() {
  const channelName = "Pong Pros"

  return (
    <div className="bg-secondary p-4 rounded-xl">
      <div className="flex relative">
        <Avatar
          src="https://i.pinimg.com/1200x/03/91/26/03912644290f0186cbcd2053ee7e1279.jpg"
          className="w-36 h-36 mx-auto m-5 mt-16 mr-40 ml-40"
        />
      </div>
      <div className="flex justify-center">
        <h4 className="text-xl font-semibold">{channelName}</h4>
      </div>
      <Input
        placeholder="Password"
        icon={<Lock />}
        className="mt-16 w-80 h-11 bg-big-stone mx-auto"
      />
      <div className="flex justify-center mt-6">
        <MainButton className="mb-2">
          <p className="text-base font-semibold pt-4 pb-4 pr-11 pl-11 rounded-xl">
            Join Channel
          </p>
        </MainButton>
      </div>
    </div>
  )
}
