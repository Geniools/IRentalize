import {getApp} from "./utils/helpers/getApp"
import {RouterProvider} from "react-router-dom"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"

import {Toaster} from "@/components/ui/toaster"


const App = () => {
    const appRouter = getApp()
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={appRouter}/>

            <Toaster/>
        </QueryClientProvider>
    )
}

export default App;