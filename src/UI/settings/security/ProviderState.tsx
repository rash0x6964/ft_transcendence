import { useState } from "react"
import UnLink from "./UnLink"
import Linked from "./Linked"

type Props = {
  provider: "GITHUB" | "INTRA" | "GOOGLE"
  removeProvider: (provider: "GITHUB" | "INTRA" | "GOOGLE") => void
}

export default function ProviderState({ provider, removeProvider }: Props) {
  const [showUnlink, setShowUnlink] = useState<boolean>(false)

  return (
    <>
      {showUnlink ? (
        <div onMouseLeave={() => setShowUnlink(!showUnlink)}>
          <UnLink provider={provider} removeProvider={removeProvider} />
        </div>
      ) : (
        <div onMouseEnter={() => setShowUnlink(!showUnlink)}>
          <Linked />
        </div>
      )}
    </>
  )
}
