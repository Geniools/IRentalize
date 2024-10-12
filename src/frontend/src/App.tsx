import {RouterProvider} from "react-router-dom"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"

import {ThemeProvider} from "@/components/theme-provider";

import {getApp} from "@/lib/helpers/getApp"


const App = () => {
    const appRouter = getApp()
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="system" storageKey="ui-theme">
                <RouterProvider router={appRouter}/>
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default App;