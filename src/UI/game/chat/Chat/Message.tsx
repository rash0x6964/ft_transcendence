import React from "react"
import Avatar from "@/components/BaseComponents/Avatar"
import Normal from "./Messages/Normal"
import LobbyInvite from "./Messages/LobbyInvite"
import ChannelInvite from "./Messages/ChannelInvite"
import Attachment from "./Messages/Attachment"
import ImageAttachment from "./Messages/ImageAttachment"
import VideoAttachment from "./Messages/VideoAttachment"
import Message from "@/models/Message.model"
import datePipe from "@/pipes/date.pipes"
import Transformer from "./Messages/Transformer"

type Props = {
  blocked?: boolean
  avatar: boolean
  message?: Message
  mine: boolean
}

export default function Message({
  avatar,
  mine,
  message,
  blocked = false,
}: Props) {
  const blockStyle = blocked ? "blur-sm hover:blur-0" : ""
  if (message?.attachment)
    return (
      <div className={`flex  gap-3 ${!mine && "flex-row-reverse"} `}>
        {avatar && (
          <div className="flex flex-col  ">
            <Avatar
              className="w-12 h-12 mb-2"
              src={message?.sender?.avatarUrl}
            />
            <span className="text-[10px] text-gray-600 ">
              {datePipe(message.createdAt)}{" "}
            </span>
          </div>
        )}
        {!avatar && <div className="w-12"></div>}
        <div className="flex flex-col gap-2 max-w-[40%] ">
          {avatar && (
            <div className={mine ? "self-start" : "self-end"}>
              {!blocked && <span>{message?.sender?.userName}</span>}
              {blocked && <span className="text-gray-700">Blocked</span>}
            </div>
          )}

          {message.attachment.type == "FILE" && (
            <Attachment
              className={`w-96  ${
                mine ? "rounded-tl-none self-start" : "self-end rounded-tr-none"
              } ${blockStyle}`}
              url={message.attachment.url}
              fileName={message.attachment.name}
              fileSize={message.attachment.size}
            />
          )}

          {message.attachment.type == "VIDEO" && (
            <VideoAttachment
              fileName={message.attachment.name}
              src={message.attachment.url}
              className={`  ${
                mine ? "rounded-tl-none self-start" : "self-end rounded-tr-none"
              } ${blockStyle}`}
            />
          )}

          {message.attachment.type == "IMAGE" && (
            <ImageAttachment
              fileName={message.attachment.name}
              src={message.attachment.url}
              className={`   ${
                mine ? "rounded-tl-none self-start" : "self-end rounded-tr-none"
              } ${blockStyle}`}
            />
          )}
        </div>
      </div>
    )

  return (
    <div className={`flex gap-3 ${!mine && "flex-row-reverse"} `}>
      {avatar && (
        <div className="flex flex-col  ">
          <Avatar className="w-12 h-12 mb-2" src={message?.sender?.avatarUrl} />
          <span className="text-[10px] text-gray-600 ">
            {message && datePipe(message?.createdAt)}
          </span>
        </div>
      )}
      {!avatar && <div className="w-12"></div>}
      <div className="flex flex-col gap-2 w-[40%]">
        {avatar && (
          <div className={mine ? "self-start" : "self-end"}>
            {!blocked && <span>{message?.sender?.userName}</span>}
            {blocked && <span className="text-gray-600">Blocked</span>}
          </div>
        )}

        <Transformer
          className={blockStyle}
          mine={mine}
          message={message?.content}
        />
      </div>
    </div>
  )
}
