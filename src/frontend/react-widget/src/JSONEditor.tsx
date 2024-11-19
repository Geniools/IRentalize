import "@blocknote/core/fonts/inter.css";
import {BlockNoteView} from "@blocknote/mantine";

import "@blocknote/mantine/style.css";
import {useCreateBlockNote} from "@blocknote/react";

export default function JSONEditor() {
    // Get the theme from the html class
    const theme = document.documentElement.classList.contains("dark") ? "dark" : "light"

    // Creates a new editor instance.
    const editor = useCreateBlockNote(

    );

    // Renders the editor instance using a React component.
    return (
        <BlockNoteView
            editor={editor}
            editable={true}
            theme={theme}
        />
    )
}
