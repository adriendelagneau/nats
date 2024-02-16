'use client'

import { TCategory } from '@/types';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'


interface SidebarProps {
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    cat: TCategory[]; // Replace YourCatType with the actual type of your 'cat' prop
  }

const Sidebar: React.FC<SidebarProps> = ({ isMenuOpen, setIsMenuOpen, cat }) => {

    // State to keep track of the currently hovered category
    const [currentCategory, setCurrentCategory] = useState<string | null>(null);
    // Function to handle mouse enter event for a category
    const handleMouseEnter = (categoryName: string) => {
        setCurrentCategory(categoryName);
    };
    // Function to handle mouse leave event for a category
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
                <div className=' relative'>
                    <Link href="/subscribe" >
                        <button className="p-1 rounded-full border border-blue-600 my-6 w-full block text-center bg-blue-600 text-white hover:bg-opacity-90">Subscribe</button>
                    </Link>

                    <div className='w-full my-12 border'>
                        <label htmlFor="search" className="sr-only">Search</label>
                        <input type='text' id='search' placeholder='Search' className='w-full p-1 rounded' />
                    </div>



                    {/* Navigation list */}
                    <ul className='w-full h-full py-3'>
                        {cat?.map((link, i) => (
                            <li key={i} className="relative">
                                {/* Main category link */}
                                <Link
                                    href={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/articles?category=${link.name}`}
                                    className="relative flex items-center justify-between hover:bg-blue-100 hover:cursor-pointer"
                                    onMouseEnter={() => handleMouseEnter(link._id)}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => {

                                        setCurrentCategory(null)
                                    }}
                                >
                                    {/* Main category name */}
                                    <div className='p-3 capitalize'>{link.name}</div>
                                    {link.sub.length > 0 && <ChevronRight/>}
                                    {/* Show the '>' svg, if the category has subcategories */}

                                </Link>

                                {/* Show subcategory list if the category is currently hovered */}
                                {currentCategory === link._id &&  link.sub.length > 0 &&(
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

