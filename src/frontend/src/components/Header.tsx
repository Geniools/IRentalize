import {Link} from "react-router-dom";

import {ModeToggle} from "@/components/ModeToggle";
import NavigationBar from "@/components/NavigationBar";


const Header = () => {
    return (
        <header className="flex gap-3">
            <div className={""}>
                <Link to={"/"}>
                    <img src="/static/assets/favicon.png" alt="IRentalize"/>
                </Link>
            </div>

            <div className={"flex w-full justify-end gap-10"}>
                <NavigationBar/>

                <div className="flex items-center">
                    <ModeToggle/>
                </div>
            </div>
        </header>
    )
}

export default Header;
