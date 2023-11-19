import { WebSocketContext } from "@/UI/WebSocketContextWrapper"
import CookiesService from "@/services/CookiesService"
import Ball from "@/types/Ball"
import Paddle from "@/types/Paddle"
import { useRef, useEffect, useContext } from "react"

const secondary: string = "#0F1921"
const primary: string = "#9BECE3"
const white: string = "#FFFFFF"

type Props = {
  width: number
  height: number
}

export default function Game({ width, height }: Props) {
  const socket = useContext(WebSocketContext)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const draw = (ball: Ball, leftPaddle: Paddle, rightPaddle: Paddle) => {
    let canvas: HTMLCanvasElement | null = canvasRef.current
    if (!canvas) return
    const context: CanvasRenderingContext2D | null = canvas.getContext("2d")
    if (!context) return
    context.clearRect(0, 0, width, height)
    context.beginPath()
    context.fillStyle = secondary
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    context.fillStyle = primary
    context.fillRect(context.canvas.width / 2, 0, 2, context.canvas.height)
    leftPaddle.draw(context, primary)
    rightPaddle.draw(context, primary)
    ball.draw(context, white)
  }

  const keyDownHandler = (ev: any) => {
    if (ev.key == "w") {
      socket?.emit("paddleUp", {
        token: CookiesService.getJwtCookie(),
        data: { isUP: true },
      })
    }
    if (ev.key == "s") {
      socket?.emit("paddleDown", {
        token: CookiesService.getJwtCookie(),
        data: { isDown: true },
      })
    }
  }

  const keyUpHandler = (ev: any) => {
    if (ev.key == "w") {
      socket?.emit("paddleUp", {
        token: CookiesService.getJwtCookie(),
        data: { isUP: false },
      })
    }
    if (ev.key == "s") {
      socket?.emit("paddleDown", {
        token: CookiesService.getJwtCookie(),
        data: { isDown: false },
      })
    }
  }

  useEffect(() => {
    if (!socket) return
    let handler = (data: any) => {
      draw(
        new Ball(data.ball.x, data.ball.y),
        new Paddle(data.paddle1.x, data.paddle1.y),
        new Paddle(data.paddle2.x, data.paddle2.y)
      )
    }
    socket?.on("gameData", handler)
    document.addEventListener("keydown", keyDownHandler)
    document.addEventListener("keyup", keyUpHandler)
    return () => {
      socket?.off("gameData")
      document.removeEventListener("keydown", keyDownHandler)
      document.removeEventListener("keyup", keyUpHandler)
    }
  }, [])

  return (
    <canvas
      style={{ imageRendering: "pixelated" }}
      className="w-full h-full focus:outline-none "
      ref={canvasRef}
      width={width}
      height={height}
    />
  )
}
