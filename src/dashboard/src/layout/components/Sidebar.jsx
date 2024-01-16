import { useContext, useEffect, useState } from "react";
import Icon from "./Icon";
import { context } from "../../lib/Context";
import axios from "axios";

export default function Sidebar() {
	const [render, setRender] = useState([]);
	const { playlists, host, setPage } = useContext(context);

	function RenderElements() {
		const chunks = [];
		for (const playlist of playlists) {
			try {
				axios.get(`${host}/api/playlist/${playlist}`).then(({ data }) => {
					if (!data) return;
					if (!data.name) return;

					chunks.push(data);
				});
			} catch {
				continue;
			}
		}
		setRender(chunks);
	}

	useEffect(() => {
		RenderElements();
	}, [playlists]);

	return (
		<nav className="w-fit h-full flex flex-col items-center justify-start p-2 gap-2">
			<div className="w-fit h-full rounded-xl bg-secondary p-2 flex flex-col gap-2">
				<div onClick={() => setPage(0)} className="transition-all duration-200 group hover:scale-105 flex relative items-center justify-center cursor-pointer rounded-xl text-lg bg-background p-3">
					<Icon name="TbLayoutList" className="opacity-80" />
				</div>
				{render.map((playlist) => (
					<div
						key={playlist.id}
						className="transition-all text-lg duration-200 group hover:scale-105 flex relative w-fit h-fit items-center justify-center cursor-pointer rounded-xl bg-background p-3"
					>
						<span>{playlist.name.charAt(0).toUpperCase()}</span>
					</div>
				))}
			</div>
			<div className="w-fit h-fit rounded-xl bg-secondary p-2 flex flex-col gap-2">
				<div className="transition-all duration-200 group hover:scale-105 flex relative items-center justify-center cursor-pointer rounded-xl text-lg bg-background p-3">
					<Icon name="TbPlus" className="opacity-80" />
				</div>
			</div>
			<div onClick={() => setPage(1)} className="w-fit h-fit rounded-xl bg-secondary p-2 flex flex-col gap-2">
				<div className="transition-all duration-200 group hover:scale-105 flex relative items-center justify-center cursor-pointer rounded-xl text-lg bg-background p-3">
					<Icon name="TbSettings" className="opacity-80" />
				</div>
			</div>
		</nav>
	);
}
