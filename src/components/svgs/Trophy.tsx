import React from "react"
import SvgProps from "@/types/SvgProps"
export default function Trophy({
  width = 18,
  height = 18,
  className,
}: SvgProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.125 2.125H14.7773C14.7359 2.125 14.6962 2.10854 14.6669 2.07924C14.6376 2.04993 14.6211 2.01019 14.6211 1.96875V1.49687C14.6203 1.1659 14.4882 0.848756 14.2539 0.615011C14.0195 0.381266 13.7021 0.249999 13.3711 0.25L4.6293 0.260156C4.29866 0.260775 3.98173 0.39237 3.74789 0.626132C3.51406 0.859895 3.38236 1.17678 3.38164 1.50742V1.96875C3.38164 2.01019 3.36518 2.04993 3.33588 2.07924C3.30657 2.10854 3.26683 2.125 3.22539 2.125H0.875C0.70924 2.125 0.550268 2.19085 0.433058 2.30806C0.315848 2.42527 0.25 2.58424 0.25 2.75V3.375C0.25 5.50508 1.42187 7.76758 3.23906 8.27148C3.2928 8.28645 3.34141 8.31583 3.37963 8.35646C3.41784 8.39709 3.44421 8.44741 3.45586 8.50195C3.68125 9.55234 4.37461 10.5527 5.46406 11.3773C6.28086 11.9957 7.25508 12.4516 8.13086 12.6461C8.2001 12.6616 8.262 12.7002 8.30637 12.7556C8.35074 12.811 8.37494 12.8798 8.375 12.9508V16.3438C8.375 16.3852 8.35854 16.4249 8.32924 16.4542C8.29993 16.4835 8.26019 16.5 8.21875 16.5H5.89258C5.55625 16.5 5.26758 16.7586 5.25078 17.0949C5.24671 17.1794 5.25984 17.2639 5.28937 17.3432C5.3189 17.4224 5.36422 17.4949 5.42259 17.5562C5.48095 17.6174 5.55114 17.6662 5.62891 17.6995C5.70667 17.7328 5.7904 17.75 5.875 17.75H12.1074C12.4437 17.75 12.7324 17.4914 12.7492 17.1551C12.7533 17.0706 12.7402 16.9861 12.7106 16.9068C12.6811 16.8276 12.6358 16.7551 12.5774 16.6938C12.519 16.6326 12.4489 16.5838 12.3711 16.5505C12.2933 16.5172 12.2096 16.5 12.125 16.5H9.78125C9.73981 16.5 9.70007 16.4835 9.67076 16.4542C9.64146 16.4249 9.625 16.3852 9.625 16.3438V12.9508C9.62506 12.8798 9.64926 12.811 9.69363 12.7556C9.738 12.7002 9.7999 12.6616 9.86914 12.6461C10.7449 12.4508 11.7191 11.9957 12.5359 11.3773C13.6254 10.5527 14.3187 9.55234 14.5441 8.50195C14.5558 8.44741 14.5822 8.39709 14.6204 8.35646C14.6586 8.31583 14.7072 8.28645 14.7609 8.27148C16.5781 7.76758 17.75 5.50508 17.75 3.375V2.75C17.75 2.58424 17.6842 2.42527 17.5669 2.30806C17.4497 2.19085 17.2908 2.125 17.125 2.125ZM3.375 6.74297C3.3749 6.77035 3.36761 6.79722 3.35386 6.8209C3.34011 6.84458 3.32037 6.86422 3.29664 6.87787C3.2729 6.89152 3.24599 6.89869 3.21861 6.89867C3.19123 6.89864 3.16434 6.89143 3.14062 6.87773C2.73984 6.63906 2.44727 6.27734 2.27578 6.02266C1.81055 5.33164 1.53359 4.43398 1.50273 3.53711C1.50195 3.5161 1.5054 3.49515 1.5129 3.47551C1.5204 3.45588 1.53179 3.43795 1.54637 3.42282C1.56096 3.40768 1.57846 3.39564 1.59781 3.38743C1.61715 3.37921 1.63796 3.37499 1.65898 3.375H3.22148C3.26292 3.375 3.30267 3.39146 3.33197 3.42076C3.36127 3.45007 3.37773 3.48981 3.37773 3.53125C3.37695 4.60352 3.375 5.83086 3.375 6.74297ZM15.7238 6.02266C15.5523 6.27734 15.2602 6.63906 14.8594 6.87773C14.8356 6.89144 14.8087 6.89866 14.7813 6.89867C14.7539 6.89867 14.7269 6.89147 14.7032 6.87777C14.6794 6.86408 14.6597 6.84438 14.646 6.82065C14.6323 6.79692 14.625 6.76999 14.625 6.74258C14.625 5.70703 14.625 4.53047 14.623 3.53125C14.623 3.48981 14.6395 3.45007 14.6688 3.42076C14.6981 3.39146 14.7379 3.375 14.7793 3.375H16.3418C16.3628 3.37499 16.3836 3.37921 16.403 3.38743C16.4223 3.39564 16.4398 3.40768 16.4544 3.42282C16.469 3.43795 16.4804 3.45588 16.4879 3.47551C16.4954 3.49515 16.4988 3.5161 16.498 3.53711C16.4672 4.43398 16.1895 5.33164 15.7242 6.02266H15.7238Z"
        fill="#9BECE3"
      />
    </svg>
  )
}
