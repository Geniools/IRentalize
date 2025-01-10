import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotFoundContent from "@/pages/main/partials/404NotFoundContent";


const NotFoundPage = () => {
    return (
        <div className="layout">
            <Header/>

            <main>
                <NotFoundContent/>
            </main>

            <Footer/>
        </div>
    )
}

export default NotFoundPage