import { useContext, useRef } from "react";
import { context } from "../lib/Context";
import { useState } from "react";
import Icon from "../layout/components/Icon";

export default function Settings() {
	const input = useRef(null);
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

	function ChangeTheme(e) {
		setTheme(e);
	}

	return (
		<main className="w-full h-full m-1 p-3 space-y-0 items-start justify-start flex flex-col gap-5 overflow-auto">
			<div className="w-full h-16 bg-secondary items-center justify-center gap-1 rounded-2xl flex p-2">
				<span className="text-nowrap text-xs opacity-40 p-2">Server URL: </span>
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
			<div className="w-full h-16 bg-secondary items-center justify-center gap-1 rounded-2xl flex p-1">
				<span className="text-nowrap text-xs opacity-40 p-2">Theme: </span>
				<select
					className="w-full h-full outline-none bg-background rounded-2xl p-2"
					onChange={(e) => ChangeTheme(e.target.value)}
					value={theme}
				>
					<option value="dark">Dark</option>
					<option value="light">Light</option>
					<option value="fruit-light">Fruit (light)</option>
					<option value="fruit-dark">Fruit (dark)</option>
					<option value="neon-light">Neon (light)</option>
					<option value="neon-dark">Neon (dark)</option>
				</select>
				<div className="flex cursor-pointer items-center justify-center rounded-2xl bg-background p-4 mr-1">
					<Icon name="TbThumbUp" className="fill-text" />
				</div>
			</div>
		</main>
	);
}
