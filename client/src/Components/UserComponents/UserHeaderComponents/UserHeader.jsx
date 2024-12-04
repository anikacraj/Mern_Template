import React from 'react'
import { Outlet,Link } from 'react-router-dom'

function UserHeader() {
  return (
    <div>
    <header>
     <ul>
        <li>
            <Link to='/'>Home</Link>
            <Link to='/contact'>Contact</Link>
            <Link to='/register'>Sign In </Link>
            <Link to='/product'>Products</Link>
        </li>
     </ul>
</header>
        <Outlet />
    </div>
  )
}

export default UserHeader