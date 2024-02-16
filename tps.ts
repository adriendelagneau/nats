     {/* Navigation list */}
     <ul className='w-full h-full py-3'>
     {categoryData?.map((link, i) => (
       <li key={i} className="relative">
         {/* Main category link */}
         <Link
           href={link.url}
           className="relative flex items-center justify-between hover:bg-blue-100 hover:cursor-pointer"
           onMouseEnter={() => handleMouseEnter(link.id)}
           onMouseLeave={handleMouseLeave}
           onClick={() => {
             closeMenu()
             setCurrentCategory(null)
           }}
         >
           {/* Main category name */}
           <div className='p-3 capitalize'>{link.name}</div>
           {/* Show the '>' svg, if the category has subcategories */}

         </Link>

         {/* Show subcategory list if the category is currently hovered */}
         {currentCategory === link.id && (
           <div className='absolute right-0 top-[50%] transform translate-x-[100%] translate-y-[-50%] flex flex-col capitalize'
             onMouseEnter={() => handleMouseEnter(link.id)}
             onMouseLeave={handleMouseLeave}
           >
             <ul className='pl-4 bg-white custom-clip-path min-w-[130px] border'>
               {link.subcategory

                 .map((subcategory, subIndex) => (
                   <li key={subIndex} className="flex bg-white">
                     <Link
                       href={subcategory.url}
                       onClick={() => {
                         closeMenu()
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