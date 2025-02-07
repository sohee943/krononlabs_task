"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import CoinList from "./coinList";
// import fetchCoinList from '@/app/api'
// export default function fetchCoinList() {
//   return JSON.stringify(data)

export default function CoinView() {
  const [queryClient] = useState(() => new QueryClient()); // ✅ QueryClient 생성
  return (
    <QueryClientProvider client={queryClient}>
      <div className="items-center justify-center flex h-screen w-screen">
        {/* <div className=' bg-gray-200 w-1/5 h-screen'>coin list</div>
             */}
        <CoinList />
             <div className=' bg-gray-500 w-2/5 h-screen'>chart</div>
             <div className=' bg-gray-700 w-1/5 h-screen'>order book</div>
      </div>
    </QueryClientProvider>
  );
}
