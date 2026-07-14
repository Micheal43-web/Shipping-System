"use client"

import { Plus, X } from 'lucide-react'
import React, { useState } from 'react'
import { supabase } from '../lib/supabase'

function AddDriverForm({ func }) {

  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [status, setStatus] = useState('')
  


  const addDriver = async (e) => {
    e.preventDefault()
    try {
      if (name && city && phoneNum && status) {
        const { data } = await supabase.from("drivers").insert({
          name: name,
          city: city,
          phoneNum: phoneNum,
          status: status,
        })
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
      <div className='flex  items-center justify-center h-screen w-full bg-bgForm backdrop-blur-md z-50 absolute'>
        <div className="bg-white rounded-2xl shadow-md flex flex-col justify-between p-4 pb-8 min-w-75 md:min-w-150 lg:min-w-200">
          <div>
            <div>
              <button className='inline' onClick={() => func(false)}>
                <X />
              </button>


              <h1 className='text-center text-4xl font-bold mb-10'>اضافة مندوب</h1>
            </div>

            <div className='flex flex-col gap-4 m-5'>
              <input type="text" placeholder='اسم المندوب' className='border border-zinc-300 grow py-3 px-3 rounded-2xl shadow-xs outline-0' onChange={(e) => setName(e.target.value)} />
              <input type="text" placeholder='المدينة' className='border border-zinc-300 grow py-3 px-3 rounded-2xl shadow-xs outline-0' onChange={(e) => setCity(e.target.value)} />
              <input type="text" placeholder='رقم التليفون' className='border border-zinc-300 grow py-3 px-3 rounded-2xl shadow-xs outline-0' onChange={(e) => setPhoneNum(e.target.value)} />
              <select name="" id="" className='border border-zinc-300 grow py-3 px-3 rounded-2xl shadow-xs outline-0' onChange={(e) => setStatus(e.target.value)}>
                <option value="">اختر الحالة</option>
                <option value="نشط">نشط</option>
                <option value="مشغول">مشغول</option>
                <option value="غير نشط">غير نشط</option>
              </select>
              
            </div>
          </div>

          <button onClick={addDriver} className='flex items-center justify-center text-lg font-bold gap-4 bg-black text-white rounded-2xl py-4 mx-10 mt-10 cursor-pointer hover:-translate-y-0.5 transition-all'>
            اضافة المندوب
            <Plus size={25} />
          </button>

        </div>
      </div>
    </>
  )
}

export default AddDriverForm