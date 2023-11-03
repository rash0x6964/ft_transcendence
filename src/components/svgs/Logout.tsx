import SvgProps from "@/types/SvgProps"

export default function Logout({ className, width, height }: SvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      stroke="currentColor"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 32 32"
    >
      <path d="M3.651 16.989h17.326a1 1 0 100-2H3.713l3.617-3.617a.999.999 0 10-1.414-1.414L.009 16.02l5.907 6.063a.999.999 0 101.414-1.414zM29.989 0h-17a2 2 0 00-2 2v9h2.013V3.22c0-.668.542-1.21 1.21-1.21h14.523c.669 0 1.21.542 1.21 1.21l.032 25.572a1.21 1.21 0 01-1.21 1.21H14.214a1.21 1.21 0 01-1.21-1.21v-7.824l-2.013.003v9.03a2 2 0 002 2H29.99a2 2 0 002.001-2v-28a2 2 0 00-2-2z"></path>
    </svg>
  )
}
