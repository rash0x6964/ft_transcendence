import React from "react"
import Coins from "../components/icon_components/Coins"
import MatchHistory from "../components/icon_components/MatchHistory"
import Badge from "./icon_components/Badge"

type Props = {
  coins: number
}

export default function MainNavBar({ coins }: Props) {
  let history: boolean[] = [true, true, false, false, true]
  let RP:number = 10050;

  return (
    <div className="bg-transparent-500 p-5 flex justify-center flex-row-reverse  h-fit gap-7">
      <div className="flex  gap-2">
        <span className="text-sm my-auto">rash0x6964</span>
        <img
          className="rounded-full object-cover shadow w-12"
          src="https://steamavatar.io/img/1477351913X9n5u.jpg"
          alt=""
        />
      </div>
      <div className="w-[1px] h-[40px] bg-slate-700 my-auto mx-4"></div>
      <div className="flex gap-2 my-auto">
        <Coins className="my-auto" />
        <span className="text-xs font-semibold my-auto">{coins} coins</span>
      </div>
      <div className="flex my-auto gap-1 ">
        <MatchHistory className="my-auto" />
        {history.map((x, i) => (
          <div
            key={i}
            className={`w-[11px] h-[14px] my-auto rounded-sm ${
              x ? "bg-emerald-500" : "bg-red-500"
            }`}
          ></div>
        ))}
      </div>

      <div className="w-5 h-5 my-auto bg-slate-800 rotate-45 relative ">
        <div className="w-0 h-0 border-l-4 border-l-transparent border-t-4 border-primary border-r-4 border-r-transparent rotate-[-45deg] bottom-0 right-[-2px] absolute"></div>
        <div className="text-[8px] text-center absolute rotate-[-45deg] mr-2  w-full">
          10
        </div>
      </div>

      <div className="w-30 h-2 bg-secondary-100 my-auto">
        <div className="bg-primary w-20 h-full"></div>
      </div>

	  <div className="my-auto flex gap-2">
        <Badge className="my-auto" />
		<div className="text-xs font-semibold my-auto">{`${RP} `}RP</div>
      </div>
    </div>
  )
}
