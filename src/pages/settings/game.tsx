import SettingLayout from "@/UI/SettingLayout"
import React, { ReactElement, useEffect, useMemo, useState } from "react"
import { NextPageWithLayout } from "../_app"
import ItemCard from "@/UI/game/store/ItemCard"
import Product from "@/models/Product.model"
import ProductService from "@/services/ProductService"
import OwnedProduct from "@/components/svgs/OwnedProduct"
import MainButton from "@/components/BaseComponents/MainButton"
import RepoService from "@/services/RepoService"

const Page: NextPageWithLayout = () => {
  const mainPad: any = {
    category: "PADDLE",
    color: "#9BECE3",
    id: "9f3eU400",
    img: "",
    name: "Aqua",
    owned: true,
    price: 0,
  }

  const mainMap: any = {
    category: "MAPSKIN",
    color: "",
    id: "9f3eU4034",
    img: "",
    name: "blank",
    owned: true,
    price: 0,
  }

  const [items, setItem] = useState<Product[]>([mainPad, mainMap])
  const [selectedMap, setSelectedMap] = useState<Product | null>(null)
  const [selectedPad, setSelectedPad] = useState<Product | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products: any = await ProductService.getProductList()
        const _items = [mainPad, mainMap].concat(products.data)
        const repo: any = await RepoService.getSelectedProduct()

        setSelectedMap(
          _items.find((x) => x.id === repo.data.selectedMapSkin) ?? mainMap
        )
        setSelectedPad(
          _items.find((x) => x.id === repo.data.selectedPaddle) ?? mainPad
        )

        setItem(_items)
      } catch (error) {}
    }
    fetchData()
  }, [])

  const itemClicked = (item: Product) => {
    if (item.category === "MAPSKIN") setSelectedMap(item)
    else setSelectedPad(item)
  }

  const saveMapSkin = () => {
    RepoService.updateRepo({
      selectedMapSkin: selectedMap?.id,
    })
      .then((res) => {})
      .catch((err) => {})
  }

  const savePadSkin = () => {
    const body: any = {
      selectedPaddle: selectedPad?.id,
    }
    RepoService.updateRepo(body)
      .then((res) => {})
      .catch((err) => {})
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-secondary rounded-xl gradient-border-2 drop-shadow-md p-4">
        <p>Paddle skin</p>
        <div className="flex p-4 gap-5 flex-wrap">
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
        <div className="flex p-4 gap-5 flex-wrap">
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
