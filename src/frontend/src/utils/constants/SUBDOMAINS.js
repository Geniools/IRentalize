import {AppRouter, StudentFinanceRouter} from "../../routers";

export const APPS = [
    {
        subdomain: 'www',
        app: AppRouter,
        main: true,
    },
    {
        subdomain: 'student',
        app: StudentFinanceRouter,
        main: false,
    }
]