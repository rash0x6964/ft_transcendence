import SettingLayout from "@/UI/SettingLayout"
import React, { ReactElement, useEffect, useState } from "react"
import { NextPageWithLayout } from "../_app"
import ItemCard from "@/UI/game/store/ItemCard"
import Product from "@/models/Product.model"
import ProductService from "@/services/ProductService"
import OwnedProduct from "@/components/svgs/OwnedProduct"
import MainButton from "@/components/BaseComponents/MainButton"

const Page: NextPageWithLayout = () => {
  const [items, setItem] = useState<Product[]>([])
  const [selectedMap, setSelectedMap] = useState<Product | null>(null)
  const [selectedPad, setSelectedPad] = useState<Product | null>(null)

  useEffect(() => {
    ProductService.getProductList()
      .then((res) => {
        setItem(res.data)
        console.log(res.data)
      })
      .catch((err) => {})
  }, [])

  const itemClicked = (item: Product) => {
    if (item.category === "MAPSKIN") setSelectedMap(item)
    else setSelectedPad(item)
  }

  const saveMapSkin = () => {}
  const savePadSkin = () => {}

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-secondary rounded-xl gradient-border-2 drop-shadow-md p-4">
        <p>Paddle skin</p>
        <div className="flex p-4">
          {items.map((item) => {
            if (item.owned && item.category === "PADDLE")
              return (
                <OwnedProduct
                  key={item.id}
                  item={item}
                  onClick={itemClicked}
                  isSelected={item.id === selectedPad?.id}
                />
              )
          })}
        </div>

        <div className="flex justify-end">
          <MainButton className="w-32 py-3" type="submit" onClick={savePadSkin}>
            {" "}
            Save
          </MainButton>
        </div>
      </div>
      <div className="bg-secondary rounded-xl gradient-border-2 drop-shadow-md p-4">
        <p>Map skin</p>
        <div className="flex p-4">
          {items.map((item) => {
            if (item.owned && item.category === "MAPSKIN")
              return (
                <OwnedProduct
                  key={item.id}
                  item={item}
                  onClick={itemClicked}
                  isSelected={item.id === selectedMap?.id}
                />
              )
          })}
        </div>
        <div className="flex justify-end mt-5">
          <MainButton className="w-32 py-3" type="submit" onClick={saveMapSkin}>
            {" "}
            Save
          </MainButton>
        </div>
      </div>
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <SettingLayout>{page}</SettingLayout>
}

export default Page
