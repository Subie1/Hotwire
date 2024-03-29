import { useContext, useEffect, useState } from "react";
import Icon from "./Icon";
import { context } from "../../lib/Context";
import axios from "axios";
import { writeText } from "@tauri-apps/api/clipboard";

export default function Sidebar() {
	const {
		playlists,
		host,
		setPage,
		setSongs,
		setPlaylistsOpen,
		setCurrentPlaylist,
		currentPlaylist,
		setContextElements,
		setPlaylists,
	} = useContext(context);

	const [render, setRender] = useState([]);

	function ChangeTo(index, playlist) {
		setPage(index);

		if (!playlist) return setCurrentPlaylist(false);
		if (!playlist.id) return setCurrentPlaylist(false);
		if (currentPlaylist && currentPlaylist === playlist.id) return;

		axios.get(`${host}/api/playlists/${playlist.id}`).then(({ data }) => {
			if (!data) return;
			if (!data.name) return;

			setSongs(data.songs);
			setCurrentPlaylist(playlist.id);
		});
	}

	async function DeletePlaylist(id) {
		if (currentPlaylist && currentPlaylist === id) setCurrentPlaylist(false);
		await axios.delete(`${host}/api/playlists/${id}`);
		setPlaylists(playlists.filter(p => p !== id));
	}

	useEffect(() => {
		(async () => {
			const chunks = [];
			for (const playlist of playlists) {
				try {
					const { data } = await axios.get(
						`${host}/api/playlists/${playlist}`
					);
					if (!data) continue;
					if (!data.name) continue;

					chunks.push(data);
				} catch {
					continue;
				}
			}
			setRender(chunks);
		})();
	}, [playlists]);

	return (
		<nav className="w-fit z-20 h-full flex flex-col items-center justify-start p-2 gap-2">
			<div className="w-fit h-full rounded-xl bg-text/5 p-2 flex flex-col gap-2">
				<div
					onClick={() => ChangeTo(0)}
					className="transition-all duration-200 group hover:scale-105 flex relative items-center justify-center cursor-pointer rounded-xl text-lg bg-background p-3"
				>
					<Icon name="TbLayoutList" className="opacity-80" />
				</div>
				<div className="w-full h-full flex flex-col gap-1">
					{render.map((playlist) => (
						<div
							onContextMenu={() => setContextElements([{ name: "Share", icon: "TbExternalLink", action: () => writeText(`${host}/api/playlists/${playlist.id}`) }, { name: "Delete", icon: "TbTrash", action: () => DeletePlaylist(playlist.id) }])}
							onClick={() => ChangeTo(0, playlist)}
							key={playlist.id}
							className="transition-all group text-lg duration-200 group hover:scale-105 flex relative w-fit h-fit items-center justify-center cursor-pointer rounded-xl p-3 bg-gradient-to-br from-primary to-accent text-text"
						>
							<Icon name="TbMusicShare" />
							<span className="absolute text-nowrap scale-0 group-hover:scale-100 transition-all duration-200 px-2 py-1 bg-secondary left-9 rounded-lg text-xs">
								{playlist.name}
							</span>
						</div>
					))}
				</div>
			</div>
			<div
				onClick={() => setPlaylistsOpen(true)}
				className="w-fit h-fit rounded-xl bg-text/5 p-2 flex flex-col gap-2"
			>
				<div className="transition-all duration-200 group hover:scale-105 flex relative items-center justify-center cursor-pointer rounded-xl text-lg bg-background p-3">
					<Icon name="TbPlus" className="opacity-80" />
				</div>
			</div>
			<div
				onClick={() => setPage(1)}
				className="w-fit h-fit rounded-xl bg-text/5 p-2 flex flex-col gap-2"
			>
				<div className="transition-all duration-200 group hover:scale-105 flex relative items-center justify-center cursor-pointer rounded-xl text-lg bg-background p-3">
					<Icon name="TbSettings" className="opacity-80" />
				</div>
			</div>
		</nav>
	);
}
