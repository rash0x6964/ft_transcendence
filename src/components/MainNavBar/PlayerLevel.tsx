import React from 'react'


type Props =
{
	level : number,
	percentage:number,
	className?:string
}
export default function PlayerLevel({percentage,level,className}:Props) {
  return (
	<div className={className}>
		<div className="flex">
				<div className="w-5 h-5 relative  mr-4">

					<div className="w-5 h-5 rotate-45 bg-secondary-400 absolute"></div>
					<div className="text-[10px] absolute w-full  text-center"> {level} </div>
					<div className="w-full  absolute bottom-0 ">
						<div className="w-0 h-0 border-l-4 border-l-transparent border-t-4 border-primary border-r-4 border-r-transparent right-[-2px] mx-auto "></div>
					</div>

					<div className="w-full  absolute bottom-0 blur-[2px] ">
						<div className="w-0 h-0 border-l-4 border-l-transparent border-t-4 border-primary border-r-4 border-r-transparent right-[-2px] mx-auto "></div>
					</div>


				</div>
				<div className="w-28 h-2 bg-secondary-400 my-auto rounded relative">
					<div style={{width:`${percentage}%`}} className={`bg-primary h-full rounded absolute blur-sm`}></div>
					<div  style={{width:`${percentage}%`}}  className={`bg-primary  h-full rounded `}></div>
				</div>


			</div>
	</div>
  )
}
