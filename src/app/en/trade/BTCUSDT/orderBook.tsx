import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState} from "recoil";
import { priceState } from "./store";

// data fetch async function
async function fetchOrderBook(symbol, limit = 10) {
  const url = `https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=${limit}`;
  const response = await fetch(url);
  const data = await response.json();

  let bidTotal:number = 0;
  let askTotal:number = 0;
  // TODO: 소수점 셋째자리에서 반올림? 
  return {
    asks: data.asks.map(([ price, quantity ]) => {
          askTotal += parseFloat(quantity);
          const  askTotalString:string = askTotal.toString()
          return { price, quantity,askTotalString };
    }), // 매도 목록
    bids: data.bids.map(([price, quantity]) => {
          bidTotal += parseFloat(quantity);
          const  bidTotalString:string = bidTotal.toString()
          return { price, quantity,bidTotalString };
    }), // 매수 목록
  };
}

export default function OrderBook( {symbol} ) {
  // data fetch
  const { data, error, isLoading } = useQuery({
    queryKey: ["orderBook", symbol],
    queryFn: () => fetchOrderBook(symbol),
    refetchInterval: 2000,
    staleTime: 1000,
  });

  const setPrice = useSetRecoilState(priceState);

  if (isLoading) return <div>Loading order book...</div>;
  if (error) return <div>Error loading order book</div>;
  
  if (!!data)
    console.log(data.asks.askTotalString)
    return (
      <div className="w-72 border rounded bg-gray-100">
        {/* 매도 주문 (Asks) */}
        <div>
          <h2 className="text-red-500 font-bold">Sell Orders(USDT)</h2>
          <ul>
            {data.asks.map(({ price, quantity ,askTotalString}, index) => (
              <li
                key={index}
                className="cursor-pointer text-red-600 hover:bg-red-100 p-2"
                onClick={() => setPrice(price)}
              >
                {price}    {quantity}    {askTotalString}
              </li>
            ))}
          </ul>
        </div>

        {/* 매수 주문 (Bids) */}
        <div>
          <h2 className="text-green-500 font-bold">Buy Orders(USDT)</h2>
          <ul>
            {data.bids.map(({ price, quantity, bidTotalString}, index) => (
              <li
                key={index}
                className="cursor-pointer text-green-600 hover:bg-green-100 p-2"
                onClick={() => setPrice(price)}
              >
                <div className="ml-1">{price}</div>
                <div>{quantity}</div>
                <div>total is {bidTotalString}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
}
