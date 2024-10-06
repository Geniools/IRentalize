import {Outlet} from "react-router-dom";
import Header from "@/components/Header";

const MainLayout = () => {
    return (
        <>
            <Header/>

            <main className="layout">
                <Outlet/>
            </main>

            {/*<Footer/>*/}
        </>
    )
}

export default MainLayout