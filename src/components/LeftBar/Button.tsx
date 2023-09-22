import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
type Props =
	{
		icon: React.ReactNode
		className?: string
		href: string
	}

export default function Button({ icon, className, href }: Props) {

	let pathname = usePathname();
	let isActive = pathname == href;
	return (
		<Link href={href}>
			<button className={`px-6 py-2  transition-colors  relative group ${className} transition`}>
				<div className={`h-full transition-colors    w-1 right-0 -mt-2 rounded-full absolute ${isActive ? 'bg-primary' : 'bg-transparent group-hover:bg-primary'}  `}></div>
				<div className={`h-full transition-colors   w-1 right-0 -mt-2 rounded-full blur-[4px] absolute ${isActive ? 'bg-primary' : 'bg-transparent group-hover:bg-primary'}  `}></div>
				<div className={`absolute  transition-colors  ${isActive ? 'text-primary blur-[4px]' : 'blur-[4px]-0 text-slate-700 group-hover:text-primary  group-hover:blur-[4px]'}  `}>{icon}</div>
				<div className={`transition-colors   ${isActive ? 'text-primary ' : 'text-slate-700 group-hover:text-primary '}  `}>{icon}</div>
			</button>
		</Link>

	)
}
