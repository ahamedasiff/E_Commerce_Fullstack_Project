import { useContext, useState } from 'react'
import React from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContxt } from '../context/ShopContext'

const Navbar = () => {

    const [visibelity, setVisibility] = useState(false);

    const { setShowSearch, getCartCount } = useContext(ShopContxt)

  return (
    <div className='flex justify-between items-center py-5 font-medium'>
      <Link to='/'><img src={assets.logo} className= 'w-36' alt="cant display image" /></Link>
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p>HOME</p>
                <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                <p>COLLECTION</p>
                <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/about' className='flex flex-col items-center gap-1'>
                <p>ABOUT</p>
                <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                <p>CONTACT</p>
                <hr className='w-2/4 border-none h-[2px] bg-gray-700 hidden' />
            </NavLink>
        </ul>
        <div className='flex gap-6 items-center'>
            <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />

            <div className='group relative'>
                <Link to={'/login'}>
                    <img src={assets.profile_icon} alt="" className='w-5 cursor-pointer'/>
                </Link>
                <div className='group-hover:block hidden absolute dropdown-menu right-0 p-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-700 rounded'>
                        <p className='cursor-pointer hover:text-black'>My Profile</p>
                        <p className='cursor-pointer hover:text-black'>Orders</p>
                        <p className='cursor-pointer hover:text-black'>Logout</p>
                    </div>
                </div>
            </div>
            <Link to='/cart' className='relative'>
                <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
                <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]' >{getCartCount()}</p>
            </Link>
            <img onClick={() => setVisibility(true)} src={assets.menu_icon} alt="" className='w-5 cursor-pointer sm:hidden'/>
        </div>

        {/* Sidebar menu for small screen*/}
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white  transition-all ${visibelity ? 'w-full' : 'w-0'}`}>
            <div className='flex flex-col text-gray-600'>
                <div onClick={() => setVisibility(false)} className='flex item-center gap-4 p-3 cursor-pointer'>
                    <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
                    <p>Back</p>
                </div>
                <NavLink onClick={() => setVisibility(false)} to='/' className='py-2 pl-6 border'>
                    HOME
                </NavLink>
                <NavLink onClick={() => setVisibility(false)} to='/collection' className='py-2 pl-6 border'>
                    COLLECTION
                </NavLink>
                <NavLink onClick={() => setVisibility(false)} to='/about' className='py-2 pl-6 border'>
                    ABOUT
                </NavLink>
                <NavLink onClick={() => setVisibility(false)} to='/contact' className='py-2 pl-6 border'>
                    CONTACT
                </NavLink>
            </div>
        </div>
    </div>
  )
}

export default Navbar
