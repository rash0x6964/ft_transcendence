import Search from "@/components/svgs/Search"
import { useEffect, useState } from "react"
import { useContext } from "react"
import Input from "@/components/BaseComponents/Input"
import Avatar from "@/components/BaseComponents/Avatar"
import SearchUsers from "./SearchUsers"
import UserService from "@/services/User.Service"
import { User } from "@/types/User"
import ChannelSevice from "@/services/Channel.sevice"
import { Channel } from "@/models/Channel.model"
import SearchChannels from "./SearchChannels"
import DirectMessageService from "@/services/DirectMessageService"
import DirectMessage from "@/models/DirectMessage.model"
import { WebSocketContext } from "@/UI/WebSocketContextWrapper"
import { useRouter } from "next/router"

type Props = {
  clickOnChannel: (data: Channel) => void
}
export default function SearchChat({ clickOnChannel }: Props) {
  const [search, setSearch] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [channels, setChannels] = useState<Channel[]>([])
  const [loading, setLoading] = useState<boolean>()
  const socket = useContext(WebSocketContext)
  const router = useRouter()
  const fetchData = () => {
    return Promise.all([
      ChannelSevice.getChannelByName(search),
      UserService.findByName(search),
    ])
  }

  const handleSendMessage = (playerID: string) => {
    DirectMessageService.create(playerID)
      .then(({ data }: { data: DirectMessage }) => {
        socket?.emit("directMessage", { data })
        router.push(
          {
            pathname: "/game/chat",
            query: {
              type: "DM",
              id: data.id,
            },
          },
          "/game/chat"
        )
      })
      .catch((err) => {})
  }

  const handleChannelJoin = () => {}
  useEffect(() => {
    setUsers([])
    setChannels([])
    if (search == "") {
      return
    }
    setLoading(true)
    const timeout = setTimeout(() => {
      fetchData()
        .then((data) => {
          console.log(data)

          setLoading(false)
          setChannels(data[0].data)
          setUsers(data[1].data)
        })
        .catch((err) => {
          setLoading(false)
        })
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [search])
  return (
    <div className="w-full h-full flex flex-col justify-center  animate__animated animate__fadeIn">
      <div className="w-2/5 mx-auto">
        <Input
          className="bg-secondary   drop-shadow-lg w-full py-6 px-3 mb-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a Players , Public Channels"
          icon={<Search />}
        />

        {search != "" && (
          <div className="w-full bg-secondary max-h-[30vh] overflow-scroll rounded-xl drop-shadow-xl py-3 px-6 ">
            {loading && (
              <div className="my-2 mx-auto flex justify-center">
                <span className="loaderLobby "> </span>{" "}
              </div>
            )}
            {users.length == 0 && channels.length == 0 && loading == false && (
              <div className="mx-auto w-full text-center my-4">
                {" "}
                No Result found{" "}
              </div>
            )}
            <div>
              {users.length > 0 && (
                <>
                  <div className=" text-sm font-light text-gray-500 mb-4">
                    Players
                  </div>
                  <div className="flex flex-col">
                    {users.map((user) => (
                      <SearchUsers
                        onClick={() => handleSendMessage(user.id)}
                        key={user.id}
                        src={user.avatarUrl}
                        name={user.userName}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div>
              {channels.length > 0 && (
                <>
                  <div className=" text-sm font-light text-gray-500 mb-4">
                    public channels
                  </div>
                  <div className="flex flex-col">
                    {channels.map((channel) => (
                      <SearchChannels
                        onClick={() => clickOnChannel(channel)}
                        key={channel.id}
                        src={channel.imageUrl}
                        name={channel.name}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
