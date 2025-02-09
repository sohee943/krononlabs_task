'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import CoinList from "@/components/coinList"; // 암호화폐 리스트 & 서치 기능
import OrderBook from "@/components/orderBook"; // 주문서 출력 & 가격 적용
import OrderForm from "@/components/orderForm";

export default function CoinView() {
  console.log("this is coinview");
  const [queryClient] = useState(() => new QueryClient());
  // const cryptoName = useRecoilValue(cryptocurrency);
  return (
    <QueryClientProvider client={queryClient}>
          <div className=" justify-center flex h-screen w-screen text-xs">
            <CoinList />
             <div className="  w-3/5 h-screen">
              <div className=" bg-gray-300 w-auto h-[50%]">chart</div>
              <OrderForm />
            </div>
            <OrderBook />
          </div>
          </QueryClientProvider>
  );
}
