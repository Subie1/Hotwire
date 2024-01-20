import { useContext, useRef, useState } from "react";
import { context } from "../lib/Context";
import Icon from "../layout/components/Icon";
import Dropdown from "../layout/components/Dropdown";

export default function Settings() {
	const input = useRef(null);
	const [advanced, setAdvanced] = useState(false);
	const { host, setHost } = useContext(context);
	const { theme, setTheme } = useContext(context);

	function ChangeHost() {
		if (!input.current) return;
		if (!input.current.value) return;
		if (!input.current.value.trim().length) return;

		let query = input.current.value.trim();
		if (query.endsWith("/")) query = query.slice(0, query.length - 1);
		setHost(query);

		input.current.value = "";
	}

	return (
		<main className="w-full h-full m-1 p-3 space-y-0 items-start justify-start flex flex-col gap-3 overflow-auto">
			<div className="w-full h-16 relative bg-secondary items-center justify-center gap-1 rounded-2xl flex p-2">
				<span className="text-nowrap text-xs opacity-40 p-2">Theme: </span>
				<Dropdown
					className="w-full h-full"
					value={theme}
					values={[
						{ name: "Light", value: "light" },
						{ name: "Dark", value: "dark" },
						{ name: "Cotton Candy", value: "cotton-candy" },
						{ name: "Dracula", value: "dracula" },
					]}
					onChange={(query) => setTheme(query)}
				/>
			</div>
			<div
				onClick={() => setAdvanced(!advanced)}
				className="w-full cursor-pointer flex items-center justify-center gap-2"
			>
				Advanced <Icon name={advanced ? "TbChevronUp" : "TbChevronDown"} />
			</div>
			<div
				className={`${
					advanced ? "flex" : "hidden"
				} flex-col gap-1 w-full h-full`}
			>
				<div className="w-full h-16 bg-secondary items-center justify-center gap-1 rounded-2xl flex p-2">
					<span className="text-nowrap text-xs opacity-40 p-2">
						Server URL:{" "}
					</span>
					<input
						placeholder={host}
						ref={input}
						type="text"
						className="w-full h-full outline-none bg-background rounded-2xl p-2"
					/>
					<div
						onClick={() => ChangeHost()}
						className="flex cursor-pointer items-center justify-center rounded-2xl bg-background p-4"
					>
						<Icon name="TbThumbUp" className="fill-text" />
					</div>
				</div>
			</div>
		</main>
	);
}
