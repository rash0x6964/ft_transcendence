export default interface Product {
  id: string
  name: string
  category: "PADDLE" | "MAPSKIN" | "BACKGROUND"
  price: number
	selected: boolean

	owned?: boolean
}
