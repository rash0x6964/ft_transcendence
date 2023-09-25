import React, { Children, PropsWithChildren } from 'react'
import { useState } from 'react';
type Props =
	{
		closed?: boolean

	}
export default function Dialogue({ closed = true, children }: Props & PropsWithChildren) {
	return (
		<div className={`h-screen w-screen  fixed left-0 top-0 z-20 flx flex-col justify-center ${closed ? "hidden" : "block"}`}>
			<div className=' bg-backdrop/90 w-full h-full flex flex-col justify-center '>
				<div className='mx-auto'>{children}</div>
			</div>

		</div>
	)
}
