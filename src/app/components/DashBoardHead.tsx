'use client'
import Image from "next/image";
import { useState, useEffect } from "react"

interface User {
  image: string;
  name: string;
}

export function DashBoardHead() {
  const [data, setData] = useState(null);

  useEffect(()=> {
    fetch('/api')
    .then((res)=> res.json())
    .then((data) => {
      setData(data)
      
    });
  },[]);
  console.log(data);
  
 
  return (
    <header className="bg-white/50 backdrop-blur-md shadow-md px-6 py-4 flex justify-between items-center border-b border-white/40">
        <h1 className="text-2xl font-semibold text-indigo-800">Dashboard Overview</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Hi, User 👋</span>
          <img src="./image" className="w-9 h-9 rounded-full border-2 border-indigo-300"></img>
        </div>
      </header>
  
  )
}


