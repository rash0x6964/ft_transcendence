export default function CenterProfile() {
  const url =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBLE2R35SV62Enw03QHS5AY-LUr6HOhmHvrA&usqp=CAU"

  return (
    <>
      <div className="flex flex-col items-center w-40 pr-5">
        <img className="rounded-full" src={url} alt="Profile picture" />
        <div className="font-semibold text-xl">rash0x6964</div>
      </div>
    </>
  )
}
