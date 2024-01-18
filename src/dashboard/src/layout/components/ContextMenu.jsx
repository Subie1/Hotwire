import Icon from "./Icon";

import { useContext } from "react";
import { context } from "../../lib/Context";

export default function ContextMenu({ x, y, exit, elements }) {
	const { setPage } = useContext(context);

	return (
		<div
			onMouseLeave={() => (exit ? exit() : {})}
			style={{ top: y, left: x }}
			id="nice_context_menu"
			className="fixed z-[100] w-fit rounded-lg border-2 border-gray-700 border-opacity-10 bg-gray-800 backdrop-blur-2xl bg-opacity-20 text-text"
		>
			<a
				onClick={() => {
					setPage(0);
					exit();
				}}
				className="cursor-pointer m-1 w-64 hover:bg-gray-700 opacity-60 hover:backdrop-blur-3xl transition-all duration-200 py-1 px-3 rounded-lg flex items-center justify-start gap-2"
			>
				<Icon name="TbHome" />
				Home
			</a>
			<a
				onClick={() => {
					window.location.reload();
					exit();
				}}
				className="cursor-pointer m-1 w-64 hover:bg-gray-700 opacity-60 hover:backdrop-blur-3xl transition-all duration-200 py-1 px-3 rounded-lg flex items-center justify-start gap-2"
			>
				<Icon name="TbReload" />
				Refresh
			</a>

			{elements.map((element) => (
				<a
					key={element.name}
					onClick={() => {
						element.action();
						exit();
					}}
					className="cursor-pointer m-1 w-64 hover:bg-gray-700 opacity-60 hover:backdrop-blur-3xl transition-all duration-200 py-1 px-3 rounded-lg flex items-center justify-start gap-2"
				>
					<Icon name={element.icon} />
					{element.name}
				</a>
			))}

			<a
				onClick={() => {
					setPage(1);
					exit();
				}}
				className="cursor-pointer m-1 w-64 hover:bg-gray-700 opacity-60 hover:backdrop-blur-3xl transition-all duration-200 py-1 px-3 rounded-lg flex items-center justify-start gap-2"
			>
				<Icon name="TbSettings" />
				Settings
			</a>
		</div>
	);
}
