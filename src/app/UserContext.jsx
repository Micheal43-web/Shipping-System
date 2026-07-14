"use client";

import { createContext, useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { useRouter } from "next/navigation";

export const UserContext = createContext();


export const UserProvider = ({ children }) => {


  
  const navigate = useRouter("");
  const [user, setUser] = useState(null)

  const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      setUser(user)

      if(user === null) {
        
        navigate.push("/sign-up")
      }
    }

  useEffect(() => {
    

    getUser();
  }, [])

  




  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}