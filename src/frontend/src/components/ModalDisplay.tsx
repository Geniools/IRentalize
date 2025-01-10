import {ReactNode, useState} from "react";

interface ModalDisplayProps {
    children: ReactNode
}

const ModalDisplay: React.FC<ModalDisplayProps> = ({children}) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    if (isOpen) {
        document.body.style.overflow = 'hidden';
    }

    return (
        isOpen && (
            <div
                className="flex h-full w-full content-center items-center bg-black/50 p-normal fixed left-0 top-0 z-10"
                onClick={handleClick}
            >
                {children}
            </div>
        )
    )
}

export default ModalDisplay