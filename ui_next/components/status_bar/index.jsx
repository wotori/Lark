import { useAtom } from "jotai"
import { JAppStatus } from "../jotai/index"

export default function StatusBar() {
    const [status] = useAtom(JAppStatus)
    return (
        <div className="p-7 bg-blue fixed z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl">
        {/* <div className="p-7 bg-blue fixed z-20 text-4xl bottom-0 left-0 h-16 w-16"> */}
            <p className="loader">{status}</p>
        </div>
    )
}