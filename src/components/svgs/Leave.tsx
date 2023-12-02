import { number } from "yup"

type Props = {
  width: number
  height: number
  className?: string
}

export default function Leave({ width, height, className }: Props) {
  return (
    <svg
      fill="currentColor"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 512 512"
      id="_02_Out"
      data-name="02 Out"
      xmlns="http://www.w3.org/2000/svg"
      transform="rotate(270)"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g id="Group_7" data-name="Group 7">
          <path
            id="Path_2"
            data-name="Path 2"
            d="M480,224a31.991,31.991,0,0,0-32,32V448H64V256a32,32,0,0,0-64,0V480a31.991,31.991,0,0,0,32,32H480a31.991,31.991,0,0,0,32-32V256A31.991,31.991,0,0,0,480,224Z"
            fill-rule="evenodd"
          ></path>{" "}
          <path
            id="Path_3"
            data-name="Path 3"
            d="M224,320a32,32,0,0,0,64,0V128h96L256,0,128,128h96Z"
            fill-rule="evenodd"
          ></path>{" "}
        </g>{" "}
      </g>
    </svg>
  )
}
