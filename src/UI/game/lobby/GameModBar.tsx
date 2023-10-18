
import React from 'react'
import { useState } from 'react';
import GameModButton from './GameModButton'

type Props =
	{
		onChange?: ({ name, src }: { name: string, src: string }) => any,
		className?:string
	}
export default function GameModBar({ onChange , className }: Props) {

	const handleChange = (i: number) => {
		setSelectedIndex(i);
		onChange && onChange(gameMods[i]);

	}
	const [selectedIndex, setSelectedIndex] = useState<number>(0);
	let gameMods =
		[
			{
				name: "Normal",
				src: 'https://steamavatar.io/img/14777429717elSu.jpg',
			},
			{
				name: "Normal",
				src: 'https://steamavatar.io/img/14777429717elSu.jpg',
			}, {
				name: "Normal",
				src: 'https://steamavatar.io/img/14777429717elSu.jpg',
			}, {
				name: "Normal",
				src: 'https://steamavatar.io/img/14777429717elSu.jpg',
			}, {
				name: "Normal",
				src: 'https://steamavatar.io/img/14777429717elSu.jpg',
			},


		]
	return (
		<div className={`flex flex-col   rounded-xl px-3 pt-3 border shadow border-[#4D4D4D] ${className}`}>
			<div className='flex gap-5 mb-2'>
				{gameMods.map((gameMod, i) => {
					return <GameModButton onClick={() =>{
						handleChange(i);
					}} key={"gameMod-" + i} gameMod={gameMod.name} img={gameMod.src} selected={selectedIndex == i} />;

				})}
			</div>
			<span className='text-center text-xs font-medium mb-1'> Game Mod</span>
		</div>
	)
}
