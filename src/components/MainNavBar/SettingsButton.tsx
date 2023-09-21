'use client'
import React, { MouseEventHandler ,MouseEvent} from 'react'
import Settings from '../svgs/Settings'

export default function SettingsButton({ onClick, className }: { onClick?: () => void, className: string }) {
	return (
		<button className={className} onClick={onClick }>
			<Settings className=" my-auto" width={25} height={25} />
		</button>
	)
}
