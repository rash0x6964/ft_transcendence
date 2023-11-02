import React from "react";
import SvgProps from "@/types/SvgProps";

export default function EditRoom({ width, height, className }: SvgProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
			width={width}
			height={height}
      xmlns="http://www.w3.org/2000/svg"
      stroke="#CBD5E1"
			className={className}
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M27.954 14.394C30.2317 12.09 33.1724 10.5552 36.365 10.0041C39.5576 9.45293 42.8426 9.91301 45.761 11.32L38.099 19.042C37.3647 19.7842 36.9529 20.786 36.9529 21.83C36.9529 22.874 37.3647 23.8759 38.099 24.618L39.945 26.479C40.3069 26.8449 40.7377 27.1354 41.2126 27.3336C41.6874 27.5319 42.1969 27.6339 42.7115 27.6339C43.2261 27.6339 43.7356 27.5319 44.2104 27.3336C44.6853 27.1354 45.1161 26.8449 45.478 26.479L53.14 18.757C54.6974 22.0413 55.0787 25.7609 54.2201 29.2928C53.3615 32.8247 51.3152 35.9542 48.424 38.157C46.1421 39.8846 43.4283 40.95 40.5806 41.2365C37.7329 41.523 34.8613 41.0194 32.281 39.781L18.418 53.751C18.0562 54.1169 17.6255 54.4073 17.1507 54.6056C16.6759 54.8038 16.1665 54.9058 15.652 54.9058C15.1375 54.9058 14.6281 54.8038 14.1533 54.6056C13.6785 54.4073 13.2478 54.1169 12.886 53.751L11.04 51.89C10.3052 51.1482 9.89305 50.1462 9.89305 49.102C9.89305 48.0579 10.3052 47.0559 11.04 46.3141L24.905 32.3401C23.5083 29.3978 23.0517 26.0968 23.5972 22.8858C24.1428 19.6749 25.664 16.7099 27.954 14.394V14.394Z"
          stroke="#CBD5E1"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
}
