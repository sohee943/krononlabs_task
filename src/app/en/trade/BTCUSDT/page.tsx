"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import CoinList from "./coinList"; // 암호화폐 리스트 & 서치 기능

export default function CoinView() {
  const [queryClient] = useState(() => new QueryClient()); 
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-2 justify-center flex h-screen w-screen">
        <CoinList /> 
             <div className=' bg-gray-500 w-2/5 h-screen'>chart</div>
             <div className=' bg-gray-700 w-1/5 h-screen'>order book</div>
      </div>
    </QueryClientProvider>
  );
}
