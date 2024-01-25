import {useEffect, useMemo, useState} from "react";

const useMediaQueryEvent = () => {
    // Used to prevent sudden appearance of the navbar when navigating to a new page
    const initialIsSmallScreen = useMemo(() => {
        return window.matchMedia("(max-width: 1400px)").matches;
    }, [window.matchMedia("(max-width: 1400px)")]);

    const [isNavVisible, setIsNavVisible] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(initialIsSmallScreen);

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
        const mediaQuery = window.matchMedia("(max-width: 1400px)");
        // Add event listener to the media query
        mediaQuery.addEventListener("change", handleMediaQueryChange);
        handleMediaQueryChange(mediaQuery);
        // Cleanup - remove event listener when the component is unmounted
        return () => {
            mediaQuery.removeEventListener("change", handleMediaQueryChange);
        }
    }, []);

    return {isNavVisible, setIsNavVisible, isSmallScreen};
}

export default useMediaQueryEvent;