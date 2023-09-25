import React, { PropsWithChildren } from 'react'

import PropWithClass from '@/types/PropWithClass'

export default function Normal({ className,children }: PropWithClass & PropsWithChildren) {
	return (
		<div className={`bg-mirage text-xs border rounded-md  border-gray-600 p-3  ${className}`}>
			{children}
		</div>
	)
}
