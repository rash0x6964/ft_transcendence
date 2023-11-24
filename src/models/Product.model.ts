export default interface Product {
  id: string
  name: string
  category: "PADDLE" | "MAPSKIN"
  price: number
  color: string;
  img: string;

	owned?: boolean
}
