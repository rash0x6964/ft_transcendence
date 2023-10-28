import DownloadFile from '@/components/svgs/DownloadFile'
import Eye from '@/components/svgs/Eye'
import saveAs from 'file-saver'
import React, { PropsWithChildren } from 'react'

type Props =
	{
		className?: string,
		fileName: string,
		src: string
	}

export default function VideoAttachment({ className, fileName, src }: Props) {
	return (
		<div className={`bg-mirage font-light text-sm border relative rounded-md  border-gray-600 p-1  ${className}`}>
			<div className='absolute w-full p-3 justify-between bg-backdrop/80 top-0 left-0 rounded-t flex items-center'>
				<div>{fileName}</div>
				<div className='flex gap-2 items-center'>
					<div className='hover:opacity-50 transition-opacity cursor-pointer' onClick={() => saveAs(src, fileName)} >
						<DownloadFile width={16} height={16} />
					</div>

					<a className='hover:opacity-50 transition-opacity' rel="noopener noreferrer" target="_blank" href={src}>
						<Eye width={16} height={16} />
					</a>
				</div>
			</div>
			<video controls src={src}></video>

		</div>
	)
}
