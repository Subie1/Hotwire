import * as TbIcons from "react-icons/tb";

export default function Icon({ name, className }) {
	if (!name) return <TbIcons.TbError404 className={className ?? ""} />;
	if (!TbIcons[name]) return <TbIcons.TbError404 className={className ?? ""} />;

	const Request = TbIcons[name];
	return <Request className={className ?? ""} />;
}
