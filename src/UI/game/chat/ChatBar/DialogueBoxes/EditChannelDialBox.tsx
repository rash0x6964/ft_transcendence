import Avatar from "@/components/BaseComponents/Avatar"
import Input from "@/components/BaseComponents/Input"
import MainButton from "@/components/BaseComponents/MainButton"
import RadioGroup from "@/components/RadioGroup/RadioGroup"
import Lock from "@/components/svgs/Lock"
import Plus from "@/components/svgs/Plus"
import TVIcn from "@/components/svgs/TVIcn"

export default function EditChannelDialBox() {
  const options = ["Public", "Private"]

  return (
    <div className="gradient-border-2  p-4 rounded-xl">
      <div className="flex relative">
        <div className="">
          <Avatar
            src="https://i.pinimg.com/1200x/03/91/26/03912644290f0186cbcd2053ee7e1279.jpg "
            className=" w-36 h-36  m-12 mt-16 mr-40 ml-40  border-2 border-white"
          />
          <div className="absolute top-[172px] right-[172px] w-7 h-7 bg-backdrop rounded-full items-center flex  border-white border-2">
            <Plus width={16} height={16} className="text-white mx-auto" />
          </div>
        </div>
      </div>
      <Input
        placeholder="Channel Name"
        icon={<TVIcn width={20} height={20} />}
        className="mb-3 w-80 h-11 bg-big-stone mx-auto"
      />
      <Input
        placeholder="Current Password"
        icon={<Lock />}
        className="mb-3 w-80 h-11 bg-big-stone mx-auto"
      />
      <Input
        placeholder="New Password"
        icon={<Lock />}
        className="mb-7 w-80 h-11 bg-big-stone mx-auto"
      />
      <RadioGroup
        defaultVal="Public"
        radios={options}
        className="flex justify-center gap-10"
      />
      <div className="flex justify-center mt-9">
        <MainButton className="mb-2">
          <p className="text-base font-semibold pt-4 pb-4 pr-8 pl-8 rounded-xl">
            Edit Channel
          </p>
        </MainButton>
      </div>
    </div>
  )
}
