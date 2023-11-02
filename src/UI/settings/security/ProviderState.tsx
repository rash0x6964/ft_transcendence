import { useState } from "react"
import UnLink from "./UnLink"
import Link from "./Link"

type Props = {
  lProvider: "github" | "fortytwo" | "google"
  uProvider: "GITHUB" | "INTRA" | "GOOGLE"
}

export default function ProviderState({ lProvider, uProvider }: Props) {
  const [showUnlink, setShowUnlink] = useState<boolean>(false)

  return (
    <>
      {showUnlink ? (
        <UnLink provider={uProvider} />
      ) : (
        <Link provider={lProvider} />
      )}
    </>
  )
}
