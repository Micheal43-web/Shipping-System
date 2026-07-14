"use client"

import { Pen, Plus, Trash } from "lucide-react";
import Sidebar from "../Components/Sidebar";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import AddOrderForm from "../Components/AddOrderForm";
import UpdateOrderForm from "../Components/UpdateOrderForm";

function page() {


  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([])

  const [addOpen, setAddOpen] = useState(false)
  const [updateOpen, setUpdateOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

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
      }
    }
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

    fetchOrders()
    fetchDrivers()
  }, [])


  const deleteOrder = async (id) => {
    const { data } = await supabase.from("orders").delete("").eq("id", id)

    setOrders(
      orders.filter((order) => order.id !== id)
    )
  }

  const isDriver = () => {
    if (drivers.length == 0) {
      alert("يجب ان تضيف مندوب واحد علي الاقل !")
    }
    else {
      setAddOpen(true)
    }
  }




  return (
    <>
      {
        addOpen && <AddOrderForm func={setAddOpen} />

      }
      {

        updateOpen && selectedOrder && (
          <UpdateOrderForm
            item={selectedOrder}
            func={setUpdateOpen}
          />
        )

      }
      <div className="flex h-screen w-full">
        <Sidebar status={sideOpen} seter={setSideOpen} />
        <div className="px-5 lg:px-15 py-10 grow w-full">
          <button onClick={() => setSideOpen(!sideOpen)} className="lg:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-0 p-1 mb-10">
            <span className={`block w-6 h-0.5 bg-black transition-transform `}></span>
            <span className={`block w-6 h-0.5 bg-black transition-opacity `}></span>
            <span className={`block w-6 h-0.5 bg-black transition-transform `}></span>
          </button>
          <div className="flex items-start justify-between mb-15">
            <h1 className="text-3xl font-bold ">الشحنات</h1>
            <button onClick={isDriver} className="hidden lg:flex items-center gap-4 bg-black text-white px-4 py-3 rounded-xl cursor-pointer hover:-translate-y-1 transition-all">
              اضافة شحنة
              <Plus size={20} />
            </button>
            <button onClick={isDriver} className="flex lg:hidden items-center gap-4 bg-black text-white px-4 py-3 rounded-xl cursor-pointer hover:-translate-y-1 transition-all">
            
              <Plus size={20} />
            </button>

          </div>

          <div className="overflow-x-auto">
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md min-w-[1000px]">
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
                {orders.length > 0 ? [...orders].reverse().map((order, index) => {

                  return (
                    <div
                      key={index}
                      className="grid grid-cols-8  divide-x divide-zinc-200 hover:bg-gray-50 transition-all"
                    >
                      <div className="p-4">{order.id}</div>

                      <div className="p-4">{order.customer}</div>

                      <div className="p-4">{order.address}</div>

                      <div className="p-4">{order.phoneNum}</div>

                      <div className="p-4">{order.driver}</div>

                      <div className="p-4">
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

                      <div className="p-4">{order.price} ج.م</div>

                      <div className="p-4 flex gap-2 items-center">
                        <button onClick={() => {
                          setUpdateOpen(true)
                          setSelectedOrder(order)
                        }} className="text-white p-2 rounded-xl bg-black hover:-translate-y-0.5 transition-all">
                          <Pen size={20} />
                        </button>
                        <button onClick={() => deleteOrder(order.id)} className="text-white p-2 rounded-xl bg-black hover:-translate-y-0.5 transition-all">
                          <Trash size={20} />
                        </button>
                      </div>
                    </div>
                  )
                }) : <p className="text-center m-10">لا يوجد شحنات  حاليا .</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page