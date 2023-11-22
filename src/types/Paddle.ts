export default class Paddle {
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.w = 1
    this.h = 20
  }
  x: number
  y: number
  w: number
  h: number

  drawHor(context: CanvasRenderingContext2D, color: string) {
    context.fillStyle = color
    context.fillRect(
      (this.x * context.canvas.width) / 100,
      (this.y * context.canvas.height) / 100,
      (this.w * context.canvas.width) / 100,
      (this.h * context.canvas.height) / 100
    )
  }

  drawVer(context: CanvasRenderingContext2D, color: string) {
    context.fillStyle = color
    context.fillRect(
      (this.y * context.canvas.width) / 100,
      (this.x * context.canvas.height) / 100,
      (this.h * context.canvas.width) / 100,
      (this.w * context.canvas.height) / 100
    )
  }
}
