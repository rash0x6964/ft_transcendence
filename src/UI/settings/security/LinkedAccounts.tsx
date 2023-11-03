import AuthButton from "@/components/BaseComponents/AuthButton"
import Link from "./Link"
import Linked from "./Linked"
import { useEffect, useState } from "react"
import userService from "@/services/UsersService"
import { LinkedAccount } from "@/types/User"
import ProviderState from "./ProviderState"

export default function LinkedAccounts() {
  const [linkedAcc, setLinkedAcc] = useState<LinkedAccount[]>([])

  const setAccounts = async () => {
    const accounts = await userService.getAccounts()
    setLinkedAcc(accounts)
  }
  useEffect(() => {
    setAccounts()
  }, [])

  const removeProvider = (provider: "GITHUB" | "INTRA" | "GOOGLE") => {
    setLinkedAcc(linkedAcc.filter((acc) => acc.provider !== provider))
  }
  return (
    <div className="bg-secondary rounded-xl my-3 pb-2 gradient-border-2  ">
      <p className="text-base p-5">Linked Accounts</p>
      <div className="flex justify-between mx-8 mb-4 ">
        <AuthButton
          provider="fortytwo"
          className="h-10 w-24 flex justify-center items-center"
        />
        {linkedAcc && linkedAcc.find((acc) => acc.provider == "INTRA") ? (
          <ProviderState provider="INTRA" removeProvider={removeProvider} />
        ) : (
          <Link provider="fortytwo" />
        )}
      </div>
      <div className="flex justify-between mx-8 mb-4 ">
        <AuthButton
          provider="github"
          className="h-10 w-24 flex justify-center items-center"
        />
        {linkedAcc && linkedAcc.find((acc) => acc.provider == "GITHUB") ? (
          <ProviderState provider="GITHUB" removeProvider={removeProvider} />
        ) : (
          <Link provider="github" />
        )}
      </div>
      <div className="flex justify-between mx-8 mb-6">
        <AuthButton
          provider="google"
          className="h-10 w-24 flex justify-center items-center"
        />
        {linkedAcc && linkedAcc.find((acc) => acc.provider == "GOOGLE") ? (
          <ProviderState provider="GOOGLE" removeProvider={removeProvider} />
        ) : (
          <Link provider="google" />
        )}
      </div>
    </div>
  )
}
