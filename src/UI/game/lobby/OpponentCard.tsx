import Avatar from "@/components/BaseComponents/Avatar"
import React from "react"
import RP from "@/components/svgs/RP"

type Props = {
  className?: string

  inQ: boolean
  onClick?: () => void
}

export default function OpponentCard({ className, onClick, inQ }: Props) {
  if (!inQ)
    return (
      <button
        onClick={onClick}
        className={`drop-shadow-lg bg-gradient-to-b h-96 w-[15rem] from-backdrop to-mirage  transition-transform hover:opacity-70 hover:scale-105   pb-2  shadow-md border-slate-500 rounded-xl   gradient-border ${className}`}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="pt-32  ">
            <div className="w-24 h-24 rounded-full border border-gray-500 mx-auto bg-backdrop flex justify-center">
              <svg
                className="my-auto fill-gray-500"
                width="45px"
                height="45px"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 12H20M12 4V20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="mx-auto text-sm font-semibold">Add opponent</div>
        </div>
      </button>
    )
  else
    return (
      <div
        onClick={onClick}
        className={`drop-shadow-lg bg-gradient-to-b h-96 w-[15rem] from-backdrop to-mirage  transition-transform    pb-2  shadow-md border-slate-500 rounded-xl   gradient-border ${className}`}
      >
        <div className="flex flex-col justify-center h-full">
          <span className="loaderLobby mx-auto"></span>
        </div>
      </div>
    )
}
