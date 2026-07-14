"use client"

import { Pen, Plus, Trash } from "lucide-react";
import Sidebar from "../Components/Sidebar";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import AddDriverForm from "../Components/AddDriverForm";
import UpdateDriverForm from "../Components/UpdateDriverForm";

function page() {


  const [drivers, setDrivers] = useState([]);
  const [addOpen, setAddOpen] = useState(false)
  const [updateOpen, setUpdateOpen] = useState(false)
  const [selectedDriver, setSelectedDriver] = useState(null)
  const [sideOpen, setSideOpen] = useState(false)

  useEffect(() => {
    const fetchDrivers = async () => {
      const { data, error } = await supabase.from("drivers").select()

      if (error) {
        alert("error")
        console.log(error)
      }
      if (data) {
        setDrivers(data)
      }
    }

    fetchDrivers()
  }, [])

  const deleteDriver = async (id) => {
    const { data } = await supabase.from("drivers").delete("").eq("id", id)

    setDrivers(
      drivers.filter((driver) => driver.id !== id)
    )
  }




  return (
    <>

      {
        addOpen && <AddDriverForm func={setAddOpen} />
      }
      {
        updateOpen && selectedDriver && (
          <UpdateDriverForm
            item={selectedDriver}
            func={setUpdateOpen}
          />
        )
      }



      <div className="flex w-full">
        <Sidebar status={sideOpen} seter={setSideOpen} />
        <div className="px-5 lg:px-15 py-10 grow w-full">
          <button onClick={() => setSideOpen(!sideOpen)} className="lg:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-0 p-1 mb-10">
            <span className={`block w-6 h-0.5 bg-black transition-transform `}></span>
            <span className={`block w-6 h-0.5 bg-black transition-opacity `}></span>
            <span className={`block w-6 h-0.5 bg-black transition-transform `}></span>
          </button>
          <div className="flex items-start justify-between mb-15">
            <h1 className="text-3xl font-bold ">المناديب</h1>
            <button onClick={() => setAddOpen(true)} className="hidden lg:flex items-center gap-4 bg-black text-white px-4 py-3 rounded-xl cursor-pointer hover:-translate-y-1 transition-all">
              اضافة مندوب
              <Plus size={20} />
            </button>
            <button onClick={() => setAddOpen(true)} className="flex lg:hidden items-center gap-4 bg-black text-white px-4 py-3 rounded-xl cursor-pointer hover:-translate-y-1 transition-all">
            
              <Plus size={20} />
            </button>

          </div>

          <div className="overflow-x-auto">
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md min-w-[1000px]">
              {/* Header */}
              <div className="grid grid-cols-6 divide-x divide-zinc-500 bg-black font-semibold text-white">
                <div className="p-4">#</div>
                <div className="p-4">الاسم</div>
                <div className="p-4">رقم التليفون</div>
                <div className="p-4">المدينة</div>
                <div className="p-4">الحالة</div>
                <div className="p-4">اجراءات</div>
              </div>

              {/* Body */}
              <div className="divide-y divide-gray-200">
                {drivers.length > 0 ? [...drivers].reverse().map((driver, index) => {

                  return (
                    <div
                      key={index}
                      className="grid grid-cols-6 divide-x divide-zinc-200 hover:bg-gray-50 transition-all"
                    >
                      <div className="p-4">{driver.id}</div>

                      <div className="p-4">{driver.name}</div>

                      <div className="p-4">{driver.phoneNum}</div>

                      <div className="p-4">{driver.city}</div>

                      <div className="p-4">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-medium ${driver.status === "نشط"
                            ? "bg-green-100 text-green-700"
                            : driver.status === "غير نشط"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                            }`}
                        >
                          {driver.status}
                        </span>
                      </div>



                      <div className="p-4 flex gap-2 items-center">
                        <button onClick={() => {
                          setUpdateOpen(true)
                          setSelectedDriver(driver)
                        }} className="text-white p-2 rounded-xl bg-black hover:-translate-y-0.5 transition-all">
                          <Pen size={20} />
                        </button>
                        <button onClick={() => deleteDriver(driver.id)} className="text-white p-2 rounded-xl bg-black hover:-translate-y-0.5 transition-all">
                          <Trash size={20} />
                        </button>
                      </div>
                    </div>
                  )
                }) : <p className="text-center m-10">لا يوجد مندوبين حاليا .</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page