import React, { useState } from 'react'
import { Outlet,Link } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { MdOutlineScreenSearchDesktop } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { FaTimes } from "react-icons/fa";

function UserHeader() {
  const [menuOpen,setMenuOpen] =useState(false);

  const handleMenu =()=>{
    setMenuOpen((prevState)=>!prevState);
  }

  const navItems =[
   {title:'Jewelry', path:'/jewelery'},
   {title:'Jewelry', path:'/ed'},
   {title:'Jewelry', path:'/d'},
   {title:'Jewelry', path:'/s'},
   {title:'Jewelry', path:'/r'},
  ]


  return (
    <div>
   <header className=' w-3.01/4 xl:px-28 xl:ml-20 px-4 sm:ml-8 mx-auto '>
    <nav className='flex justify-between items-center mx-auto md:py-4 pt-6 pb-3 '>

    <IoSearch className='text-black w-5 h-5 cursor-pointer '/>

    <Link to="/"
    > <MdOutlineScreenSearchDesktop 
   />
    Logo</Link>
  

<div className='text-lg text-black sm:flex items-center gap-4 hidden'>
<Link className='flex items-center gap-2 ' to='/cart' ><FaCartPlus /> Cart</Link>
<Link className='flex items-center gap-2 '  to='/register'><MdAccountCircle /> Sign In </Link>
</div>

<div className='sm:hidden md:hidden xl:hidden'>
  <button onClick={handleMenu} >
   {
    menuOpen ?  <FaTimes />:  <CiMenuFries className='w-5 h-5 text-black ' />
   }
  </button>
</div>

</nav>
<hr />

<div className='pt-4'>
  <ul className='lg:flex items-center justify-between text-black hidden'>
    {
      navItems.map(({title,path})=>(
        <li key={title} className='hover:text-orange-500 font-semibold '>
          <Link to={path}>{title}</Link>
        </li>
      ))
    }
  </ul>
</div>

<div>
<ul className={`bg-black text-white px-4 py-2 rounded-sm ${menuOpen ? '' :'hidden'}`}>
    {
      navItems.map(({title,path})=>(
        <li key={title} className='hover:text-orange-500 font-semibold my-3  cursor-pointer '>
          <Link className=' text-align: right' to={path}>{title}</Link>
        </li>
      ))
    }
  </ul>
</div>
 
   </header>
        <Outlet />
    </div>
  )
}

export default UserHeader