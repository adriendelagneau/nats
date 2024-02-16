'use client'

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

// Import statements...
// Import statements...

const Sidebar = ({ isMenuOpen, setIsMenuOpen, cat }) => {
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    return (
        <div className={`w-full h-[calc(100vh-70px)] overflow-y-hidden fixed ${isMenuOpen ? 'z-50' : '-z-50'}`}>
            <div className={`w-[280px] h-full overflow-y-scroll no-scrollbar fixed top-[70px] bg-white z-20 transition duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-[300px]'}`}>
                <div className='p-3 relative'>
                    <Link href="/subscribe">
                        <button className="p-1 rounded-full border border-blue-600 my-6 w-full block text-center bg-blue-600 text-white hover:bg-opacity-90">Subscribe</button>
                    </Link>

                    <div className='w-full my-12 border'>
                        <label htmlFor="search" className="sr-only">Search</label>
                        <input type='text' id='search' placeholder='Search' className='w-full p-1 rounded' />
                    </div>

                    <ul className='text-lg flex flex-col w-full capitalize'>
                        {cat?.map((c, i) => (
                            <li key={i}>
                                <Link href={"/"} className='flex justify-between items-center relative py-3'>
                                    <div>{c.name}</div>
                                    {c.sub.length > 0 && (<ChevronRight />)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div onClick={() => setIsMenuOpen(false)} className={`w-full h-full fixed top-[70px] transition-colors duration-300 ${isMenuOpen ? 'bg-black bg-opacity-70' : 'bg-white bg-opacity-0'}`}></div>
        </div>
    );
};

export default Sidebar;

