import AuthButton from "@/components/BaseComponents/AuthButton"
import Link from "./Link"
import Linked from "./Linked"

export default function LinkedAccounts() {
  return (
    <div className="bg-secondary rounded-xl mt-3 pb-2 gradient-border-2  ">
      <p className="text-base p-5">Linked Accounts</p>
      <div className="flex justify-between mx-8 mb-4 ">
        <AuthButton
          provider="fortytwo"
          className="h-10 w-24 flex justify-center items-center"
        />
        <Linked />
      </div>
      <div className="flex justify-between mx-8 mb-4 ">
        <AuthButton
          provider="github"
          className="h-10 w-24 flex justify-center items-center"
        />
        <Link />
      </div>
      <div className="flex justify-between mx-8 mb-6">
        <AuthButton
          provider="google"
          className="h-10 w-24 flex justify-center items-center"
        />
        <Link />
      </div>
    </div>
  )
}
