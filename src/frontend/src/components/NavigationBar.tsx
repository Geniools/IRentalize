import {NavigationMenu, NavigationMenuItem, NavigationMenuList} from "@/components/ui/navigation-menu";
import {NavLink} from "react-router-dom";
import {ReactNode} from "react";
import {Button} from "@/components/ui/button";

const CustomNavLink = ({to, children}: { to: string, children: ReactNode }) => {
    return (
        <NavLink
            to={to}
            className={({isActive, isPending}) =>
                isPending ? "text-secondary" : isActive ? "text-primary" : ""
            }
        >
            {children}
        </NavLink>
    )
}

const NavigationBar = () => {
    return (
        <NavigationMenu>
            <NavigationMenuList className={"gap-3"}>
                <NavigationMenuItem>
                    <Button variant={"ghost"} className={"text-xl"}>
                        <CustomNavLink to={"/"}> Home </CustomNavLink>
                    </Button>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <Button variant={"ghost"} className={"text-xl"}>
                        <CustomNavLink to={"/contact-us/"}> Contact Us </CustomNavLink>
                    </Button>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default NavigationBar