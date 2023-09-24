import React from "react"
import PropWithClass from "@/types/PropWithClass"

export default function Change({ className }: PropWithClass) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="11.072" cy="11.0082" r="10.1" fill="black" stroke="white" />
      <g clipPath="url(#clip0_0_1)">
        <path
          d="M13.9693 6.98029C14.0953 6.83141 14.2511 6.71023 14.4269 6.62446C14.6027 6.5387 14.7945 6.49024 14.9901 6.48216C15.1858 6.47409 15.381 6.50658 15.5633 6.57757C15.7457 6.64856 15.9111 6.75649 16.0491 6.89447C16.187 7.03246 16.2946 7.19748 16.3648 7.37901C16.435 7.56054 16.4663 7.75461 16.4568 7.94883C16.4473 8.14306 16.3972 8.33319 16.3095 8.50711C16.2219 8.68102 16.0988 8.83491 15.948 8.95895L9.27 15.637L6.54933 16.379L7.29133 13.6583L13.9693 6.98029Z"
          stroke="#FDFDFD"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.98 7.96924L14.9587 9.94791"
          stroke="#FDFDFD"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_0_1">
          <rect
            width="11.872"
            height="11.872"
            fill="white"
            transform="translate(5.56 5.49609)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
