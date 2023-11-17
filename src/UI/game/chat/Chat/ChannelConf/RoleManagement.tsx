import { WebSocketContext } from "@/UI/WebSocketContextWrapper"
import Avatar from "@/components/BaseComponents/Avatar"
import UnblockAtList from "@/components/svgs/UnblockAtList"
import { ChannelUser } from "@/models/Channel.model"
import ChannelUserService from "@/services/ChannelUser.service"
import React, { useContext, useEffect, useState } from "react"
import cookieService from "@/services/CookiesService"

export default function RoleManagement({ channelId }: { channelId: string }) {
  const socket = useContext(WebSocketContext)
  const [channelMembers, setChannelMembers] = useState<ChannelUser[]>([])

  useEffect(() => {
    ChannelUserService.getChannelMemberUser(channelId)
      .then(({ data }: { data: ChannelUser[] }) => {
        setChannelMembers(data)
      })
      .catch((err) => {})

    const _join = (data: ChannelUser) => {
      if (data.channelID != channelId) return
      setChannelMembers((prevMemberList) => {
        return prevMemberList.concat(data)
      })
    }
    const _left = (data: any) => {
      if (data.data.channelID != channelId) return
      setChannelMembers((prevMemberList) => {
        return prevMemberList.filter((item) => item.userID != data.sender.id)
      })
    }

    socket?.on("newMemberJoind", _join)
    socket?.on("aMemberLeft", _left)

    return () => {
      socket?.off("newMemberJoind", _join)
      socket?.off("aMemberLeft", _left)
    }
  }, [])

  const roleAction = (id: string, role: string) => {
    let data: any = {
      userID: id,
      channelID: channelId,
      role: role,
    }

    ChannelUserService.updateRole(data)
      .then((res) => {
        setChannelMembers((users) => {
          return users.map((user) => {
            if (user.userID == data.userID) user.role = data.role
            return user
          })
        })
        socket?.emit("roleAction", {
          token: cookieService.getJwtCookie(),
          data: res.data,
        })
      })
      .catch((err) => {})
  }

  return (
    <div className="">
      <div className="flex flex-col gap-3 bg-secondary rounded-xl gradient-border-2 px-5 pb-5 pt-5">
        <p>Members list</p>
        <br />
        {channelMembers.length > 1 ? (
          <div className=" grid grid-cols-6 w-fill pl-7 pr-16 text-sm text-slate-600">
            <span className="col-span-3 pr-60">Member</span>
            <span className=" col-span-1">Join Date</span>
            <span className="col-span-1">Member Since</span>
            <span className="col-span-1">role</span>
          </div>
        ) : (
          <p className="text-center opacity-25">No one banned</p>
        )}

        {channelMembers.map((item, index) => {
          const to_year =
            new Date(Date.now()).getFullYear() -
            new Date(item.joinedAt).getFullYear()

          if (item.role === "OWNER") return

          return (
            <div className="h-14 w-fill bg-secondary   rounded-lg flex pl-7 pr-16 text-sm ">
              <div className="grid grid-cols-7 gap-3 flex-1">
                {/* Member */}
                <div className="self-center col-span-3 flex gap-3">
                  <Avatar
                    key={item.userID}
                    className="w-8 h-8"
                    src={item.user?.avatarUrl}
                    alt={item.user?.userName}
                  />
                  <span className="self-center">{item.user?.userName}</span>
                </div>

                {/* Join Date */}
                <div className="self-center col-span-1 flex gap-3">
                  <span className="self-center">
                    {`${new Date(item.joinedAt).getFullYear()}/${new Date(
                      item.joinedAt
                    ).getMonth()}/${new Date(item.joinedAt).getDay()}`}
                  </span>
                </div>

                {/* Member Since */}
                <div className="self-center col-span-1 flex gap-3">
                  <span>{to_year} Years ago</span>
                </div>

                {/* role */}
                <div className="self-center col-span-1 flex gap-3">
                  <span>{item.role.toLowerCase()}</span>
                </div>

                {/* Unblock */}
                <div className="self-center col-span-1 flex gap-3">
                  {/* <button className="p-3"> */}
                  {item.role === "MEMBER" ? (
                    <button
                      className="p-3 rounded-md bg-slate-800"
                      onClick={() => {
                        roleAction && roleAction(item.userID, "ADMINISTRATOR")
                      }}
                    >
                      set as admin
                    </button>
                  ) : (
                    <button
                      className="p-3 rounded-md bg-slate-800"
                      onClick={() => {
                        roleAction && roleAction(item.userID, "MEMBER")
                      }}
                    >
                      <UnblockAtList key={item.userID} width={16} height={16} />
                    </button>
                  )}
                  {/* </button> */}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
