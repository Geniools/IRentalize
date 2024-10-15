import {DotLottieReact} from "@lottiefiles/dotlottie-react";
import {Link} from "react-router-dom";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TextWritingAnimation from "@/components/TextWritingAnimation";
import {Button} from "@/components/ui/button";


const NotFoundPage = () => {
    return (
        <div className="layout">
            <Header/>

            <main className={"flex flex-col gap-5"}>
                <div className="flex justify-center">
                    <DotLottieReact
                        className="w-3/6"
                        src={"/static/lottie/404-not-found.lottie"}
                        loop
                        autoplay
                    />
                </div>

                <div className="flex justify-center">
                    <p>
                        <TextWritingAnimation>
                            Oops! Page not found :(
                        </TextWritingAnimation>
                    </p>
                </div>

                <div className={"flex justify-center"}>
                    <Button variant={"link"}>
                        <Link to={"/"}>Go back to home</Link>
                    </Button>
                </div>
            </main>

            <Footer/>
        </div>
    )
}

export default NotFoundPage