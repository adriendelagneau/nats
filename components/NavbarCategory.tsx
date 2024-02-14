import Link from 'next/link'
import React from 'react'
import NavbarTitle from './NavbarTitle'

const categoryData = [
  {
    id: 1,
    name: "politic",
    url: "/politic",
    subcategory: [
      { name: "national", url: "/politic/national" },
      { name: "international", url: "/politic/international" },
    ],
  },
  {
    id: 2,
    name: "economic",
    url: "/economic",
    subcategory: [
      { name: "national", url: "/economic/national" },
      { name: "international", url: "/economic/international" },
    ],
  },
  {
    id: 3,
    name: "culture",
    url: "/culture",
    subcategory: [
      { name: "videogame", url: "/culture/videogame" },
      { name: "music", url: "/culture/music" },
      { name: "series", url: "/culture/series" },
    ],
  },
  {
    id: 4,
    name: "sport",
    url: "/sport",
    subcategory: [
      { name: "football", url: "/sport/football" },
      { name: "basketball", url: "/sport/basketball" },
      { name: "tennis", url: "/sport/tennis" },
      { name: "combat", url: "/sport/combat" },
      { name: "rugby", url: "/sport/rugby" },
    ],
  },
  {
    id: 5,
    name: "ecologie",
    url: "/ecologie",
    subcategory: [
      { name: "national", url: "/ecologie/national" },
      { name: "international", url: "/ecologie/international" },
    ],
  },
];


const NavbarCategory = () => {
  return (
    <>
      
    <ul className="hidden gap-1 pl-5 text-lg capitalize md:pl-12 sm:flex">
      {categoryData.map((link, i) => (
        <li className="p-2 rounded-full hover:bg-gray-100 " key={i}>
          <Link href={link.url}>{link.name}</Link>
        </li>
      ))}
      </ul>
      <div className='text-center sm:hidden'>
          <h2 className='text-2xl font-semibold font-title'>La Voie De L&rsquo;Info</h2>
          <p className="font-normal">Votre fenêtre sur l&rsquo;actualité</p>

    </div>
      </>
  )
}

export default NavbarCategory