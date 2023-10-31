import { getCurrent } from "@/services/UsersService"
import { useEffect, useState } from "react"

type Props = {
  bannerUrl: string
}

export default function BannerProfile({ bannerUrl }: Props) {
  return (
    <div className="m-10">
      <img
        className="rounded-[40px] w-[200%] h-72 -z-10 blur-[3px] object-cover"
        src={bannerUrl}
        alt="backdrop"
      />
    </div>
  )
}
