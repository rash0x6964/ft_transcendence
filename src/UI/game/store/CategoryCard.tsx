import React from "react"

export default function CategoryCard({ name }: { name: string }) {
  return (
    <div className="gradient-border-2  py-3 px-6 rounded-xl flex text-center text-sm font-light text-gray-300">
      {name}
    </div>
  )
}
