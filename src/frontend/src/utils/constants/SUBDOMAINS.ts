import {appRouter} from "@/routers";

export const APPS = [
    {
        subdomain: 'www',
        app: appRouter,
        main: true,
    },
    // {
    //     subdomain: 'student',
    //     app: studentFinanceRouter,
    //     main: false,
    // }
]