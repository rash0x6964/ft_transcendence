import UsersService from "@/services/UsersService"
import LinkIcn from "../icons/LinkIcn"

type Props = {
  provider: "GITHUB" | "INTRA" | "GOOGLE"
  removeProvider: (provider: "GITHUB" | "INTRA" | "GOOGLE") => void
}

export default function UnLink({ provider, removeProvider }: Props) {
  const unlink = async () => {
    try {
      await UsersService.unlink(provider)
      removeProvider(provider)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <button
      onClick={unlink}
      className="bg-red-500 w-28 h-10 py-3 text-sm font-semibold  text-slate-300 rounded-md text-center "
    >
      <div className="flex justify-between px-2 items-center">
        <p>Unlink</p>
        <LinkIcn stroke="white" />
      </div>
    </button>
  )
}
