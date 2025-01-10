import {DotLottieReact} from "@lottiefiles/dotlottie-react";
import TextWritingAnimation from "@/components/TextWritingAnimation";
import {Button} from "@/components/ui/button";
import {Link} from "react-router-dom";

type NotFoundContentProps = {
    pageName?: string
}

const NotFoundContent = (props: NotFoundContentProps) => {
    const pageName = props.pageName ?? "Page"

    return (
        <div className={"flex flex-col gap-5"}>
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
                        {"Oops! " + pageName + " not found :("}
                    </TextWritingAnimation>
                </p>
            </div>

            <div className={"flex justify-center"}>
                <Button variant={"link"}>
                    <Link to={"/"}>Go back to home</Link>
                </Button>
            </div>
        </div>
    )
}

export default NotFoundContent