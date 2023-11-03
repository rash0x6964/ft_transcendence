import MainButton from "@/components/BaseComponents/MainButton"
import LinkIcn from "../icons/LinkIcn"
import env from "@/environment/environment"

type Props = {
  provider: "github" | "fortytwo" | "google"
}

export default function Link({ provider }: Props) {
  const loginUrl = `${env.endPoint}/${provider}Authentication/login`
  return (
    <a href={loginUrl}>
      <MainButton className="w-28 h-10 py-3">
        <div className="flex justify-between px-2 items-center">
          <p>Link</p>
          <LinkIcn />
        </div>
      </MainButton>
    </a>
  )
}
