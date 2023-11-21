import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import Settings from "../svgs/Settings"

export default function SettingsButton({ className }: { className: string }) {
  const pathname: string = usePathname()
  const router = useRouter()
  const handleClick: () => void = () => {
    localStorage.setItem("pathBeforeSetting", pathname)
    router.push("/settings/profile/")
  }
  return (
    <button className={className} onClick={handleClick}>
      <Settings className=" my-auto" width={25} height={25} />
    </button>
  )
}
