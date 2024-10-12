import {NavLink} from "react-router-dom"


const Footer = () => {
    return (
        <footer>
            <div className="">
                <NavLink to="#" className={({isActive}) => isActive ? 'active-link' : ''}>Terms of Use</NavLink>
                <NavLink to="#" className={({isActive}) => isActive ? 'active-link' : ''}>Privacy Policy</NavLink>
            </div>

            <div className="">
                &copy;{new Date().getFullYear()} IRentalize
            </div>
        </footer>
    )
}

export default Footer