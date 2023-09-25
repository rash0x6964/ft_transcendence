import PropWithClass from "@/types/PropWithClass"

export default function Mute({ className }: PropWithClass) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8.69995 2.99976C9.60376 2.40455 10.6517 2.06487 11.7329 2.01669C12.814 1.96851 13.888 2.21364 14.8412 2.72609C15.7943 3.23855 16.5912 3.99926 17.1473 4.92766C17.7033 5.85606 17.998 6.91757 18 7.99976C18.0015 9.68429 18.2029 11.3627 18.6 12.9998"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 16.9998H3C3 16.9998 6 14.9998 6 7.9998C5.99349 7.41942 6.09522 6.8429 6.3 6.2998"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.3 21C10.4674 21.3044 10.7135 21.5583 11.0125 21.7352C11.3116 21.912 11.6526 22.0053 12 22.0053C12.3475 22.0053 12.6885 21.912 12.9876 21.7352C13.2866 21.5583 13.5327 21.3044 13.7 21"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 2L22 22"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
