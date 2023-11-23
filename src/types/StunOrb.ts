export default class StunOrb {
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.r = 1
  }
  x: number
  y: number
  r: number

  drawHor(context: CanvasRenderingContext2D, color: string) {
    context.moveTo(this.x, this.y)
    context.fillStyle = color
    context.arc(
      (this.x * context.canvas.width) / 100,
      (this.y * context.canvas.height) / 100,
      (this.r * (context.canvas.width / 2 + context.canvas.height / 2)) / 100,
      0,
      2 * Math.PI
    )
    context.fill()
  }

  drawVer(context: CanvasRenderingContext2D, color: string) {
    context.moveTo(this.x, this.y)
    context.fillStyle = color
    context.arc(
      (this.y * context.canvas.width) / 100,
      (this.x * context.canvas.height) / 100,
      (this.r * (context.canvas.width / 2 + context.canvas.height / 2)) / 100,
      0,
      2 * Math.PI
    )
    context.fill()
  }
}
