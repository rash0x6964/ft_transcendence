import ChannelInvite from "@/UI/game/chat/Chat/Messages/ChannelInvite"
import Normal from "@/UI/game/chat/Chat/Messages/Normal"
import React, { ReactNode } from "react"

export default function Transformer({
  className,
  message,
  mine,
}: {
  className?: string
  mine: boolean
  message: string | undefined
}): ReactNode | string {
  if (!message) return ""
  const urlregex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
  const channelInviteRegex = /^\?type=invite&id=[A-z\-0-9]*$/

  if (urlregex.test(message))
    return <UrlTransform className={className} mine={mine} message={message} />

  if (
    channelInviteRegex.test(
      message
        .replace(window.location.host + "/game/chat", "")
        .replace("https://", "")
        .replace("http:/", "")
        .replace("/", "")
    )
  ) {
    return (
      <ChannelInvite
        channelId={message.split("&id=")[1]}
        className={`w-full  ${
          mine ? "rounded-tl-none self-start" : "self-end rounded-tr-none"
        } ${className}`}
      />
    )
  }
  return (
    <Normal
      className={`  max-w-full break-all  ${
        mine ? "rounded-tl-none self-start" : "self-end rounded-tr-none"
      } ${className}`}
    >
      {message}
    </Normal>
  )
}

function UrlTransform({
  message,
  mine,
  className,
}: {
  className?: string
  message: string
  mine: boolean
}): ReactNode | string {
  const regex2 =
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/g

  return (
    <Normal
      className={` $ max-w-full break-all  ${
        mine ? "rounded-tl-none self-start" : "self-end rounded-tr-none"
      } ${className}`}
    >
      <div className="">
        {message.split(" ").map((message, i) => {
          if (message.match(regex2))
            return (
              <a
                key={i}
                rel="noopener noreferrer"
                target="_blank"
                className="underline text-primary hover:text-primary-600 mr-1 "
                href={message}
              >
                {message}
              </a>
            )
          return (
            <span className="mr-1" key={i}>
              {message}
            </span>
          )
        })}
      </div>
    </Normal>
  )
}
