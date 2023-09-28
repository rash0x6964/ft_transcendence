import Input from "@/components/BaseComponents/Input"
import MainButton from "@/components/BaseComponents/MainButton"
import RadioGroup from "@/components/RadioGroup/RadioGroup"
import Lock from "@/components/svgs/Lock"
import TVIcn from "@/components/svgs/TVIcn"

export default function EditChannelDialBox() {
  const options = ["Public", "Private"]

  return (
    // <div className="rounded-xl p-[1px] bg-gradient-to-br from-gray-600 via-black to-gray-600">
    <div className="bg-secondary p-4 rounded-xl">
      <div className="flex relative">
        <img
          className="rounded-full w-36 h-36 mx-auto m-12 mt-16 mr-40 ml-40"
          src="https://i.pinimg.com/1200x/03/91/26/03912644290f0186cbcd2053ee7e1279.jpg"
          alt=""
        />
        <img
          className="absolute top-[172px] right-[172px] w-10 h-10 bg-gray-200 rounded-full"
          src="https://cdn-icons-png.flaticon.com/512/262/262038.png"
          alt=""
        />
      </div>
      <Input
        placeholder="Channel Name"
        icon={<TVIcn width={20} height={20} />}
        className="mb-4 w-80 h-11 bg-big-stone mx-auto"
      />
      <Input
        placeholder="Current Password"
        icon={<Lock />}
        className="mb-4 w-80 h-11 bg-big-stone mx-auto"
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
    // </div>
  )
}
