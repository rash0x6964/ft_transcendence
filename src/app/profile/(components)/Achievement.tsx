type Props = {
  name: string
}
export default function Achievement({ name }: Props) {
  return (
    <>
      <img
        className="h-24 w-24"
        src="https://png.pngtree.com/png-vector/20190429/ourmid/pngtree-vector-trophy-icon-png-image_997143.jpg"
        alt={name}
      />
    </>
  )
}
