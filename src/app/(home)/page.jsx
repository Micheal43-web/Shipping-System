"use client"

import { ArrowLeft, Ban, Box, PackageCheck, TimerReset, UsersRound, Van } from "lucide-react";
import Sidebar from "../Components/Sidebar";
import { supabase } from "../lib/supabase";
import { Pen, Trash } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import UpdateOrderForm from "../Components/UpdateOrderForm";
import UpdateDriverForm from "../Components/UpdateDriverForm";


export default function Home() {

  const [totalOrders, setTotalOrders] = useState([])
  const [pendingOrders, setPendingOrders] = useState([])
  const [successOrders, setSuccessOrders] = useState([])
  const [canceledOrders, setCanceledOrders] = useState([])
  const [totalDrivers, setTotalDrivers] = useState([])
  const [onlineDrivers, setOnlineDrivers] = useState([])
  const [totalPrices, setTotalPrices] = useState(0)


  const getTotalOrders = async () => {
    const { data } = await supabase.from("orders").select()
    setTotalOrders(data)
  }

  const getPendingOrders = async () => {
    const { data } = await supabase.from("orders").select().eq("status", "قيد الانتظار")
    setPendingOrders(data)
  }

  const getSuccessOrders = async () => {
    const { data } = await supabase.from("orders").select().eq("status", "تم التوصيل")
    setSuccessOrders(data)
  }

  const getCanceledOrders = async () => {
    const { data } = await supabase.from("orders").select().eq("status", "مسترجع")
    setCanceledOrders(data)
  }

  const getTotalDrivers = async () => {
    const { data } = await supabase.from("drivers").select()
    setTotalDrivers(data)
  }

  const getOnlineDrivers = async () => {
    const { data } = await supabase.from("drivers").select().eq("status", "نشط")
    setOnlineDrivers(data)
  }

  const getProfit = async () => {
    const { data } = await supabase.from("orders").select().eq("status", "تم التوصيل")


    const totalRevenue = data.reduce((total, order) => {
      return total + order.price;
    }, 0)


    setTotalPrices(totalRevenue)
  }

  const cards = [
    {
      title: "اجمالي الشحنات",
      icon: <Box strokeWidth={1.3} size={23} />,
      value: totalOrders.length
    },
    {
      title: "قيد الانتظار",
      icon: <TimerReset strokeWidth={1.3} size={23} />,
      value: pendingOrders.length
    },
    {
      title: "تم التسليم",
      icon: <PackageCheck strokeWidth={1.3} size={23} />,
      value: successOrders.length
    },
    {
      title: "مسترجع",
      icon: <Ban strokeWidth={1.3} size={23} />,
      value: canceledOrders.length
    },

    {
      title: "اجمالي المناديب",
      icon: <UsersRound strokeWidth={1.3} size={23} />,
      value: totalDrivers.length
    },
    {
      title: "المناديب النشطون",
      icon: <UsersRound strokeWidth={1.3} size={23} />,
      value: onlineDrivers.length
    },
    {
      title: "ايرادات التوصيل",
      icon: <UsersRound strokeWidth={1.3} size={23} />,
      value: totalPrices + " ج.م"
    },
  ]


  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [updateOpen, setUpdateOpen] = useState(false)
  const [updateOpenOther, setUpdateOpenOther] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [selectedDriver, setSelectedDriver] = useState(null)
  const [sideOpen, setSideOpen] = useState(false)

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase.from("orders").select()

      if (error) {
        alert("error")
        console.log(error)
      }
      if (data) {
        setOrders(data)
        console.log(data)
      }
    }

    fetchOrders()
    getTotalOrders()
    getPendingOrders()
    getSuccessOrders()
    getCanceledOrders()
    getTotalDrivers()
    getOnlineDrivers()
    getProfit()

  }, [])

  const deleteOrder = async (id) => {
    const { data } = await supabase.from("orders").delete("").eq("id", id)

    setOrders(
      orders.filter((order) => order.id !== id)
    )
  }


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

        updateOpenOther && selectedOrder && (
          <UpdateOrderForm
            item={selectedOrder}
            func={setUpdateOpenOther}
          />
        )

      }
      {
        updateOpen && selectedDriver && (
          <UpdateDriverForm
            item={selectedDriver}
            func={setUpdateOpen}
          />
        )
      }

      <div className="flex min-h-screen w-full">
        <Sidebar status={sideOpen} seter={setSideOpen} />
        <div className="px-5 lg:px-15 py-10 grow w-full">
          <button onClick={() => setSideOpen(!sideOpen)} className="lg:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-0 p-1 mb-10">
            <span className={`block w-6 h-0.5 bg-black transition-transform `}></span>
            <span className={`block w-6 h-0.5 bg-black transition-opacity `}></span>
            <span className={`block w-6 h-0.5 bg-black transition-transform `}></span>
          </button>
          <h1 className="text-3xl font-bold mb-20">لوحة التحكم</h1>

          <div className="gap-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mb-10 ">
            {
              cards.map((item, index) => {
                return (
                  <div key={index} className="flex  flex-col border rounded-2xl border-zinc-100 shadow-md p-4 gap-4">
                    <div className="flex items-center gap-7 justify-between">
                      <span>{item.title}</span>
                      <span className='rounded-2xl bg-zinc-100 p-3.5 scale-90'>{item.icon}</span>
                    </div>
                    <span className="text-2xl font-bold">{item.value}</span>
                  </div>
                );
              })
            }
          </div>

          <div className="w-full flex items-center justify-between">
            <h1 className="text-3xl font-bold mb-10">الشحنات</h1>
            <Link href={"/orders"} className="text-zinc-600 flex items-center gap-2">
              المزيد
              <ArrowLeft size={16} />
            </Link>

          </div>

          <div className="mb-15 overflow-x-auto">


            <div className="overflow-hidden rounded-2xl border text-sm lg:text-md border-gray-100 bg-white shadow-md min-w-[1000px]">
              {/* Header */}
              <div className="grid grid-cols-8 divide-x divide-zinc-500 bg-black font-semibold text-white">
                <div className="p-4">#</div>
                <div className="p-4">العميل</div>
                <div className="p-4">العنوان</div>
                <div className="p-4">رقم التليفون</div>
                <div className="p-4">المندوب</div>
                <div className="p-4">الحالة</div>
                <div className="p-4">السعر</div>
                <div className="p-4">اجراءات</div>
              </div>

              {/* Body */}
              <div className="divide-y divide-gray-200">
                {orders.length > 0 ? [...orders].reverse().map((order, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-8 divide-x divide-zinc-200 hover:bg-gray-50 transition-all"
                  >
                    <div className="p-2.5 lg:p-4">{order.id}</div>

                    <div className="p-2.5 lg:p-4">{order.customer}</div>

                    <div className="p-2.5 lg:p-4">{order.address}</div>

                    <div className="p-2.5 lg:p-4">{order.phoneNum}</div>

                    <div className="p-2.5 lg:p-4">{order.driver}</div>

                    <div className="p-2.5 lg:p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium ${order.status === "تم التوصيل"
                          ? "bg-green-100 text-green-700"
                          : order.status === "مسترجع"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="p-2.5 lg:p-4">{order.price} ج.م</div>

                    <div className="p-2.5 lg:p-4 flex gap-2 items-center">
                      <button onClick={() => {
                        setUpdateOpenOther(true)
                        setSelectedOrder(order)
                      }} className="text-white p-2 rounded-xl bg-black hover:-translate-y-0.5 transition-all">
                        <Pen size={20} />
                      </button>
                      <button onClick={() => deleteOrder(order.id)} className="text-white p-2 rounded-xl bg-black hover:-translate-y-0.5 transition-all">
                        <Trash size={20} />
                      </button>
                    </div>
                  </div>
                )) : <p className="text-center m-10">لا يوجد شحنات حاليا .</p>}
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-between">
            <h1 className="text-3xl font-bold mb-10">المناديب</h1>
            <Link href={"/drivers"} className="text-zinc-600 flex items-center gap-2">
              المزيد
              <ArrowLeft size={16} />
            </Link>

          </div>

          <div className="overflow-x-auto">

            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md min-w-[1000px] ">
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
  );
}
