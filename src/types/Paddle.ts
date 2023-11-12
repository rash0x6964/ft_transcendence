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

  draw(context: CanvasRenderingContext2D, color: string) {
    context.fillStyle = color
    context.fillRect(
      (this.x * context.canvas.width) / 100,
      (this.y * context.canvas.height) / 100,
      (this.w * context.canvas.width) / 100,
      (this.h * context.canvas.height) / 100
	)
  }
}
