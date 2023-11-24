
import PlayerCoins from "@/components/MainNavBar/PlayerCoins"
import Product from "@/models/Product.model"

export default function ItemCard({
  item,
  onClick,
}: {
  item: Product
  onClick: (item: Product) => void
}) {

  return (
    <div className="gradient-border-2  p-4 rounded-xl w-52 flex flex-col justify-between text-sm gap-4" onClick={() => onClick(item)}>
      <p className="self-center text-gray-600 ">{item.category}</p>
      <div className="self-center h-3 w-40 bg-secondary-400 rounded relative">
        <div
          className={`bg-primary h-full rounded absolute blur-sm w-full`}
        ></div>
        <div className={`bg-primary  h-full rounded w-full`}></div>
      </div>
      <p className="self-center">{item.name}</p>
      <PlayerCoins className="self-center" coins={item.price} />
    </div>
  )
}
