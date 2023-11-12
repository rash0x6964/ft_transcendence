import Game from "@/UI/game/lobby/Game"
import { useEffect, useRef, useState } from "react"

export default function test() {
  const canvasRef = useRef(null)
  const [w, setW] = useState<number>(0)
  const [h, setH] = useState<number>(0)
  useEffect(() => {
    setH(canvasRef.current.clientHeight)
    setW(canvasRef.current.clientWidth)
    const handleResize = (e) => {
      setH(canvasRef.current.clientHeight)
      setW(canvasRef.current.clientWidth)
    }
    window.onresize = handleResize

    return () => {
      window.onresize = null
    }
  }, [])
  return (
    <div ref={canvasRef} className="w-[100%] h-[50vh]">
      <Game  width={w} height={h}/>
    </div>
  )
}
