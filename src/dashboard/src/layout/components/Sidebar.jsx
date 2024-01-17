import { useContext, useEffect, useState } from "react";
import Icon from "./Icon";
import { context } from "../../lib/Context";
import axios from "axios";

export default function Sidebar() {
	const [render, setRender] = useState([]);
	const {
		playlists,
		host,
		setPage,
		setSongs,
		setPlaylistsOpen,
		setCurrentPlaylist,
	} = useContext(context);

	function RenderElements() {
		setRender([]);
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

	function ChangeTo(index, id) {
		setPage(index);
		if (!id) return setCurrentPlaylist(false);

		axios.get(`${host}/api/playlist/${id}`).then(({ data }) => {
			if (!data) return;
			if (!data.name) return;

			setSongs(data.songs);
			setCurrentPlaylist(id);
		})
	}

	useEffect(() => {
		RenderElements();
	}, []);

	return (
		<nav className="w-fit h-full flex flex-col items-center justify-start p-2 gap-2">
			<div className="w-fit h-full rounded-xl bg-secondary p-2 flex flex-col gap-2">
				<div
					onClick={() => ChangeTo(0)}
					className="transition-all duration-200 group hover:scale-105 flex relative items-center justify-center cursor-pointer rounded-xl text-lg bg-background p-3"
				>
					<Icon name="TbLayoutList" className="opacity-80" />
				</div>
				{render.map((playlist) => (
					<div
						onClick={() => ChangeTo(0, playlist.id)}
						key={playlist.id}
						className="transition-all group text-lg duration-200 group hover:scale-105 flex relative w-fit h-fit items-center justify-center cursor-pointer rounded-xl p-3 bg-gradient-to-br from-primary to-accent text-text"
					>
						<Icon name="TbMusicShare" />
						<span className="absolute text-nowrap scale-0 group-hover:scale-100 transition-all duration-200 px-2 py-1 bg-secondary left-9 rounded-lg text-xs">{playlist.name}</span>
					</div>
				))}
			</div>
			<div
				onClick={() => setPlaylistsOpen(true)}
				className="w-fit h-fit rounded-xl bg-secondary p-2 flex flex-col gap-2"
			>
				<div className="transition-all duration-200 group hover:scale-105 flex relative items-center justify-center cursor-pointer rounded-xl text-lg bg-background p-3">
					<Icon name="TbPlus" className="opacity-80" />
				</div>
			</div>
			<div
				onClick={() => setPage(1)}
				className="w-fit h-fit rounded-xl bg-secondary p-2 flex flex-col gap-2"
			>
				<div className="transition-all duration-200 group hover:scale-105 flex relative items-center justify-center cursor-pointer rounded-xl text-lg bg-background p-3">
					<Icon name="TbSettings" className="opacity-80" />
				</div>
			</div>
		</nav>
	);
}
