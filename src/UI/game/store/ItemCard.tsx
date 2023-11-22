import MainButton from "@/components/BaseComponents/MainButton"
import Dialogue from "@/components/Dialogue/Dialogue"
import PlayerCoins from "@/components/MainNavBar/PlayerCoins"
import Product from "@/models/Product.model"
import { useState } from "react"

export default function ItemCard({
  item,
  boughtProduct,
}: {
  item: Product
  boughtProduct: (item: Product) => void
}) {
  const [dialogueState, setDialogueState] = useState(true)

  const selected = true

  const acceptPayment = () => {
    boughtProduct(item)
    setDialogueState(true)
  }

  const itemState = () => {
    if (!item.owned) {
      return (
        <MainButton
          className="w-40 self-center"
          onClick={() => setDialogueState(false)}
        >
          <p className="font-light py-2 rounded-xl flex justify-center">
            buy now
          </p>
        </MainButton>
      )
    } else if (item.owned && selected) {
      return (
        <MainButton className="w-40 self-center bg-secondary border-primary border-[1px]">
          <p className="font-light py-2 rounded-xl flex justify-center  text-primary">
            selected
          </p>
        </MainButton>
      )
    } else if (item.owned && !selected) {
      return (
        <MainButton className="w-40 self-center">
          <p className="font-light py-2 rounded-xl flex justify-center">
            select
          </p>
        </MainButton>
      )
    }
  }

  return (
    <div className="gradient-border-2  p-4 rounded-xl w-52 flex flex-col justify-between text-sm gap-4">
      <p className="self-center text-gray-600 ">{item.category}</p>
      <div className="self-center h-3 w-40 bg-secondary-400 rounded relative">
        <div
          className={`bg-primary h-full rounded absolute blur-sm w-full`}
        ></div>
        <div className={`bg-primary  h-full rounded w-full`}></div>
      </div>
      <p className="self-center">{item.name}</p>
      <PlayerCoins className="self-center" coins={item.price} />
      {itemState()}

      <Dialogue
        onBackDropClick={() => setDialogueState(true)}
        closed={dialogueState}
      >
        <div className="gradient-border-2 p-7 rounded-xl w-[470px] h-[198px] flex flex-col justify-between">
          <p className="font-light text-white ">Buy Item</p>
          <p className="font-light mb-9">
            you ganna spened{" "}
            <span className="text-primary">{item.price} coins</span> to buy this
            item{" "}
            <span className="text-primary">
              {item.name} {item.category.toLowerCase()}
            </span>
          </p>
          <button
            className=" bg-green-400 py-2 px-5 rounded-md w-fit self-end text-white"
            onClick={acceptPayment}
          >
            Buy
          </button>
        </div>
      </Dialogue>
    </div>
  )
}
