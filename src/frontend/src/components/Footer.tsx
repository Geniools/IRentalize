import {Link} from "react-router-dom"

const Footer = () => {
    return (
        <footer>
            <div className="flex flex-row h-full w-full gap-8">
                {/*<div className="">*/}
                {/*    <NavLink to="#" className={({isActive}) => isActive ? 'active-link' : ''}>Terms of Use</NavLink>*/}
                {/*    <NavLink to="#" className={({isActive}) => isActive ? 'active-link' : ''}>Privacy Policy</NavLink>*/}
                {/*</div>*/}

                <div className="flex-1 flex h-full justify-end items-center">
                    <i><strong>
                        <Link to="mailto:info@irentalize.nl" typeof={"email"}>info.irentalize.nl</Link>
                    </strong></i>
                </div>

                <div className="flex-1 flex h-full justify-start items-center">
                    &copy;{new Date().getFullYear()} IRentalize
                </div>
            </div>
        </footer>
    )
}

export default Footer