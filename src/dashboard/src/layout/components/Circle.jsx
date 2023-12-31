import { useContext } from "react"
import { context } from "../../lib/Context"

export default function Circle() {
    const { setPage } = useContext(context);
    return (<div onClick={() => setPage(0)} className="cursor-pointer w-16 h-16 bg-primary rounded-full"></div>)
}