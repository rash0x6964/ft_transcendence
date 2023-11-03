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
import UploadService from "@/services/Upload.service";
import Image from "next/image";

type Props = {
  handler: () => void;
  createChannelEvent: (data: Channel) => void;
};

export default function CreateChannelDialBox({
  handler,
  createChannelEvent,
}: Props) {
  const [visibility, setVisibility] = useState<
    "PRIVATE" | "PUBLIC" | "PROTECTED" | any
  >("PUBLIC");
  const options = ["Public", "Private"];

  const [avatar, setAvatar] = useState("");
  const [channelName, setChannelName] = useState("");
  const [password, setPassword] = useState("");
  const [errorLog, setErrorLog] = useState([]);
  const [processing, setProcessing] = useState(false);

  const [lock, setLock] = useState(true);

  const onCreate = () => {
    let body: CreateChannel = {
      imageUrl:
        avatar != ""
          ? avatar
          : "https://i.pinimg.com/564x/7b/fa/54/7bfa549dcba2f80b494eb825f64527e1.jpg",
      name: channelName,
      visibility:
        visibility == "PUBLIC" && password.length ? "PROTECTED" : visibility,
    };

    if (body.visibility == "PROTECTED") body["password"] = password;

    setErrorLog([]);
    setProcessing(true);
    ChannelSevice.createChannel(body)
      .then((res) => {
        createChannelEvent(res.data);
        handler();
      })
      .catch((err) => {
        setErrorLog(err.response.data.message);
        setProcessing(false);
      });
  };

  const onFileChange = (e: any) => {
    if (!e.target.files[0]) return;
    const formdata = new FormData();
    formdata.append("files", e.target.files[0], e.target.files[0].name);
    UploadService.uploadFiles("avatars", formdata)
      .then((res) => {
        setAvatar(res.data[0].url);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const lockEvent = (e: any) => {
    setLock(() => !lock);
  };

  return (
    <div className="gradient-border-2  p-4 rounded-xl ">
      <div className="flex relative">
        <div className="rounded-full w-36 h-36 flex flex-col justify-center mx-auto m-12 mt-16 mr-40 ml-40  border-gray-500 border-2 bg-[#D9D9D9]">
          {avatar != "" ? (
            <Image
              width={680}
              height={128}
              src={avatar}
              alt="avatar"
              className="w-[680px] h-36  object-cover  mx-auto rounded-full border-2"
            />
          ) : (
            <Camera className="text-black mx-auto" width={50} height={50} />
          )}
        </div>
        <div className="absolute top-[172px] right-[172px] w-7 h-7 bg-gray-200 rounded-full items-center flex  border-gray-500 border-2">
          <Plus
            width={16}
            height={16}
            className="text-black mx-auto absolute left-1"
          />
          <input
            type="file"
            className="opacity-0 rounded-full cursor-pointer"
            onChange={onFileChange}
            name="avatars"
          ></input>
        </div>
      </div>
      <Input
        placeholder="Channel Name"
        icon={<TVIcn width={20} height={20} />}
        className="mb-4 w-80 h-11 bg-big-stone mx-auto"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />
      {visibility == "PUBLIC" ? (
        <Input
          placeholder="Password"
          icon={
            <Lock
              onClick={lockEvent}
              className="hover:scale-110 transition-transform"
            />
          }
          className="mb-7 w-80 h-11 bg-big-stone mx-auto"
          value={password}
          type={lock ? "password" : "text"}
          onChange={(e) => setPassword(e.target.value)}
        />
      ) : (
        <></>
      )}
      <RadioGroup
        defaultVal={visibility}
        radios={options}
        onChange={(value) => setVisibility(value.toUpperCase())}
        className="flex justify-center gap-10"
      />
      {errorLog.length?<p className="font-light text-red-400 text-center mt-7 text-sm animate__animated animate__headShake">
        {errorLog}
      </p>: <></>}
      <div className="flex justify-center mt-7">
        <MainButton className="mb-2 transition-all" onClick={onCreate}>
          {!processing ? (
            <p className="text-base font-semibold pt-4 pb-4 pr-8 pl-8 rounded-xl flex justify-center">
              Create Channel
            </p>
          ) : (
            <p className="text-base font-semibold pt-4 pb-4 pr-8 pl-8 rounded-xl flex justify-center">
              <span className="self-center channelCreateLoader"></span>
              <span className="self-center mx-3">Processing...</span>
            </p>
          )}
        </MainButton>
      </div>
    </div>
  );
}
