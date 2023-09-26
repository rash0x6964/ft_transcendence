import DownloadFile from "@/components/svgs/DownloadFile"
import Eye from "@/components/svgs/Eye"
import Image from "next/image"
import React, { PropsWithChildren } from "react"

type Props = {
  className?: string
  fileName: string
  src: string
}

export default function ImageAttachment({ className, fileName, src }: Props) {
  return (
    <div
      className={`bg-mirage font-light text-sm border relative rounded-md  border-gray-600 p-1  ${className}`}
    >
      <div className="absolute w-full p-3 justify-between bg-backdrop/80 top-0 left-0 rounded-t flex items-center">
        <div>{fileName}</div>
        <div className="flex gap-2 items-center">
          <DownloadFile width={16} height={16} />
          <Eye width={16} height={16} />
        </div>
      </div>
      <img className="w-full h-auto" src={src} alt={fileName} />
    </div>
  )
}
