import { useEffect, useState } from "react"

type Props = {
  percentage: number
  level: number
  className: string
}

export default function LevelBar({ percentage, level, className }: Props) {
  const [tempPefrc, setTimePerc] = useState(0)
  useEffect(() => {
    let timeout = setTimeout(() => {
      setTimePerc(percentage)
    }, 300)

    return () => {
      clearTimeout(timeout)
    }
  }, [percentage])

  return (
    <div className={className}>
      <div className="w-10 h-10 relative  z-10">
        <div className="w-full h-full rotate-45  border-gray-400 border bg-secondary-400 absolute"></div>
        <div className="text-[16px] top-[20%]  absolute w-full  text-center">
          {level}
        </div>
        <div className="w-full  absolute bottom-0 ">
          <div className="w-0 h-0 border-l-4 border-l-transparent border-t-4 border-primary border-r-4 border-r-transparent right-[-2px] mx-auto "></div>
        </div>

        <div className="w-full  absolute bottom-0 blur-[2px] ">
          <div className="w-0 h-0 border-l-4 border-l-transparent border-t-4 border-primary border-r-4 border-r-transparent right-[-2px] mx-auto "></div>
        </div>
      </div>

      <div className="flex-1 h-4 bg-backdrop-500 my-auto rounded relative mask -ml-2">
        <div
          style={{ width: `${tempPefrc > 100 ? 100 : tempPefrc}%` }}
          className={`bg-primary h-full rounded absolute blur-sm transition-all duration-1000 `}
        ></div>
        <div
          style={{ width: `${tempPefrc > 100 ? 100 : tempPefrc}%` }}
          className={`bg-primary  h-full rounded transition-all duration-1000`}
        ></div>
      </div>
    </div>
  )
}
