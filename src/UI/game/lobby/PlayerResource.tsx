type Props = {
  mana: number
}

export default function PlayerResource({ mana }: Props) {
  return (
    <>
      <div className="flex">
        <div className="w-28 h-2 bg-secondary-400 my-auto rounded relative mask">
          <div
            style={{ width: `${(mana * 100) / 3}%` }}
            className={`bg-primary h-full rounded absolute blur-sm`}
          ></div>
          <div
            style={{ width: `${(mana * 100) / 3}%` }}
            className={`bg-primary  h-full rounded`}
          ></div>
        </div>
      </div>
    </>
  )
}
