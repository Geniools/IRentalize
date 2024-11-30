import "@blocknote/core/fonts/inter.css";
import {BlockNoteView, Theme} from "@blocknote/mantine";

import "@blocknote/mantine/style.css";
import {useCreateBlockNote} from "@blocknote/react";

interface JSONEditorProps {
    content: string;
    setContent: (content: string) => void;
    theme?: "light" | "dark" | Theme;
}

export default function JSONEditor(options: JSONEditorProps) {
    const {content, setContent, theme} = options;

    // Creates a new editor instance.
    const editor = useCreateBlockNote({
        initialContent: JSON.parse(content),
    });

    // Renders the editor instance using a React component.
    return (
        <BlockNoteView
            editor={editor}
            editable={true}
            theme={theme}
            onChange={() => {
                setContent(JSON.stringify(editor.document, null, 2))
            }}
        />
    )
}
