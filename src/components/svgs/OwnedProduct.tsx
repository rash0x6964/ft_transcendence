import Product from "@/models/Product.model"

export default function OwnedProduct({
  item,
  onClick,
  isSelected,
}: {
  item: Product
  onClick: (item: Product) => void
  isSelected: boolean
}) {
  return (
    <div
      className={`p-4 rounded-xl w-52 flex flex-col justify-between text-sm gap-4 ${
        isSelected ? "border border-primary" : "gradient-border-2"
      }`}
      onClick={() => onClick(item)}
    >
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
    </div>
  )
}
