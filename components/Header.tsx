'use client'


import { useSession } from "next-auth/react";
import Link from "next/link";

import React, { useEffect, useState } from 'react'
import { AlignLeft } from "lucide-react";

const Header = () => {

  const [showTitle, setShowTitle] = useState(false);
  const { data: session } = useSession()

console.log(showTitle)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 100) {
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
    <header className="fixed top-0 left-0 z-50 w-full h-18">
    <nav className="relative flex items-center justify-between w-full h-full gap-3 p-3 bg-white">
      
      {/* Left side */}
      <div className={`${showTitle ? '' : 'flex flex-grow gap-6 items-center'}`}>
        <AlignLeft size={24} strokeWidth={1}  />
          <div className={`${showTitle ? 'hidden' : 'flex flex-grow '}`}>
            <ul className="flex gap-4 text-lg">
              <li>Politique</li>
              <li>Economie</li>
              <li>Culture</li>
              <li>Sport</li>
              <li>Ecologie</li>
            </ul>
        </div>
      </div>
  
  
        <div className={`${showTitle ? 'absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-3xl hidden sm:inline-block font-limeLight' : 'hidden'}`}>la voie de l'info</div>
    
      
      {/* Right side */}
        <div className="flex gap-3">
          <Link href="/subscribe" >
        <button className="p-2 rounded-lg  w-[90px] block text-center bg-blue-600 text-white hover:bg-opacity-90">Subscribe</button>
            
          </Link>
        <Link href="/login" passHref>
            <button className="p-2 rounded-lg  w-[90px] block text-center bg-blue-600 text-white hover:bg-opacity-90">Login</button>
        </Link>
      </div>
      
    </nav>
  </header>
  )
}

export default Header