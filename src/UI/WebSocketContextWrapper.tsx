import { PropsWithChildren, createContext, useEffect, useMemo } from "react"
import io, { Socket } from "socket.io-client"
import env from "@/environment/environment"
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
