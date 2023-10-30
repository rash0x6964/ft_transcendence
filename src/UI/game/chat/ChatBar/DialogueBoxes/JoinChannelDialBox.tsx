import Avatar from "@/components/BaseComponents/Avatar";
import Input from "@/components/BaseComponents/Input";
import MainButton from "@/components/BaseComponents/MainButton";
import RadioGroup from "@/components/RadioGroup/RadioGroup";
import Lock from "@/components/svgs/Lock";
import TVIcn from "@/components/svgs/TVIcn";
import { JoinChannel } from "@/models/Channel.model";
import ChannelSevice from "@/services/Channel.sevice";
import { useState } from "react";

type Props = {
  channelInfo: any;
};

export default function JoinChannelDialBox({ channelInfo }: Props) {

  const [password, setPassword] = useState("")

  const joinChannelHandler = () => {
    const body: JoinChannel = {
      channelID: channelInfo.id
    }

    if (channelInfo.visibility == "PROTECTED")
      body["password"] = password

    ChannelSevice.joinChannel(body).then((res) => {
      console.log(res.data);
    }).catch((err) => {

    })
  }

  return (
    <div className="gradient-border-2  p-4 rounded-xl">
      <div className="flex relative">
        <Avatar
          src={channelInfo.imageUrl}
          className="w-36 h-36 mx-auto m-5 mr-40 ml-40"
        />
      </div>
      <div className="flex flex-col justify-center align-middle">
        <h4 className="text-xl font-semibold self-center">{channelInfo.name}</h4>
        <p className="self-center">
          <span className="font-light text-sm mr-3">
            {channelInfo.channels?.length} Members
          </span>
          <span className="font-light text-sm text-primary-500">
            {
              channelInfo.channels?.filter(
                (item: any) => item.onlineStatus == true
              ).length
            }{" "}
            Online
          </span>
        </p>
      </div>
      {channelInfo.visibility == "PROTECTED" && (
        <Input
          placeholder="Password"
          icon={<Lock />}
          className="mt-16 w-80 h-11 bg-big-stone mx-auto"
          value=""
          onChange={(e) => setPassword(e.target.value)}
        />
      )}
      <div className="flex justify-center mt-6">
        <MainButton className="mb-2" onClick={joinChannelHandler}>
          <p className="text-base font-semibold pt-4 pb-4 pr-11 pl-11 rounded-xl">
            Join Channel
          </p>
        </MainButton>
      </div>
    </div>
  );
}
