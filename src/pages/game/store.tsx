import { NextPageWithLayout } from "../_app"
import { ReactElement, useContext, useEffect, useState } from "react"
import Layout from "@/UI/Layout"
import HeadTitle from "@/components/BaseComponents/HeadTitle"
import CategoryCard from "@/UI/game/store/CategoryCard"
import ItemCard from "@/UI/game/store/ItemCard"
import ProductService from "@/services/ProductService"
import Product from "@/models/Product.model"
import NotifData from "@/types/NotifData"
import { NotifcationContext } from "@/UI/NotificationProvider"
import { ProfileContext } from "@/UI/ActiveUserProvider"
import ProfileData from "@/models/ProfileData.model"
import profileService from "@/services/ProfileService"

const Page: NextPageWithLayout = () => {
  const [items, setItem] = useState<Product[]>([])
  const notify: (data: NotifData) => void = useContext(NotifcationContext)
  const { profileData, setProfileData } = useContext(ProfileContext)

  const category = ["Paddle", "Map skin", "Background"]
  const [selected, setSelected] = useState(category[0])

  useEffect(() => {
    ProductService.getProductList()
      .then((res) => {
        setItem(res.data)
      })
      .catch((err) => {})
  }, [])

  const buyAnItem = (item: Product) => {
    ProductService.assign({ id: item.id })
      .then(async (res) => {
        setItem((prev) =>
          prev.map((x) => {
            if (x.id == item.id) x.owned = true
            return x
          })
        )
        notify({
          message: `You bought ${item.category} ${item.name} product successfully`,
          title: "Buy a product",
          type: "success",
        })

        const _profileData = await profileService.getCurrentProfileData()
        setProfileData(_profileData)
      })
      .catch((err) => {
        notify({
          message: `Opss, ${err.response?.data?.message}`,
          title: "Buy a product",
          type: "error",
        })
      })
  }

  const categoryClicked = (name: string) => {
    setSelected(name)
  }

  return (
    <div className="flex gap-5 container px-3">
      <HeadTitle>Pong Fury | Store</HeadTitle>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          {category.map((item, index) => (
            <CategoryCard
              key={index}
              name={item}
              selected={selected}
              onClick={categoryClicked}
            />
          ))}
        </div>
        <div className="flex gap-4">
          {items.map((item) => {
            if (item.category === selected.toUpperCase())
              return (
                <ItemCard key={item.id} item={item} boughtProduct={buyAnItem} />
              )
          })}
        </div>
      </div>
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
