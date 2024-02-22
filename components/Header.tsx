'use client'


import { useSession } from "next-auth/react";
import Link from "next/link";

import React, { useEffect, useState } from 'react'
import { AlignLeft, TextSearch } from "lucide-react";
import Sidebar from "./Sidebar";
import { TCategory } from "@/types";



const Header: React.FC<{ cat: TCategory[] }> = ({ cat }) => {

  const [showTitle, setShowTitle] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false)

 

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 120) {
        setShowTitle(true);
      } else {
        setShowTitle(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  return (
    <div className="relative top-20">
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} cat={cat} />
      

    <header className="fixed top-0 left-0 z-50 w-full h-[70px]">
    <nav className="relative flex items-center justify-between w-full h-full gap-3 p-3 bg-white">
      
      {/* Left side */}
          <div className={`${showTitle ? '' : 'flex flex-grow gap-6 items-center'}`}>
        <TextSearch size={28} strokeWidth={1} onClick={() => setIsMenuOpen(!isMenuOpen)} className="cursor-pointer"/>
          <div className={`${showTitle ? 'hidden' : 'flex flex-grow '}`}>
              <ul className="hidden gap-4 text-lm sm:flex capitalize text-lg">
                {cat?.map((c,i) => (
                  <li key={i}>{c.name}</li>
                ))}
          
            </ul>
        </div>
      </div>
  
  
        <div className={`${showTitle ? 'absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-3xl hidden sm:inline-block font-limeLight' : 'hidden'}`}>la voie de l'info</div>
    
      
      {/* Right side */}
        <div className="flex gap-3">
          <Link href="/subscribe" >
        <button className="p-1 rounded-full border border-blue-600  w-[90px] block text-center bg-blue-600 text-white hover:bg-opacity-90">Subscribe</button>
            
          </Link>
        <Link href="/login" passHref>
            <button className="p-1 rounded-full  w-[90px] block text-center text-blue-600 border border-blue-600 hover:text-blue-800 hover:border-blue-800">Login</button>
        </Link>
      </div>
      
    </nav>
  </header>
  </div>
  )
}

export default Header