import { NextPageWithLayout } from "../_app"
import { ReactElement, useEffect, useState } from "react"
import Layout from "@/UI/Layout"
import HeadTitle from "@/components/BaseComponents/HeadTitle"
import CategoryCard from "@/UI/game/store/CategoryCard"
import ItemCard from "@/UI/game/store/ItemCard"
import ProductService from "@/services/ProductService"
import Product from "@/models/Product.model"

const Page: NextPageWithLayout = () => {
  const [item, setItem] = useState<Product[]>([])

  useEffect(() => {
    ProductService.getProductList()
      .then((res) => {
        setItem(res.data)
      })
      .catch((err) => {})
  }, [])

  const category = ["Paddles", "Map skin", "Backgrounds"]

  return (
    <div className="flex gap-5 container px-3">
      <HeadTitle>Pong Fury | Store</HeadTitle>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          {category.map((item, index) => (
            <CategoryCard key={index} name={item} />
          ))}
        </div>
        <div className="flex gap-4">
          {item.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
