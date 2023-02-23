'use client';

import React from 'react';

export default function SearchBarComponent() {

    return(
        <div className="search-bar my-6 w-full">
            <div className="search-bar__container form-control">
                <div className="search-bar__bar input-group input-group-lg">
                    <input type="text" placeholder="What are you searching?" className="search-bar__input w-full input input-lg input-bordered focus:outline-none" />
                    <button className="search-bar__button btn btn-square btn-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                </div>
            </div>
        </div>
    )
}