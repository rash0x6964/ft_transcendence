import MainButton from "@/components/BaseComponents/MainButton"
import PlayerCoins from "@/components/MainNavBar/PlayerCoins"
import Product from "@/models/Product.model"
import React from "react"

export default function ItemCard({ item }: { item: Product }) {
  const selected = true
  const itemState = () => {
    if (!item.owned) {
      return (
        <MainButton className="w-40 self-center">
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
    </div>
  )
}
