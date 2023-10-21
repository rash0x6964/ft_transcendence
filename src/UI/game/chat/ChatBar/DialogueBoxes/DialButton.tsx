import { PropsWithChildren } from "react";
import PropWithClass from "@/types/PropWithClass";


type Props =
	{
		children?: React.ReactNode,
		className?: string,
		onClick?: () => void
	}
export default function DialButton({ children, className, onClick }: Props) {
	return (
		<button onClick={onClick} className={`bg-big-stone rounded-xl p-3 hover:bg-big-stone-400 transition-colors ${className}`}>
			{children}
		</button>
	)
}
