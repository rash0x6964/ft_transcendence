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
import Dialogue from "@/components/Dialogue/Dialogue"

const Page: NextPageWithLayout = () => {
  const [items, setItem] = useState<Product[]>([])
  const notify: (data: NotifData) => void = useContext(NotifcationContext)
  const { setProfileData } = useContext(ProfileContext)

  const category = ["Paddle", "Map skin"]
  const [selectedCategory, setSelectedCategory] = useState(category[0])
  const [selectedItem, setSelectedItem] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [dialogueState, setDialogueState] = useState(true)

  useEffect(() => {
    ProductService.getProductList()
      .then((res) => {
        setLoading(false)
        setItem(res.data)
      })
      .catch((err) => {
        setLoading(false)
      })
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

  const itemClicked = (item: Product) => {
    setSelectedItem(item)
    setDialogueState(false)
  }

  const acceptPayment = () => {
    if (selectedItem) {
      buyAnItem(selectedItem)
      setDialogueState(true)
    }
  }

  if (loading)
    return (
      <div className="w-full h-full flex flex-col justify-center ">
        <span className="loaderLobby mx-auto"></span>
      </div>
    )

  return (
    <div className="flex gap-5 container px-3 animate__animated animate__fadeIn">
      <HeadTitle>Pong Fury | Store</HeadTitle>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-4">
          {category.map((item, index) => (
            <CategoryCard
              key={index}
              name={item}
              selectedCategory={selectedCategory}
              onClick={(name: string) => setSelectedCategory(name)}
            />
          ))}
        </div>
        <div className="flex gap-4 flex-wrap ">
          {items.map((item) => {
            if (
              item.category ===
                selectedCategory.toUpperCase().replace(" ", "") &&
              !item.owned
            )
              return (
                <ItemCard key={item.id} item={item} onClick={itemClicked} />
              )
          })}
        </div>
      </div>
      <Dialogue
        onBackDropClick={() => setDialogueState(true)}
        closed={dialogueState}
      >
        <div className="gradient-border-2 p-7 rounded-xl w-[470px] h-[198px] flex flex-col justify-between">
          <p className="font-light text-white">Buy Item</p>
          <p className="font-light mb-9 text-sm">
            Do you want to purchase{" "}
            <span className="text-primary">
              {selectedItem?.name} {selectedItem?.category.toLowerCase()}
            </span>{" "}
            for{" "}
            <span className="text-primary">{selectedItem?.price} coins</span>?
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

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
