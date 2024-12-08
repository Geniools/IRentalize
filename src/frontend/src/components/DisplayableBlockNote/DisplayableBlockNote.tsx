import {useTheme} from "@/components/ThemeProvider"

import {type Block} from "@blocknote/core"

import {useCreateBlockNote} from "@blocknote/react"
import {BlockNoteView} from "@blocknote/shadcn"
import "@blocknote/shadcn/style.css"
import "@blocknote/core/fonts/inter.css"
import "./blocknote.css"


const DisplayableBlockNote = (props: { content?: Block[] }) => {
    const {content} = props
    if (!content) {
        return null
    }

    // Remove empty blocks
    content.map((block, index) => {
        if (block.type === "paragraph" && block.content.length === 0) {
            content.splice(index, 1)
        }
    })
    const theme = useTheme().theme

    const editor = useCreateBlockNote({
        initialContent: content,
    })

    return (
        <BlockNoteView
            editor={editor}
            theme={theme}
            editable={false}
        />
    )
}

export default DisplayableBlockNote