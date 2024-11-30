import React, {StrictMode, useEffect, useState} from "react";
import {createRoot} from "react-dom/client"
import {Theme} from "@blocknote/mantine";

import JSONEditor from "./JSONEditor.tsx";


type EditorTheme = "light" | "dark" | Theme

class JSONWidget {
    theme: EditorTheme
    content: string
    private setThemeCallback: (theme: EditorTheme) => void
    private readonly updateContentCallback: (content: string) => void

    constructor(initialValue: string, theme: EditorTheme = "light", updateContentCallback: (content: string) => void) {
        this.content = initialValue
        this.setThemeCallback = () => {
        }
        this.updateContentCallback = updateContentCallback
        this.theme = theme
    }

    render(id: string) {
        const WidgetWrapper: React.FC = () => {
            const [theme, setTheme] = useState<EditorTheme>(this.theme)
            const [content, setContent] = useState<string>(this.content)

            // This is a hack to pass the setTheme function to the JSONEditor component.
            useEffect(() => {
                this.setThemeCallback = setTheme
            }, [])

            // Save the content to the instance variable.
            useEffect(() => {
                this.content = content
                this.updateContentCallback(content)
            }, [content])

            return (
                <StrictMode>
                    <JSONEditor
                        content={content}
                        setContent={setContent}
                        theme={theme}
                    />
                </StrictMode>
            )
        }

        createRoot(document.getElementById(id)!).render(<WidgetWrapper/>)
    }

    setTheme(theme: EditorTheme) {
        this.theme = theme
        this.setThemeCallback(theme)
    }
}

window.JSONWidget = JSONWidget
// console.log("JSONWidget loaded: ", window.JSONWidget)
