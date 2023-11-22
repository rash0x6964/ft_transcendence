export default interface Product {
  id: string
  name: string
  category: "PADDLES" | "MAPSKIN" | "BACKGROUNDS"
  price: number
	selected: boolean
	
	owned?: boolean
}
