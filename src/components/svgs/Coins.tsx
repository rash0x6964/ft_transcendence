import SvgProps from "@/types/SvgProps"

export default function Coins({
  className,
  width = 20,
  height = 20,
}: SvgProps) {
  return (
    <div className={className}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {" "}
        <path
          d="M20 6V14C20 15.8409 15.5229 17.3333 10 17.3333C4.47715 17.3333 0 15.8409 0 14V6"
          fill="#FFDB2D"
        />{" "}
        <path
          d="M10 6V17.3333C15.5229 17.3333 20 15.8409 20 14V6H10Z"
          fill="#FFAF33"
        />{" "}
        <path
          d="M10 9.33333C15.5228 9.33333 20 7.84095 20 6.00001C20 4.15907 15.5228 2.66669 10 2.66669C4.47715 2.66669 0 4.15907 0 6.00001C0 7.84095 4.47715 9.33333 10 9.33333Z"
          fill="#FFEA8A"
        />{" "}
        <path
          d="M10 2.66669V9.33337C15.5229 9.33337 20 7.84098 20 6.00005C20 4.15911 15.5229 2.66669 10 2.66669Z"
          fill="#FFDB2D"
        />{" "}
        <path
          d="M10 12.3333C4.47715 12.3333 0 10.8409 0 9V12.1903C0.589336 12.5741 1.34125 12.9359 2.29648 13.2544C4.38383 13.9502 7.11961 14.3334 10 14.3334C12.8804 14.3334 15.6162 13.9502 17.7035 13.2544C18.6588 12.936 19.4107 12.5741 20 12.1903V9C20 10.8409 15.5229 12.3333 10 12.3333Z"
          fill="#FFAF33"
        />{" "}
        <path
          d="M10 12.3333V14.3333C12.8804 14.3333 15.6162 13.9501 17.7035 13.2544C18.6588 12.936 19.4107 12.5741 20 12.1902V9C20 10.8409 15.5229 12.3333 10 12.3333Z"
          fill="#FF9408"
        />{" "}
      </svg>
    </div>
  )
}
