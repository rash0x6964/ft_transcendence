import Ball from "@/types/Ball"
import Paddle from "@/types/Paddle"
import { useRef, useEffect, useState } from "react"

const secondary: string = "#0F1921"
const primary: string = "#9BECE3"
const white: string = "#FFFFFF"

export default function Game({ width, height }) {
  const canvasRef = useRef(null)
  const [leftPaddle, setLeftPaddle] = useState<Paddle>(new Paddle(1, 40))
  const [rightPaddle, setRightPaddle] = useState<Paddle>(new Paddle(97, 40))
  const [ball, setBall] = useState<Ball>(new Ball(50, 50))
  const draw = (context: CanvasRenderingContext2D) => {
    context.fillStyle = secondary
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    context.fillStyle = primary
    context.fillRect(context.canvas.width / 2, 0, 2, context.canvas.height)
    leftPaddle.draw(context, primary)
    rightPaddle.draw(context, primary)
    ball.draw(context, white)
  }

  useEffect(() => {
    let dpi = window.devicePixelRatio
    let canvas: HTMLCanvasElement = canvasRef.current
    const context: CanvasRenderingContext2D = canvas.getContext("2d")
    // function fix_dpi() {
    //   let style_height = +getComputedStyle(canvas)
    //     .getPropertyValue("height")
    //     .slice(0, -2)
    //   let style_width = +getComputedStyle(canvas)
    //     .getPropertyValue("width")
    //     .slice(0, -2)
    //   console.log(style_height * dpi)
    //   canvas.setAttribute("height", style_height * dpi)
    //   canvas.setAttribute("width", style_width * dpi)
    // }
    // fix_dpi()
    context.imageSmoothingEnabled = false
    draw(context)
  }, [])


  return (
    <canvas
      style={{ imageRendering: "pixelated" }}
      className="w-full h-full "
      ref={canvasRef}
      width={width}
      height={height}
    />
  )
}
