import Header from "../../components/Header.tsx"
import RequestForm from "./partials/RequestForm/RequestForm"
import Footer from "../../components/Footer.tsx"

const IndexPage = () => {
    return (
        <>
            <Header/>

            <div className="page-container">
                <RequestForm/>
            </div>

            <Footer/>
        </>
    )
}

export default IndexPage