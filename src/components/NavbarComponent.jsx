import React, { useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';

const NavbarComponent = () => {
    const router = useRouter();
    const [isMenuActive, setIsMenuActive] = useState(false);
    const toggleMenu = () => {
        setIsMenuActive(!isMenuActive);
    }

    return(
        <nav className="navbar">
            <div className="navbar__logo">
                <span>AZ PokeDex</span>
            </div>
            <div className="navbar__expand">
                <button onClick={() => toggleMenu()}>
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
            <div className={`navbar__menu ${isMenuActive ? 'active' : ''}`}>
                <div className="navbar__menu-wrapper">
                    <Link href="/" className={router.pathname == "/" ? "active" : ""}>
                        Home
                    </Link>
                    <Link href="/login" className={router.pathname == "/login" ? "active" : ""}>
                        Login
                    </Link>
                    {/* <a href="/" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                        Home
                    </a>
                    <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                        Examples
                    </a>
                    <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                        Blog
                    </a> */}
                </div>
                <div className="navbar__right">
                    <a href="https://www.buymeacoffee.com/marknguyen">Buy me a Coffee</a>
                </div>
            </div>
        </nav>
    )
}
export default NavbarComponent;