import {Outlet} from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import {Toaster} from "@/components/ui/toaster";
import {Toaster as ToasterSonner} from "@/components/ui/sonner"


const MainLayout = () => {
    return (
        <div className="layout">
            <Header/>

            <main className="">
                <Outlet/>
            </main>

            <Toaster/>
            <ToasterSonner/>

            <Footer/>
        </div>
    )
}

export default MainLayout