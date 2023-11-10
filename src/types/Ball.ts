export default class Ball {
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.r = 2
  }
  x: number
  y: number
  r: number

  draw(context: CanvasRenderingContext2D, color: string) {
    context.fillStyle = color
    context.arc(
      (this.x * context.canvas.width) / 100,
      (this.y * context.canvas.height) / 100,
      //   10,
      (this.r * (context.canvas.width / 2 + context.canvas.height / 2)) / 100,
      0,
      2 * Math.PI
    )
    context.fill()
  }
}
