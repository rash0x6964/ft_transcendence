import React from "react"

import PropWithClass from "@/types/PropWithClass"
export default function Sound({className}:PropWithClass) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
	  className={className}
    >
      <g clipPath="url(#clip0_22_9)">
        <path
          d="M10 11.4062C10.7767 11.4062 11.4062 10.7767 11.4062 10C11.4062 9.22335 10.7767 8.59375 10 8.59375C9.22335 8.59375 8.59375 9.22335 8.59375 10C8.59375 10.7767 9.22335 11.4062 10 11.4062Z"
          fill="currentColor"
        />
        <path
          d="M7.43125 13.3504C7.30979 13.3505 7.18969 13.3249 7.07886 13.2752C6.96803 13.2255 6.86899 13.1529 6.78828 13.0621C6.0386 12.2184 5.62451 11.129 5.62451 10.0004C5.62451 8.87176 6.0386 7.78235 6.78828 6.93867C6.86263 6.8521 6.95347 6.78121 7.05552 6.73013C7.15756 6.67905 7.26875 6.6488 7.38261 6.64115C7.49646 6.63351 7.6107 6.64861 7.71866 6.68558C7.82661 6.72256 7.92612 6.78066 8.01138 6.85651C8.09664 6.93235 8.16595 7.02442 8.21524 7.12733C8.26454 7.23024 8.29285 7.34195 8.29852 7.45592C8.30419 7.56989 8.2871 7.68385 8.24825 7.79115C8.20941 7.89844 8.14958 7.99693 8.07226 8.08086C7.60231 8.6099 7.34274 9.29295 7.34274 10.0006C7.34274 10.7082 7.60231 11.3913 8.07226 11.9203C8.18222 12.0441 8.25408 12.197 8.27919 12.3607C8.3043 12.5244 8.28159 12.6918 8.21379 12.8429C8.14599 12.9939 8.036 13.1222 7.89703 13.2122C7.75807 13.3023 7.59605 13.3502 7.43047 13.3504H7.43125ZM12.5687 13.3504C12.4032 13.3502 12.2411 13.3023 12.1022 13.2122C11.9632 13.1222 11.8532 12.9939 11.7854 12.8429C11.7176 12.6918 11.6949 12.5244 11.72 12.3607C11.7451 12.197 11.817 12.0441 11.9269 11.9203C12.3969 11.3913 12.6565 10.7082 12.6565 10.0006C12.6565 9.29295 12.3969 8.6099 11.9269 8.08086C11.8496 7.99693 11.7898 7.89844 11.751 7.79115C11.7121 7.68385 11.695 7.56989 11.7007 7.45592C11.7064 7.34195 11.7347 7.23024 11.784 7.12733C11.8333 7.02442 11.9026 6.93235 11.9878 6.85651C12.0731 6.78066 12.1726 6.72256 12.2806 6.68558C12.3885 6.64861 12.5028 6.63351 12.6166 6.64115C12.7305 6.6488 12.8417 6.67905 12.9437 6.73013C13.0457 6.78121 13.1366 6.8521 13.2109 6.93867C13.9606 7.78235 14.3747 8.87176 14.3747 10.0004C14.3747 11.129 13.9606 12.2184 13.2109 13.0621C13.1303 13.1528 13.0314 13.2253 12.9207 13.275C12.81 13.3247 12.6901 13.3504 12.5687 13.3504Z"
          fill="currentColor"
        />
        <path
          d="M5.441 15.3406C5.32312 15.3407 5.20649 15.3165 5.0984 15.2695C4.99032 15.2224 4.89311 15.1535 4.81288 15.0672C3.52783 13.6924 2.81299 11.8809 2.81299 9.99902C2.81299 8.11719 3.52783 6.30562 4.81288 4.93086C4.88979 4.84773 4.98238 4.78062 5.08532 4.73339C5.18826 4.68617 5.29952 4.65975 5.4127 4.65567C5.52588 4.65159 5.63876 4.66992 5.74483 4.70961C5.8509 4.7493 5.94808 4.80956 6.03079 4.88694C6.11349 4.96431 6.18009 5.05727 6.22674 5.16047C6.2734 5.26367 6.29919 5.37508 6.30265 5.48828C6.3061 5.60148 6.28714 5.71425 6.24687 5.8201C6.20659 5.92596 6.14579 6.0228 6.06795 6.10508C5.0807 7.16143 4.53152 8.55334 4.53152 9.99922C4.53152 11.4451 5.0807 12.837 6.06795 13.8934C6.18201 14.0157 6.25788 14.1687 6.28624 14.3336C6.3146 14.4985 6.29423 14.668 6.22762 14.8215C6.16101 14.9749 6.05107 15.1056 5.91127 15.1975C5.77147 15.2893 5.6079 15.3384 5.44061 15.3387L5.441 15.3406ZM14.559 15.3406C14.3917 15.3404 14.2281 15.2913 14.0883 15.1994C13.9485 15.1076 13.8386 14.9769 13.772 14.8234C13.7054 14.67 13.685 14.5004 13.7133 14.3355C13.7417 14.1707 13.8176 14.0177 13.9316 13.8953C14.9189 12.839 15.4681 11.447 15.4681 10.0012C15.4681 8.55529 14.9189 7.16338 13.9316 6.10703C13.8538 6.02476 13.793 5.92791 13.7527 5.82206C13.7124 5.71621 13.6935 5.60344 13.6969 5.49023C13.7004 5.37703 13.7262 5.26563 13.7728 5.16243C13.8195 5.05923 13.8861 4.96627 13.9688 4.88889C14.0515 4.81152 14.1487 4.75125 14.2548 4.71156C14.3608 4.67187 14.4737 4.65354 14.5869 4.65762C14.7001 4.66171 14.8113 4.68812 14.9143 4.73535C15.0172 4.78257 15.1098 4.84968 15.1867 4.93281C16.4718 6.30757 17.1866 8.11914 17.1866 10.001C17.1866 11.8828 16.4718 13.6944 15.1867 15.0691C15.1063 15.1551 15.0091 15.2236 14.9011 15.2703C14.7931 15.317 14.6766 15.3409 14.559 15.3406Z"
          fill="currentColor"
        />
        <path
          d="M16.7577 17.1094C16.5918 17.1093 16.4294 17.0613 16.2903 16.971C16.1511 16.8807 16.041 16.7521 15.9733 16.6007C15.9056 16.4492 15.8832 16.2814 15.9088 16.1175C15.9344 15.9536 16.0068 15.8006 16.1174 15.677C17.5111 14.1144 18.2813 12.0938 18.2813 10C18.2813 7.90623 17.5111 5.88562 16.1174 4.32305C15.9703 4.15253 15.896 3.93107 15.9105 3.70631C15.925 3.48156 16.0271 3.27147 16.1949 3.12127C16.3627 2.97106 16.5828 2.89273 16.8078 2.90315C17.0328 2.91356 17.2447 3.01188 17.3979 3.17695C19.0735 5.05467 19.9996 7.48334 19.9996 10C19.9996 12.5167 19.0735 14.9453 17.3979 16.823C17.3173 16.9131 17.2187 16.9852 17.1083 17.0345C16.998 17.0838 16.8785 17.1093 16.7577 17.1094ZM3.24205 17.1094C3.12105 17.1096 3.00137 17.0842 2.89088 17.0349C2.7804 16.9855 2.68162 16.9133 2.60104 16.823C0.925408 14.9453 -0.000671387 12.5167 -0.000671387 10C-0.000671387 7.48334 0.925408 5.05467 2.60104 3.17695C2.75426 3.01188 2.96617 2.91356 3.19115 2.90315C3.41613 2.89273 3.63621 2.97106 3.80403 3.12127C3.97184 3.27147 4.07399 3.48156 4.08848 3.70631C4.10297 3.93107 4.02865 4.15253 3.88151 4.32305C2.48787 5.88562 1.7177 7.90623 1.7177 10C1.7177 12.0938 2.48787 14.1144 3.88151 15.677C3.99209 15.8005 4.06455 15.9535 4.09015 16.1173C4.11576 16.2811 4.09341 16.4489 4.02582 16.6003C3.95822 16.7517 3.84825 16.8804 3.70918 16.9707C3.57012 17.061 3.40788 17.1092 3.24205 17.1094Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_22_9">
          <rect width="20" height="20" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  )
}
