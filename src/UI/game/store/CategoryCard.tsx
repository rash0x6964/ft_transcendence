import React, { useState } from "react"

export default function CategoryCard({
  name,
  selectedCategory,
  onClick,
}: {
  name: string
  selectedCategory: string
  onClick: (name: string) => void
}) {
  return (
    <button
      className={` py-3 px-6 rounded-xl text-center text-sm font-light shadow-sm ${
        selectedCategory === name
          ? " gradient-border-3"
          : " gradient-border-2"
      }`}
      onClick={() => {
        onClick(name)
      }}
    >
      {name}
    </button>
  )
}
