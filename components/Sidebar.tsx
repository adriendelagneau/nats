'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

import { TCategory } from '@/types';

interface SidebarProps {
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    cat: TCategory[];
}

const Sidebar: React.FC<SidebarProps> = ({ isMenuOpen, setIsMenuOpen, cat }) => {


    const [currentCategory, setCurrentCategory] = useState<string | null>(null);

    const handleMouseEnter = (categoryName: string) => {
        setCurrentCategory(categoryName);
    };
    const handleMouseLeave = () => {
        setCurrentCategory(null);
    };

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    return (
        <div className={`w-full h-[calc(100vh-70px)] overflow-y-hidden fixed ${isMenuOpen ? 'z-50' : '-z-50'}`}>

            <div className={`w-[280px] h-full  no-scrollbar fixed top-[70px] bg-white z-20 transition duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-[300px]'}`}>

                <div className='relative '>
                    <div className='p-3'>
                        <Link href="/subscribe" >
                            <button className="block w-full p-2 my-6 text-center text-white bg-blue-600 border border-blue-600 rounded-full hover:bg-opacity-90">Subscribe</button>
                        </Link>

                        <div className='w-full p-3 mt-10 mb-3 border'>
                            <label htmlFor="search" className="sr-only">Search</label>
                            <input type='text' id='search' placeholder='Search' className='w-full p-1 rounded' />
                        </div>

                    </div>

                    <ul className='w-full h-full py-3'>
                        {cat?.map((link, i) => (
                            <li key={i} className="relative">

                                <Link
                                    href={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/articles?category=${link.name}`}
                                    className="relative flex items-center justify-between hover:bg-blue-100 hover:cursor-pointer"
                                    onMouseEnter={() => handleMouseEnter(link._id)}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => {
                                        setCurrentCategory(null)
                                        setIsMenuOpen(!isMenuOpen)
                                    }}
                                >

                                    <div className='p-3 capitalize'>{link.name}</div>
                                    {link.sub.length > 0 && <ChevronRight />}

                                </Link>

                                {currentCategory === link._id && link.sub.length > 0 && (
                                    <div className='absolute right-0 top-[50%] transform translate-x-[100%] translate-y-[-50%] flex flex-col capitalize'
                                        onMouseEnter={() => handleMouseEnter(link._id)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <ul className='pl-4 bg-white custom-clip-path min-w-[130px] border'>
                                            {link.sub
                                                .map((subcategory, subIndex) => (
                                                    <li key={subIndex} className="flex bg-white">
                                                        <Link
                                                            href={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/articles?category=${link.name}&subcategory=${subcategory.name}`}
                                                            onClick={() => {
                                                                setCurrentCategory(null)
                                                                setIsMenuOpen(!isMenuOpen)
                                                            }}
                                                            className="w-full px-4 py-2 hover:bg-blue-100 hover:cursor-pointer"
                                                        >
                                                            {subcategory.name}
                                                        </Link>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div onClick={() => setIsMenuOpen(false)} className={`w-full h-full fixed top-[70px] z-10 transition-colors duration-300 ${isMenuOpen ? 'bg-black bg-opacity-70' : 'bg-white bg-opacity-0'}`}></div>
        </div>
    );
};

export default Sidebar;

