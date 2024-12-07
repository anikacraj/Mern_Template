import React, { useState } from 'react'
import { Outlet,Link } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { MdOutlineScreenSearchDesktop } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { FaTimes } from "react-icons/fa";

function UserHeader() {

  const [user, setUser] = useState(
    [
      localStorage.getItem("role" =="user")
    ]
  );


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

<div className='sm:hidden md:hidden xl:hidden mt-5 ml-6'>
  <button onClick={handleMenu} >
   {
    menuOpen ?  <FaTimes />:  <CiMenuFries className='w-5 h-5 text-black ' />
   }
  </button>
</div>

   <header className=' w-3.01/4 xl:px-28 xl:ml-20 px-4 sm:ml-8 mx-auto '>
    <nav className='flex justify-between items-center mx-auto md:py-4 pt-6 pb-3 '>

    <IoSearch className='text-black sm:w-9 sm:h-9 w-6 h-6 cursor-pointer '/>

    <Link to="/"
    > <MdOutlineScreenSearchDesktop 
   />
    Logo</Link>
  

<div className='text-lg text-black flex items-center sm:gap-4 gap-0  '>
<Link className='sm:flex items-center  mr-2 sm:mr-0' to='/cart' ><FaCartPlus className='ml-2 ' /> Cart</Link>
{
  user ? 
  <Link className='sm:flex items-center gap-2 ml-3 sm:ml-0'  to='/register'><MdAccountCircle className='ml-4'/> Log out </Link>
:
<Link className='sm:flex items-center gap-2 '  to='/register'><MdAccountCircle className='ml-4'/> Sign In </Link>
}

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
  <ul
    className={`bg-black text-white fixed top-10 left-0 h-2/4 w-64 px-4 py-2 rounded-lg  transition-transform ease-in-out duration-500 transform ${
      menuOpen ? 'translate-x-0' : '-translate-x-full'
    }`}
  >
    {navItems.map(({ title, path }) => (
      <li
        key={title}
        className="hover:text-orange-500 font-semibold my-3 cursor-pointer"
      >
        <Link className="text-right" to={path}>
          {title}
        </Link>
      </li>
    ))}
  </ul>
</div>



 
   </header>
        <Outlet />
    </div>
  )
}

export default UserHeader