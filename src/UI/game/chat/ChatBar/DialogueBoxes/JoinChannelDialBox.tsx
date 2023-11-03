import Avatar from "@/components/BaseComponents/Avatar";
import Input from "@/components/BaseComponents/Input";
import MainButton from "@/components/BaseComponents/MainButton";
import RadioGroup from "@/components/RadioGroup/RadioGroup";
import Lock from "@/components/svgs/Lock";
import TVIcn from "@/components/svgs/TVIcn";
import { Channel, JoinChannel } from "@/models/Channel.model";
import ChannelSevice from "@/services/Channel.sevice";
import { useContext, useState } from "react";
import ChannelInfo from "../../Chat/ChannelInfo/ChannelInfo";
import { it } from "node:test";

type Props = {
  channelInfo: any;
  event: (data: any) => void;
};

export default function JoinChannelDialBox({ channelInfo, event }: Props) {
  const [password, setPassword] = useState("");
  const [lock, setLock] = useState(true);
  const [channel, setChannel] = useState<Channel>();

  const [errorLog, setErrorLog] = useState([]);
  const [processing, setProcessing] = useState(false);

  const joinChannelHandler = () => {
    const body: JoinChannel = {
      channelID: channelInfo.id,
    };

    if (channelInfo.visibility == "PROTECTED") body["password"] = password;

    setProcessing(true);
    setErrorLog([]);
    ChannelSevice.joinChannel(body)
    .then((res) => {
      ChannelSevice.getChannelById(channelInfo.id)
      .then((res) => {
        event(res.data);
      })
      .catch((err) => {});
    })
    .catch((err) => {
      setProcessing(false);
      setErrorLog(err.response.data.message);
    });
  };

  const lockEvent = (e: any) => {
    setLock(() => !lock);
  };

  return (
    <div className="gradient-border-2  p-4 rounded-xl">
      <div className="flex relative">
        <Avatar
          src={channelInfo.imageUrl}
          className="w-36 h-36 mx-auto m-5 mr-40 ml-40"
        />
      </div>
      <div className="flex flex-col justify-center align-middle">
        <h4 className="text-xl font-semibold self-center">
          {channelInfo.name}
        </h4>
        <p className="self-center">
          <span className="font-light text-sm mr-3">
            {channelInfo.channels?.length} Members
          </span>
          <span className="font-light text-sm text-primary-500">
            {
              channelInfo.channels?.filter(
                (item: any) => item.user.onlineStatus == true
              ).length
            }{" "}
            Online
          </span>
        </p>
      </div>
      {channelInfo.visibility == "PROTECTED" && (
        <Input
          placeholder="Password"
          icon={
            <Lock
              onClick={lockEvent}
              className="hover:scale-110 transition-transform"
            />
          }
          className="mt-6 w-80 h-11 bg-big-stone mx-auto"
          value={password}
          type={lock ? "password" : "text"}
          onChange={(e) => {
            setErrorLog([]);
            setPassword(e.target.value);
          }}
        />
      )}
      {errorLog.length ? (
        <p className="font-light text-red-400 text-center mt-7 text-sm animate__animated animate__headShake">
          {errorLog}
        </p>
      ) : (
        <></>
      )}
      <div className="flex justify-center mt-6">
        <MainButton className="mb-2" onClick={joinChannelHandler}>
          {!processing ? (
            <p className="text-base font-semibold pt-4 pb-4 pr-8 pl-8 rounded-xl flex justify-center">
              Join Channel
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
