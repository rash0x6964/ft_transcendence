import Input from "@/components/BaseComponents/Input"
import MainButton from "@/components/BaseComponents/MainButton"
import RadioGroup from "@/components/RadioGroup/RadioGroup"
import CreateChanelIcn from "@/components/svgs/CreateChanelIcn"
import Lock from "@/components/svgs/Lock"
import TVIcn from "@/components/svgs/TVIcn"

export default function CreateChannelDialBox() {
  const options = ["Public", "Private"]

  return (
    // <div className="rounded-xl p-[1px] bg-gradient-to-br from-gray-600 via-black to-gray-600">
    <div className="bg-secondary p-4 rounded-xl">
      <img
        className="rounded-full w-36 h-36 mx-auto m-12 mt-16 mr-40 ml-40"
        src="https://empowher.org/wp-content/uploads/2021/03/image-placeholder-350x350-1.png"
        alt=""
      />
      <Input
        placeholder="Channel Name"
        icon={<TVIcn width={20} height={20} />}
        className="mb-4 w-80 h-11 bg-big-stone mx-auto"
      />
      <Input
        placeholder="Password"
        icon={<Lock />}
        className="mb-7 w-80 h-11 bg-big-stone mx-auto"
      />
      <RadioGroup
        defaultVal="Public"
        radios={options}
        className="flex justify-center gap-4"
      />
      <div className="flex justify-center mt-20">
        <MainButton className="mb-2">
          <p className="text-base font-semibold pt-4 pb-4 pr-8 pl-8 rounded-xl">
            Create Channel
          </p>
        </MainButton>
      </div>
    </div>
    // </div>
  )
}
