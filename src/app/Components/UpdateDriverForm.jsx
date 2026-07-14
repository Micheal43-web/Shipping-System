"use client"

import React, { useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { PenLine, Plus, X } from 'lucide-react'
import { useState } from 'react'

function UpdateDriverForm({ func, item }) {


  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (item) {
      setName(item.name)
      setCity(item.city)
      setPhoneNum(item.phoneNum)
      setStatus(item.status)
    }
  }, [item])

  if (!item) return null;

  const updateDriver = async (e) => {
    e.preventDefault()
    try {
      if (name && city && phoneNum &&  status ) {
        const { data } = await supabase.from("drivers").update({
          name: name,
          city: city,
          phoneNum: phoneNum,
          status: status,
        }).eq("id", item?.id)
        func(false)
        window.location.reload()
      }
      else {
        alert("املأ الحقول الفارغة رجاءا !")
      }
    }
    catch (err) {
      console.log(err)
    }
  }




  return (
    <>
      <div className='flex  items-center justify-center h-screen sticky top-0 w-full bg-bgForm backdrop-blur-md z-50 '>
        <div className="bg-white rounded-2xl shadow-md flex flex-col justify-between p-4 pb-8 min-w-75  md:min-w-150 lg:min-w-200">
          <div>
            <div>
              <button className='inline' onClick={() => func(false)}>
                <X />
              </button>


              <h1 className='text-center text-4xl font-bold mb-10'>تعديل المندوب رقم #{item.id}</h1>
            </div>

            <div className='flex flex-col gap-4 m-5'>
              <input type="text" value={name} placeholder='اسم المندوب' className='border border-zinc-300 grow py-3 px-3 rounded-2xl shadow-xs outline-0' onChange={(e) => setName(e.target.value)} />
              <input type="text" value={city} placeholder='المدينة' className='border border-zinc-300 grow py-3 px-3 rounded-2xl shadow-xs outline-0' onChange={(e) => setCity(e.target.value)} />
              <input type="text" value={phoneNum} placeholder='رقم التليفون' className='border border-zinc-300 grow py-3 px-3 rounded-2xl shadow-xs outline-0' onChange={(e) => setPhoneNum(e.target.value)} />
              <select name="" value={status} id="" className='border border-zinc-300 grow py-3 px-3 rounded-2xl shadow-xs outline-0' onChange={(e) => setStatus(e.target.value)}>
                <option value="">اختر الحالة</option>
                <option value="نشط">نشط</option>
                <option value="مشغول">مشغول</option>
                <option value="غير نشط">غير نشط</option>
              </select>

            </div>
          </div>

          <button onClick={updateDriver} className='flex items-center justify-center text-lg font-bold gap-4 bg-black text-white rounded-2xl py-4 mx-10 mt-10 cursor-pointer hover:-translate-y-0.5 transition-all'>
            تعديل المندوب
            <PenLine size={25} />
          </button>

        </div>
      </div>

    </>
  )
}

export default UpdateDriverForm