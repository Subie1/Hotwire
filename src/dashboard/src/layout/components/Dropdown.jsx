import { useEffect, useState } from "react";
import Icon from "./Icon";

export default function Dropdown({ onChange, values, value, className }) {
	const [currentValue, setCurrentValue] = useState(value);
	const [isOpen, setOpened] = useState(false);

	useEffect(() => {
		if (!onChange) return;
		onChange(currentValue);
	}, [currentValue]);

	return (
		<div
            onMouseLeave={() => setOpened(false)}
			onClick={() => setOpened(!isOpen)}
			className={`${className} cursor-pointer flex items-center justify-between relative p-4 rounded-xl bg-background`}
		>
			<div>{value.name}</div>
			<Icon name={isOpen ? "TbChevronUp" : "TbChevronDown"} />
			<div
				className={
					`absolute border border-secondary top-12 p-1 w-full h-fit ${isOpen ? "flex" : "hidden"} flex-col rounded-lg bg-background left-0`
				}
			>
				{values.map((value) => (
					<a className="p-2 rounded-lg w-full transition-all duration-300 hover:bg-secondary" onClick={() => setCurrentValue(value)} key={value.value}>
						{value.name}
					</a>
				))}
			</div>
		</div>
	);
}
