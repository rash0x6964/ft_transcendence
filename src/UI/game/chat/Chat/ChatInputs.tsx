import React from 'react'
import ChatInput from './ChatInput'
import Input from './ChatInput'
import Sword from '@/components/svgs/Sword'
import AddFile from '@/components/svgs/AddFile'
import Send from '@/components/svgs/Send'
type Props =
	{
		onChallenge?: () => void,
		onSend?: () => void,
		onFile?: () => void,
		className?: string

	}
export default function ChatInputs({ onChallenge, onSend, onFile, className }: Props) {

	return (
		<div  className={`flex gap-2 ${className}`}>
			<Input  placeholder='Send something Nice' className='flex-1 h-16  drop-shadow-lg    bg-secondary' />
			<button onClick={onChallenge} className='h-16 w-16 drop-shadow-lg bg-secondary rounded-xl group '>
				<Sword className='mx-auto group-hover:scale-125 transition-transform' width={24} height={24} />
			</button>
			<button onClick={onFile} className='h-16 w-16 drop-shadow-lg bg-secondary rounded-xl group'>
				<AddFile className='mx-auto group-hover:scale-125 transition-transform' width={24} height={24} />
			</button>
			<button onClick={onSend} className='h-16 w-16 drop-shadow-lg bg-secondary rounded-xl group'>
				<Send className='mx-auto text-primary group-hover:scale-125 transition-transform' width={24} height={24} />
			</button>
		</div>
	)
}
