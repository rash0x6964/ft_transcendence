import React from 'react'
import { PropsWithChildren } from 'react'
import Github from '../svgs/Github'
import Intra from '../svgs/Intra'
import Google from '../svgs/Google'
type Props = {
	onClick?: () => void,
	glow?: Boolean,
	className?: string,
	provider: "Github" | "42intra" | "Google"
}

export default function AuthButton({ onClick, glow = false, className,provider }: Props ) {
	return (
		<button onClick={onClick} className={`rounded-md px-10 py-3  duration-300 bg-backdrop hover:bg-secondary-900  ${className}`}>
			{provider === 'Google' && <Google /> }
			{provider === '42intra' && <Intra /> }
			{provider === 'Github' && <Github /> }
		</button>
	)
}
