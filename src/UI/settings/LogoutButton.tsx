import Logout from "@/components/svgs/logout"
import CookiesService from "@/services/CookiesService"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter()
  const logout = () => {
    CookiesService.deleteUserCookie()
    CookiesService.delete2FACookie()
    CookiesService.deleteInfoCookie()
    CookiesService.deleteProviderCookie()
    router.push("/signin")
  }
  return (
    <button
      onClick={logout}
      className="flex py-3 rounded-xl pl-3 bg-secondary hover:bg-selected"
    >
      <Logout width={24} height={24} className="text-slate-300" />
      <p className="pl-3">Logout</p>
    </button>
  )
}
