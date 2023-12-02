type Props = {
  width: number
  height: number
  className: string
}

function Info({ width, height, className }: Props) {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <g>
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="1.5"
        ></circle>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
          d="M10.125 8.875a1.875 1.875 0 112.828 1.615c-.475.281-.953.708-.953 1.26V13"
        ></path>
        <circle cx="12" cy="16" r="1" fill="currentColor"></circle>
      </g>
    </svg>
  )
}

export default Info
