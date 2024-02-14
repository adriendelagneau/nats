'use client'


import { useSession } from "next-auth/react";
import Link from "next/link";

import React, { useEffect, useState } from 'react'
import NavbarTitle from "./NavbarTitle";
import NavbarCategory from "./NavbarCategory";
import { AlignLeft } from "lucide-react";

const Header = () => {

  const [showTitle, setShowTitle] = useState(false);
  const { data: session } = useSession()


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
    <header className="fixed top-0 left-0 z-50 w-full h-16">
      <nav className="flex items-center w-full h-full gap-3 p-3 bg-red-300">
        <div className="">
          <AlignLeft size={24} strokeWidth={1} className='' />
        </div>
        <div className="flex flex-grow">la voie de l'info</div>
        <div className="flex gap-3">
          <button>subscribe</button>
          <button>login</button>
        </div>
        
      </nav>
    </header>
  )
}

export default Header