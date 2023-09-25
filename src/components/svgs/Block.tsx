import PropWithClass from "@/types/PropWithClass"

export default function Block({ className }: PropWithClass) {
  return (
    <svg
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M21 21V19C21 17.9391 20.5786 16.9217 19.8284 16.1716C19.0783 15.4214 18.0609 15 17 15H11C9.93913 15 8.92172 15.4214 8.17157 16.1716C7.42143 16.9217 7 17.9391 7 19V21"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 11C16.2091 11 18 9.20914 18 7C18 4.79086 16.2091 3 14 3C11.7909 3 10 4.79086 10 7C10 9.20914 11.7909 11 14 11Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="1.15594"
        y1="1.59516"
        x2="25.9047"
        y2="26.3439"
        stroke="white"
        strokeWidth="1.5"
      />
    </svg>
  )
}
