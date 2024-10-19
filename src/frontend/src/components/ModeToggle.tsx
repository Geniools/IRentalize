import {Button} from "@/components/ui/button"
import {useTheme} from "@/components/ThemeProvider"

import {Moon, Sun} from "lucide-react"

export function ModeToggle() {
    const {setTheme, theme} = useTheme()

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() => {
                setTheme(theme === "light" ? "dark" : "light")
            }}
        >
            {theme === "light" ? <Moon/> : <Sun/>}
        </Button>
    )
}
