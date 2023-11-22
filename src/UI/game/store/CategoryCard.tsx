import React, { useState } from "react"

export default function CategoryCard({
  name,
  selected,
  onClick,
}: {
  name: string
  selected: string
  onClick: (name: string) => void
}) {
  return (
    <button
      className={`py-3 px-6 rounded-xl text-center text-sm font-light shadow-sm ${
        selected === name
          ? " border border-primary text-primary"
          : "text-secondary bg-primary"
      }`}
      onClick={() => {
        onClick(name)
      }}
    >
      {name}
    </button>
  )
}
