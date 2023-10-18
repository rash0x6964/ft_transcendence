
import React, { useEffect } from 'react'
import MatchHistory from '@/components/svgs/MatchHistory'
import Cross from '@/components/svgs/Cross'

type Props = {
	onClick?: () => void
}

export default function QueueTimer({ onClick }: Props) {
	return (
		<div className='flex flex-col gap'>
			<div className='text-sm mb-2'>Searching for opponent...</div>
			<div className='flex mx-aut gap-3 mx-auto mb-4'>
				<MatchHistory className='text-primary' />
				<span className='my-auto text-slate-600 text-sm'>02:50</span>

			</div>
			<button onClick={onClick} className='group mx-auto w-8 h-8 relative'>
				<div className='rounded-full   border-red-500 border-2  blur-[2px] hover:blur-[4px] duration-500  -top-0 left-0 w-full h-full absolute'>
				</div>
				<div className='rounded-full mx-auto  border-2 w-full h-full flex justify-center  border-red-500'>
					<Cross className="text-red-500 my-auto" width={24} height={24} />
				</div>
			</button>


		</div>
	)
}
