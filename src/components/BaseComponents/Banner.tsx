type Props = {
  className: string
  src: string
}

export default function Banner({ className, src }: Props) {
  return (
    <div className="h-full">
      <img
        src={src}
        className=" object-cover rounded-[20px] absolute  w-full h-full"
        alt=""
      />
    </div>
  )
}
