import PropWithClass from "@/types/PropWithClass"

export default function Loader({className}:PropWithClass) {
  return (
	<span className={`loader ${className}`}></span>
  )
}
