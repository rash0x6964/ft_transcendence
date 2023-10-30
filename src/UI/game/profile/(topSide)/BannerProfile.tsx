import { getCurrent } from "@/services/UsersService"
import { useEffect, useState } from "react"

export default function BannerProfile() {
  const [bannerUrl, setBannerUrl] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getCurrent()
      setBannerUrl(userData.bannerUrl)
    }

    fetchData()
  }, [])

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
