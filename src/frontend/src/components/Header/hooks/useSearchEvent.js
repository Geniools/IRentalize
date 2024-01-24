import {useEffect, useRef, useState} from "react";

const useSearchEvent = () => {
    const searchFormRef = useRef();
    const searchFormButtonRef = useRef();

    const [showSearchForm, setShowSearchForm] = useState(false);


    useEffect(() => {
        // Function to handle outside clicks
        const handleOutsideClick = event => {
            if (
                // Check if the click was outside the search form
                searchFormRef.current && !searchFormRef.current.contains(event.target) &&
                // Also check if it was not the button that toggles the search form
                searchFormButtonRef.current && !searchFormButtonRef.current.contains(event.target)
            ) {
                // Hide search form on outside click
                setShowSearchForm(false);
            }
        }
        // Add click event listener to the document
        document.addEventListener('click', handleOutsideClick);
        // Cleanup - remove event listener when the component is unmounted
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }
    }, []);

    return {searchFormRef, searchFormButtonRef, showSearchForm, setShowSearchForm};
}

export default useSearchEvent;