import React, { PropsWithChildren } from 'react'

import PropWithClass from '@/types/PropWithClass'
import File from '@/components/svgs/File'
import DownloadFile from '@/components/svgs/DownloadFile'
import fileSizePipe from '@/pipes/fileSize.pipe'
import saveAs from 'file-saver'

type Props =
	{
		className?: string
		url: string
		fileName: string
		fileSize: number
	}

export default function Message({ className, url, fileName, fileSize }: Props) {
	return (
		<div className={`bg-mirage text-xs border rounded-md flex items-center justify-between  border-gray-600 p-3  ${className}`}>
			<div className='flex gap-2'>
				<File className='text-white' width={35} height={35} />
				<div className='flex flex-col justify-between py-1 text-xs'>
					<div>{fileName}</div>
					<div className='text-gray-600 '>{fileSizePipe(fileSize)}</div>
				</div>
			</div>
			<div onClick={() => saveAs(url, fileName)} className='hover:opacity-80 duration-500  cursor-pointer'  >
				<DownloadFile className='text-white' width={30} height={30} />
			</div>
		</div>
	)
}
