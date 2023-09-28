import Input from "@/components/BaseComponents/Input"
import MainButton from "@/components/BaseComponents/MainButton"
import RadioGroup from "@/components/RadioGroup/RadioGroup"
import Camera from "@/components/svgs/Camera"
import CreateChanelIcn from "@/components/svgs/CreateChanelIcn"
import Lock from "@/components/svgs/Lock"
import Plus from "@/components/svgs/Plus"
import TVIcn from "@/components/svgs/TVIcn"

export default function CreateChannelDialBox() {
	const options = ["Public", "Private"]

	return (
		// <div className="rounded-xl p-[1px] bg-gradient-to-br from-gray-600 via-black to-gray-600">
		<div className="bg-secondary p-4 rounded-xl ">
			<div className="flex relative">
				<div className="rounded-full w-36 h-36 flex flex-col justify-center mx-auto m-12 mt-16 mr-40 ml-40  border-gray-500 border-2 bg-[#D9D9D9]">
					<Camera className="text-black mx-auto" width={50} height={50} />
				</div>
				{/* <img
					className="rounded-full w-36 h-36 mx-auto m-12 mt-16 mr-40 ml-40"
					src="https://empowher.org/wp-content/uploads/2021/03/image-placeholder-350x350-1.png"
					alt=""
				/> */}
				<div className="absolute top-[172px] right-[172px] w-7 h-7 bg-gray-200 rounded-full items-center flex  border-gray-500 border-2">
					<Plus  width={16} height={16} className="text-black mx-auto"/>
				</div>
				{/* <img
					className="absolute top-[172px] right-[172px] w-10 h-10 bg-gray-200 rounded-full"
					src="https://cdn-icons-png.flaticon.com/512/262/262038.png"
					alt=""
				/> */}
			</div>
			<Input
				placeholder="Channel Name"
				icon={<TVIcn width={20} height={20} />}
				className="mb-4 w-80 h-11 bg-big-stone mx-auto"
			/>
			<Input
				placeholder="Password"
				icon={<Lock />}
				className="mb-7 w-80 h-11 bg-big-stone mx-auto"
			/>
			<RadioGroup
				defaultVal="Public"
				radios={options}
				className="flex justify-center gap-10"
			/>
			<div className="flex justify-center mt-20">
				<MainButton className="mb-2">
					<p className="text-base font-semibold pt-4 pb-4 pr-8 pl-8 rounded-xl">
						Create Channel
					</p>
				</MainButton>
			</div>
		</div>
		// </div>
	)
}