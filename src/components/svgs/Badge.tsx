type Props = {
  className: string
}

export default function Badge({ className }: Props) {
  return (
    <svg
      className={className}
      width="14"
      height="18"
      viewBox="0 0 14 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.96094 17.3984L0.582031 14.1172V0.601562H13.418V14.1172L6.96094 17.3984ZM1.20703 13.7367L6.96094 16.6953L12.793 13.7359V1.22656H1.20703V13.7367ZM6.93203 12.4438L3.23438 10.5418V12.4949L6.92734 14.3941L10.766 12.4453V10.4961L6.93203 12.4438Z"
        fill="#9BECE3"
      />
    </svg>
  )
}
