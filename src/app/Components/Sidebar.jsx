"use client"


import { Boxes, LayoutDashboard, LogOut, Package, UsersRound } from 'lucide-react'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import { supabase } from '../lib/supabase';

function Sidebar({status , seter}) {

  const navigate = useRouter()

  const pages = [
    {
      icon: <LayoutDashboard />,
      title: "لوحة التحكم",
      link: "/"
    },
    {
      icon: <Package />,
      title: "الشحنات",
      link: "/orders"
    },
    {
      icon: <UsersRound />,
      title: "المناديب",
      link: "/drivers"
    },
  ]

  const pathname = usePathname();


  const logOut = async (e) => {
    e.preventDefault()


    const { data } = await supabase.auth.signOut();
    window.location.reload()
    navigate.push("/sign-up")
  }



  return (
    <>
      <div className={`${status ? "flex absolute" : "hidden lg:flex sticky"} flex-col items-start h-screen z-50  top-0 min-w-65  bg-black text-white p-4 justify-between`}>
        <div>
          <button onClick={() => seter(!status)} className="lg:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-0 p-1 mb-4">
            <span className={`block w-6 h-0.5 bg-white transition-transform rotate-45 translate-y-2`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-opacity  opacity-0`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-transform -rotate-45 -translate-y-2`}></span>
          </button>
          <div className='flex items-center gap-3 border-b pb-4 border-b-zinc-800'>
            <span className='rounded-2xl bg-zinc-900 p-3.5 scale-90'>
              <Boxes strokeWidth={1.3} size={30} />
            </span>
            <span className='font-bold'>سيستم شحن وتوصيل</span>
          </div>


          <div className="flex flex-col gap-1  mt-10">
            {
              pages.map((item, index) => {
                return (
                  <Link key={index} href={item.link} className={`flex items-center gap-5 p-2.5  ${pathname == item.link ? "bg-zinc-900" : "hover:bg-zinc-900"
                    } rounded-2xl transition-all`}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                );
              })
            }
          </div>
        </div>


        <button onClick={logOut} className='flex items-center gap-3 bg-[#38101046] border rounded-2xl py-2 px-5 border-[#44000077] text-red-400 hover:border-red-500 hover:bg-red-500 hover:text-white transition-all duration-400 cursor-pointer hover:-translate-y-1'>
          <LogOut size={18} />
          <span>تسجيل خروج</span>
        </button>
      </div>
    </>
  )
}

export default Sidebar