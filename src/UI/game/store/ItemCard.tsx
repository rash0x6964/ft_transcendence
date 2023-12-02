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
    <div
      className="gradient-border-2 border-2 hover:border-primary cursor-pointer hover:opacity-75 transition-all p-4 rounded-xl w-52 flex flex-col justify-between text-sm gap-4"
      onClick={() => onClick(item)}
    >
      <p className="self-center text-gray-600 ">{item.category}</p>
      {item.category === "PADDLE" ? (
        <div className="self-center h-3 w-40 bg-secondary-400 rounded relative">
          <div
            className={`h-full rounded absolute blur-sm w-full`}
            style={{ backgroundColor: `${item.color}` }}
          ></div>
          <div
            className={`h-full rounded w-full`}
            style={{ backgroundColor: `${item.color}` }}
          ></div>
        </div>
      ) : (
        <div
          className={`w-full h-8 bg-cover bg-center rounded-md`}
          style={{ backgroundImage: `url('${item.img}')` }}
        />
      )}
      <p className="self-center">{item.name}</p>
      <PlayerCoins className="self-center" coins={item.price} />
    </div>
  )
}
