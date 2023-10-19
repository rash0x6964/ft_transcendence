import React from 'react'
import Swords from '@/components/svgs/Swords'
import PropWithClass from '@/types/PropWithClass'

export default function SwordsLogo({ className} :PropWithClass) {
  return (
	<div className={className}>
		<Swords  width={100} height={100} className='text-primary absolute blur' />
		<Swords width={100} height={100} className='text-primary' />
	</div>
  )
}
