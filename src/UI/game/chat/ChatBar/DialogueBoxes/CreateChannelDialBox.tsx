import Input from "@/components/BaseComponents/Input";
import MainButton from "@/components/BaseComponents/MainButton";
import RadioGroup from "@/components/RadioGroup/RadioGroup";
import Camera from "@/components/svgs/Camera";
import Lock from "@/components/svgs/Lock";
import Plus from "@/components/svgs/Plus";
import TVIcn from "@/components/svgs/TVIcn";
import { useState } from "react";
import ChannelSevice from "@/services/Channel.sevice";
import { Channel, CreateChannel } from "@/models/Channel.model";

type Props = {
  handler: () => void;
};

export default function CreateChannelDialBox({ handler }: Props) {
  const [visibility, setVisibility] = useState<
    "PRIVATE" | "PUBLIC" | "PROTECTED" | any
  >("PUBLIC");
  const options = ["PUBLIC", "PRIVATE"];

  const [channelName, setChannelName] = useState("");
  const [password, setPassword] = useState("");
  const [errorLog, setErrorLog] = useState([]);

  const onCreate = () => {
    let body: CreateChannel = {
      imageUrl:
        "https://i.pinimg.com/564x/7b/fa/54/7bfa549dcba2f80b494eb825f64527e1.jpg",
      name: channelName,
      visibility:
        visibility == "PUBLIC" && password.length ? "PROTECTED" : visibility,
    };

    if (body.visibility == "PROTECTED") body["password"] = password;

    ChannelSevice.createChannel(body)
      .then((res) => {
        console.log("response", res.data);
        handler();
      })
      .catch((err) => {
        setErrorLog(err.response.data.message);
      });
  };

  return (
    <div className="gradient-border-2  p-4 rounded-xl ">
      <div className="flex relative">
        <div className="rounded-full w-36 h-36 flex flex-col justify-center mx-auto m-12 mt-16 mr-40 ml-40  border-gray-500 border-2 bg-[#D9D9D9]">
          <Camera className="text-black mx-auto" width={50} height={50} />
        </div>
        <div className="absolute top-[172px] right-[172px] w-7 h-7 bg-gray-200 rounded-full items-center flex  border-gray-500 border-2">
          <Plus width={16} height={16} className="text-black mx-auto" />
        </div>
      </div>
      <Input
        placeholder="Channel Name"
        icon={<TVIcn width={20} height={20} />}
        className="mb-4 w-80 h-11 bg-big-stone mx-auto"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />
      {
        visibility == "PUBLIC" ? <Input
          placeholder="Password"
          icon={<Lock />}
          className="mb-7 w-80 h-11 bg-big-stone mx-auto"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />: <></>
      }
      <RadioGroup
        defaultVal="PUBLIC"
        radios={options}
        onChange={(value)=> setVisibility(value)}
        className="flex justify-center gap-10"
      />
      <p className="font-light text-red-400 text-center mt-7 text-sm">{errorLog}</p>
      <div className="flex justify-center mt-7">
        <MainButton className="mb-2" onClick={onCreate}>
          <p className="text-base font-semibold pt-4 pb-4 pr-8 pl-8 rounded-xl">
            Create Channel
          </p>
        </MainButton>
      </div>
    </div>
  );
}
