import React, { Children, PropsWithChildren } from "react"
import { CSSProperties } from "react"
import { MouseEvent } from "react"
import { useState, useEffect } from "react"
type Props = {
  className?: string
  pos: { x: number; y: number }
  clicked: boolean
  MenuRef: React.LegacyRef<HTMLDivElement>
}

export function MenuBtn({
  title,
  onClick,
}: {
  title: string
  onClick?: () => void
}) {
  return (
    <div
      className="CONTEXT_BUTTON flex cursor-pointer flex-col p-3 bg-secondary rounded duration-300 py-3 w-36 hover:bg-primary hover:text-secondary font-light text-gray-400 text-xs"
      onClick={onClick}
    >
      {title}
    </div>
  )
}

export default function ContextMenu({
  className,
  MenuRef,
  children,
  pos,
  clicked,
}: Props & PropsWithChildren) {
  return (
    <div
      ref={MenuRef}
      style={{ top: pos.y, left: pos.x }}
      className={`fixed top-0 left-0 flex flex-col p-3 w-fit bg-secondary rounded border border-gray-600      ${className} ${
        !clicked ? "-z-50" : "z-30"
      } `}
    >
      {children}
    </div>
  )
}
// utility
export function getMenuPos(
  e: MouseEvent,
  menuRef: any
): { x: number; y: number } {
  let posX: number = e.clientX
  let posY: number = e.clientY
  if (!menuRef.current) return { x: 0, y: 0 }

  if (posY + menuRef.current?.clientHeight > window.innerHeight)
    posY -= menuRef.current?.clientHeight
  if (posX + menuRef.current.clientWidth > window.innerWidth)
    posX -= menuRef.current.clientWidth
  return { x: posX, y: posY }
}

export function getProfilePos(e: MouseEvent): number {
  let posY: number = e.clientY

  if (posY + 400 > window.innerHeight) posY -= 400
  return posY
}

// custom hook
export function useContextMenu(
  menuRef: any
): [
  isClicked: boolean,
  setClicked: React.Dispatch<React.SetStateAction<boolean>>,
  position: { x: number; y: number },
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
] {
  const [isClicked, setClicked] = useState<boolean>(false)
  const [position, setPosition] = useState({ x: -500, y: -500 })
  useEffect(() => {
    let handler = (e: any) => {
      if (menuRef.current != e.target) {
        {
          if (
            e.target &&
            e.target.click &&
            e.target.classList.contains("CONTEXT_BUTTON")
          ) {
            e.target.click()
            setClicked(false)
            setPosition({ x: -500, y: -500 })
          } else {
            setPosition({ x: -500, y: -500 })
            setClicked(false)
          }
        }
      }
    }

    let resizeHandler = () => {
      setClicked(false)
      setPosition({ x: -500, y: -500 })
    }
    window.addEventListener("resize", resizeHandler)
    document.addEventListener("mousedown", handler)
    return () => {
      document.removeEventListener("mousedown", handler)
      window.removeEventListener("resize", resizeHandler)
    }
  }, [])

  return [isClicked, setClicked, position, setPosition]
}
