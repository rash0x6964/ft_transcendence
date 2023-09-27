import Input from "@/components/BaseComponents/Input"
import RadioGroup from "@/components/RadioGroup/RadioGroup"
import CreateChanelIcn from "@/components/svgs/CreateChanelIcn"
import Lock from "@/components/svgs/Lock"

export default function CreateChannelDialBox() {
  const options = ["Public", "Private"]

  return (
    <div className="bg-secondary p-4">
      <Input
        placeholder="Channel Name"
        className="mb-4 w-80 h-11 bg-big-stone"
      />
      <Input
        placeholder="Password"
        icon={<Lock />}
        className="mb-7 w-80 h-11 bg-big-stone"
      />
      <RadioGroup
        defaultVal="Public"
        radios={options}
        className="flex justify-center gap-4"
      />
    </div>
  )
}
