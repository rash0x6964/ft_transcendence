import { PropsWithChildren, createContext, useEffect, useMemo } from "react"
import io, { Socket } from "socket.io-client"
import env from "@/constants/constants"
import cookieService from "@/services/CookiesService"
import { HttpClient } from "@/services/HttpClient"

export const WebSocketContext = createContext<Socket | null>(null)

export default function WebSocketContextProvider({
  children,
}: PropsWithChildren) {
  const socket = useMemo(
    () =>
      io(env.socketEndPoint, {
        transports: ["websocket"],
        query: {
          userId: cookieService.getJwtCookie(),
        },
      }),
    []
  )
  useEffect(() => {
    socket.connect()
    return () => {
      socket.disconnect()
    }
  }, [])
  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  )
}
