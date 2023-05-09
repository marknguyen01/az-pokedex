'use client';

import React, { useState } from 'react';
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation';

type Item = {
    name: string;
    slug: string;
}

const items:Item[] = [{
    name: "Home",
    slug: "",
}]

export function GlobalNavbar() {
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
                    { items.map(item => (
                        <GlobalNavbarItem key={item.slug} item={item} />
                    ))}
                </div>
                <div className="navbar__right">
                    <a href="https://www.buymeacoffee.com/marknguyen">Buy me a Coffee</a>
                </div>
            </div>
        </nav>
    )
}

function GlobalNavbarItem({
    item
}: {
    item: Item
}) {
    const segment = useSelectedLayoutSegment();
    const isActive = item.slug === segment;

    return(
        <Link href={`/${item.slug}`} className={isActive ? "active" : ""}>
            { item.name }
        </Link>
    )
}