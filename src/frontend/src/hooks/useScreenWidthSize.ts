import {useEffect, useState} from "react";

const useScreenWidthSize = () => {
    const [screenWidthSize, setScreenWidthSize] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setScreenWidthSize(window.innerWidth);
        window.addEventListener("resize", handleResize);
        
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return screenWidthSize;
}

export default useScreenWidthSize;