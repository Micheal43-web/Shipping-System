"use client"


import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../UserContext'
import { useRouter } from 'next/navigation'
import { Boxes, Eye, EyeClosed, LogIn } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '../lib/supabase'

function page() {

  const { user } = useContext(UserContext)

  const navigate = useRouter();

  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [error, setError] = useState("")

  const [isLocked, setIsLocked] = useState(false)



  useEffect(() => {
    if (user) {
      navigate.push("/")
    }
  }, [user])

  const handleRegister = async (e) => {




    e.preventDefault();

    setError("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password: pass,
    });

    if (error) {
      setError(error.message);
      return;
    }

    navigate.push("/");
  };




  return (
    <>

      <div className='h-screen w-full lg:hidden flex items-center justify-center'>
        <div className="signUp flex flex-col justify-between h-screen py-7 w-full mx-7 md:mx-30">
          <div className='flex flex-col gap-1'>
            <span className='rounded-2xl mx-auto  bg-zinc-100 p-3.5'>
              <LogIn strokeWidth={1.8} size={30} />
            </span>
            <h1 className="head text-3xl font-extrabold text-center mb-7">انشاء حساب</h1>
            {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
            <div className="inputs flex flex-col gap-5">

              <div className='flex flex-col gap-3'>
                <span className='text-zinc-600'>البريد الالكتروني</span>
                <input
                  placeholder="البريد الالكتروني..."
                  className="border   border-gray-100 py-2 px-5 rounded-2xl outline-0"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='flex flex-col gap-3'>
                <span className='text-zinc-600'>كلمة المرور</span>
                <div className='flex items-center justify-between border border-gray-100 py-2 px-5 rounded-2xl'>
                  <input
                    placeholder="كلمة المرور..."
                    className="outline-0"
                    onChange={(e) => setPass(e.target.value)}
                    type={isLocked ? "text" : "password"}
                  />
                  <button onClick={() => setIsLocked(!isLocked)}>
                    {
                      isLocked ? <EyeClosed /> : <Eye />
                    }
                  </button>
                </div>
              </div>
              <div className="flex gap-2 justify-center">
                <span>
                  لديك حساب ؟
                </span>
                <Link href={"/login"} className="text-blue-500 underline">
                  سجل الدخول
                </Link>

              </div>
            </div>
          </div>
          <button onClick={handleRegister} className="bg-black py-3  my-10 text-white shadow-lg rounded-2xl cursor-pointer hover:-translate-y-1 transition-all duration-300">انشاء الحساب</button>
        </div>
      </div>




      <div className='h-screen w-full hidden lg:flex items-center justify-between'>

        <div className="grow max-w-1/2 pb-30 h-full flex items-center justify-center bg-black">
          <div className='flex flex-col gap-5 px-5 text-white text-center items-center'>
            <span className='rounded-2xl bg-zinc-900 p-3.5'>
              <Boxes strokeWidth={1.3} size={30} />
            </span>
            <h1 className='text-3xl font-bold'>اهلا بك في سيستم شركة شحن !</h1>
            <h1 className='text-zinc-600 '>سرعة كبيرة و ادارة منظمة</h1>
          </div>
        </div>



        <div className='grow h-full flex items-center justify-center'>
          <div className="signUp flex flex-col justify-between border border-zinc-100 bg-white min-w-120 min-h-140 px-12 pt-15  shadow-lg rounded-3xl">
            <div className='flex flex-col gap-1'>
              <span className='rounded-2xl mx-auto  bg-zinc-100 p-3.5'>
                <LogIn strokeWidth={1.8} size={30} />
              </span>
              <h1 className="head text-3xl font-extrabold text-center mb-7">انشاء حساب</h1>
              {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
              <div className="inputs flex flex-col gap-5">

                <div className='flex flex-col gap-3'>
                  <span className='text-zinc-600'>البريد الالكتروني</span>
                  <input
                    placeholder="البريد الالكتروني..."
                    className="border   border-gray-100 py-2 px-5 rounded-2xl outline-0"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='flex flex-col gap-3'>
                  <span className='text-zinc-600'>كلمة المرور</span>
                  <div className='flex items-center justify-between border border-gray-100 py-2 px-5 rounded-2xl'>
                    <input
                      placeholder="كلمة المرور..."
                      className="outline-0"
                      onChange={(e) => setPass(e.target.value)}
                      type={isLocked ? "text" : "password"}
                    />
                    <button onClick={() => setIsLocked(!isLocked)}>
                      {
                        isLocked ? <EyeClosed /> : <Eye />
                      }
                    </button>
                  </div>
                </div>
                <div className="flex gap-2 justify-center">
                  <span>
                    لديك حساب ؟
                  </span>
                  <Link href={"/login"} className="text-blue-500 underline">
                    سجل الدخول
                  </Link>

                </div>
              </div>
            </div>
            <button onClick={handleRegister} className="bg-black py-3 mx-8 my-10 text-white shadow-lg rounded-2xl cursor-pointer hover:-translate-y-1 transition-all duration-300">انشاء الحساب</button>
          </div>
        </div>


      </div>
    </>
  )
}

export default page