import AuthIcon from "@/components/svgs/AuthIcon";
import FriendRequestsDialBox from "../../UI/game/chat/ChatBar/DialogueBoxes/FriendRequestsDialBox";
import MainButton from "./MainButton";
import React from "react";

type Props =
	{
		onClick?: (data: string) => void;
	}


export default function AuthDialBox({ onClick }: Props) {
	const handleSubmit = (e: any) => {

		e.preventDefault();
		let str = "";
		for (let i = 0; i < 6; i++)
			str += e.target[i].value;
		onClick && onClick(str);
	}
	return (
		<form onSubmit={handleSubmit} className="gradient-border-2  p-6 rounded-xl ">
			<AuthIcon className="mx-auto mt-14 mb-4 w-fit" width={70} height={70} />
			<div className="mx-auto w-fit text-xl mb-8 ">Authenticate your account</div>
			<div className="w-fit mx-auto text-sm font-normal mb-10 text-slate-500">Enter the generated code provided by google authenticator</div>

			<div className="flex mx-auto w-fit mb-8">

				<div className="flex gap-2">
					<input maxLength={1} required={true} className="authInput  bg-big-stone mx-auto pl-[1.5rem] w-14 h-14 rounded-md appearance-none outline-none" type="text" />
					<input maxLength={1} required={true} className="authInput bg-big-stone mx-auto pl-[1.5rem] w-14 h-14 rounded-md appearance-none outline-none" type="text" />
					<input maxLength={1} required={true} className="authInput bg-big-stone mx-auto pl-[1.5rem] w-14 h-14 rounded-md appearance-none outline-none" type="text" />
				</div>
				<div className="h-[2px] w-4 my-auto mx-4 bg-slate-700"></div>

				<div className="flex gap-2">
					<input maxLength={1} required={true} className="authInput bg-big-stone mx-auto pl-[1.5rem] w-14 h-14 rounded-md appearance-none outline-none" type="text" />
					<input maxLength={1} required={true} className="authInput bg-big-stone mx-auto pl-[1.5rem] w-14 h-14 rounded-md appearance-none outline-none" type="text" />
					<input maxLength={1} required={true} className="authInput bg-big-stone mx-auto pl-[1.5rem] w-14 h-14 rounded-md appearance-none outline-none" type="text" />
				</div>
			</div>

			<div className="mx-auto w-fit mb-4">
				<MainButton type="submit" className="mx-auto  px-6 py-3 rounded-sm ">
					Continue
				</MainButton>
			</div>




		</form>
	)
}

