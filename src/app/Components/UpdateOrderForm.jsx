"use client"

import React, { useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { PenLine, Plus, X } from 'lucide-react'
import { useState } from 'react'

function UpdateOrderForm({ func, item }) {

 

  const [customer, setCustomer] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [driver, setDriver] = useState([])
  const [selectedDriver, setSelectedDriver] = useState("")
  const [status, setStatus] = useState('')
  const [price, setPrice] = useState(0)



  useEffect(() => {
    const fetchDrivers = async () => {
      const { data } = await supabase.from("drivers").select("").eq("status", "نشط")

      setDriver(data)
    }
    fetchDrivers()
  }, [])

  useEffect(() => {
    if (item) {
      setCustomer(item.customer)
      setAddress(item.address)
      setPhoneNum(item.phoneNum)
      setSelectedDriver(item.driver)
      setStatus(item.status)
      setPrice(item.price)
    }
  }, [item])


  if(!item) return null;


  const updateOrder = async (e) => {
    e.preventDefault()
    try {
      if (customer && address && phoneNum && driver && status && price) {
        const { data } = await supabase.from("orders").update({
          customer: customer,
          address: address,
          driver: selectedDriver,
          status: status,
          phoneNum: phoneNum,
          price: price
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

  console.log("item =" + item)



  return (
    <>
      <div className='flex  items-center justify-center h-screen fixed top-0 w-full bg-bgForm backdrop-blur-md z-50'>
        <div className="bg-white rounded-2xl shadow-md flex flex-col justify-between p-4 pb-8 min-w-75 sm:min-w-85 md:min-w-150 lg:min-w-200">
          <div>
            <div>
              <button className='inline' onClick={() => func(false)}>
                <X />
              </button>


              <h1 className='text-center text-4xl font-bold mb-10'>تعديل الشحنة رقم #{item.id}</h1>
            </div>

            <div className='flex flex-col gap-4 m-5'>
              <input type="text" value={customer} placeholder='اسم العميل' className='border border-zinc-300 grow py-3 px-3 rounded-2xl shadow-xs outline-0' onChange={(e) => setCustomer(e.target.value)} />
              <input type="text" value={address} placeholder='العنوان' className='border border-zinc-300 grow py-3 px-3 rounded-2xl shadow-xs outline-0' onChange={(e) => setAddress(e.target.value)} />
              <input type="text" value={phoneNum} placeholder='رقم التليفون' className='border border-zinc-300 grow py-3 px-3 rounded-2xl shadow-xs outline-0' onChange={(e) => setPhoneNum(e.target.value)} />
              <select name="" id="" className='border border-zinc-300 grow py-3 px-3 rounded-2xl shadow-xs outline-0' value={selectedDriver} onChange={(e) => setSelectedDriver(e.target.value)}>
                <option value={""} >اختر مندوب</option>
                {
                  driver.map((item, index) => {
                    return (
                      <option value={item.name} key={index}>{item.name}</option>
                    );
                  })
                }
              </select>
              <select name="" value={status} id="" className='border border-zinc-300 grow py-3 px-3 rounded-2xl shadow-xs outline-0' onChange={(e) => setStatus(e.target.value)}>
                <option value="">اختر الحالة</option>
                <option value="قيد الانتظار">قيد الانتظار</option>
                <option value="تم التوصيل">تم التوصيل</option>
                <option value="مسترجع">مسترجع</option>
              </select>
              <input type="number" value={price} className='border border-zinc-300 grow py-3 px-3 rounded-2xl shadow-xs outline-0' placeholder='سعر الشحنة' onChange={(e) => setPrice(e.target.value)} />
            </div>
          </div>

          <button onClick={updateOrder} className='flex items-center justify-center text-lg font-bold gap-4 bg-black text-white rounded-2xl py-4 mx-10 mt-10 cursor-pointer hover:-translate-y-0.5 transition-all'>
            تعديل الشحنة
            <PenLine size={25} />
          </button>

        </div>
      </div>

    </>
  )
}

export default UpdateOrderForm