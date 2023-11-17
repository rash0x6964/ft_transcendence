import React from "react"

type Props = {
  level: number
  percentage: number
  className?: string
}

export default function LevelCube({ percentage, level, className }: Props) {
  return (
    <div title={`${percentage.toFixed(2)}%`} className={className}>
      <div className="flex flex-col items-center gap-8  ">
        <div className="w-16 h-16 relative  mr-4">
          <div className="w-16 h-16 rotate-45 bg-secondary-400 absolute border-white border-[1px]"></div>
          <div className="text-xl font-semibold absolute w-full mt-5 text-center">
            {" "}
            {level}{" "}
          </div>
          <div className="w-full absolute -bottom-3 ">
            <div className="w-0 h-0 border-l-[16px] border-l-transparent border-t-[16px] border-primary border-r-[16px] border-r-transparent right-[-2px] mx-auto "></div>
          </div>

          <div className="w-full absolute -bottom-3 blur-[2px] ">
            <div className="w-0 h-0 border-l-[16px] border-l-transparent border-t-[16px] border-primary border-r-[16px] border-r-transparent right-[-2px] mx-auto "></div>
          </div>
        </div>
        <div className="w-[500px] h-4 bg-secondary-400 my-auto rounded relative">
          <div
            style={{ width: `${percentage}%` }}
            className={`bg-primary h-full rounded absolute blur-sm`}
          ></div>
          <div
            style={{ width: `${percentage}%` }}
            className={`bg-primary  h-full rounded `}
          ></div>
        </div>
      </div>
    </div>
  )
}
