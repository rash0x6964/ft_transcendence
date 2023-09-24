export default function LevelCube() {
  const s = "height:0;width:20%;padding-bottom:20%;background-color:red"
  const square = {
    height: "0",
    width: "20%",
    paddingBottom: "20%",
    backgroundColor: "white",
  }
  return (
    <div className="flex items-center">
      <div className="flex justify-center items-center bg-slate-800 border-slate-50 border-[1px] w-14 h-14 rotate-45">
        <div className="-rotate-45 font-semibold text-xl">10</div>
      </div>
    </div>
  )
}
