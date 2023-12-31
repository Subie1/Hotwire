import { useContext } from "react"
import { context } from "../../lib/Context"

export default function Square() {
    const { setPage } = useContext(context);
    return (<div onClick={() => setPage(1)} className="cursor-pointer w-16 h-16 bg-primary"></div>)
}