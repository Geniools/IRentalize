import {ReactNode} from "react";

interface ModalDisplayInterface {
    children: ReactNode
}

export default function ModalDisplay({children}: ModalDisplayInterface) {
    return (
        <div className="flex h-full w-full content-center items-center bg-black/50 p-normal fixed left-0 top-0 z-10">
            {children}
        </div>
    )
}