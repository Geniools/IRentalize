import {useEffect, useState} from "react";

const useMediaQueryEvent = () => {
    const [isNavVisible, setIsNavVisible] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        // Handle media query change
        const handleMediaQueryChange = mediaQuery => {
            if (mediaQuery.matches) {
                setIsSmallScreen(true);
            } else {
                setIsSmallScreen(false);
            }
        }
        // Set up media query
        const mediaQuery = window.matchMedia('(max-width: 1400px)');
        // Add event listener to the media query
        mediaQuery.addEventListener('change', handleMediaQueryChange);
        handleMediaQueryChange(mediaQuery);
        // Cleanup - remove event listener when the component is unmounted
        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        }
    }, []);

    return {isNavVisible, setIsNavVisible, isSmallScreen};
}

export default useMediaQueryEvent;