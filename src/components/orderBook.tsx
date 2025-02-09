import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { priceState } from "../hooks/store";

// data fetch async function
async function fetchOrderBook(symbol = "BTCUSDT", limit = 10) {
  const url = `https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=${limit}`;
  const response = await fetch(url);
  const data = await response.json();

  let bidTotal: number = 0;
  let askTotal: number = 0;
  // TODO: 소수점 셋째자리에서 반올림?
  return {
    asks: data.asks.map(([price, quantity]) => {
      const priceStr: string = (+price).toFixed(2);
      const quantityStr: string = (+quantity).toFixed(2);
      askTotal += parseFloat(quantity);
      const askTotalString: string = askTotal.toFixed(2);
      return { priceStr, quantityStr, askTotalString };
    }), // 매도 목록
    bids: data.bids.map(([price, quantity]) => {
      const priceStr: string = (+price).toFixed(2);
      const quantityStr: string = (+quantity).toFixed(2);
      bidTotal += parseFloat(quantity);
      const bidTotalString: string = bidTotal.toFixed(2);
      return { priceStr, quantityStr, bidTotalString };
    }), // 매수 목록
  };
}

export default function OrderBook({ symbol = "BTCUSDT" }) {
  // data fetch
  const { data, error, isLoading } = useQuery({
    queryKey: ["orderBook", symbol],
    queryFn: () => fetchOrderBook(symbol),
    refetchInterval: 2000,
    staleTime: 1000,
  });

  const setPrice = useSetRecoilState(priceState);
  // console.log()

  if (isLoading) return <div>Loading order book...</div>;
  if (error) return <div>Error loading order book</div>;

  if (!!data)
    return (
      <div className="w-72 border rounded bg-gray-100">
        {/* 매도 주문 (Asks) */}
        <div>
          <h2 className="text-red-500 font-bold">Sell Orders(USDT)</h2>
          <span className="ml-4">price</span>
          <span className="ml-4">quantity</span>
          <span className="ml-4">askTotalString</span>
          <ul>
            {data.asks.map(({ priceStr, quantityStr, askTotalString }, index) => (
              <li
                key={index}
                className="cursor-pointer text-red-600 hover:bg-red-100 p-2"
                onClick={() => setPrice(priceStr)}
              >
                <span className="ml-3">{priceStr}</span>
                <span className="ml-3">{quantityStr}</span>
                <span className="ml-3">{askTotalString}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 매수 주문 (Bids) */}
        <div>
          <h2 className="text-green-500 font-bold">Buy Orders(USDT)</h2>
          <ul>
            {data.bids.map(({priceStr, quantityStr, bidTotalString }, index) => (
              <li
                key={index}
                className="cursor-pointer text-green-600 hover:bg-green-100 p-2"
                onClick={() => setPrice(priceStr)}
              >
                <span className="ml-3">{priceStr}</span>
                <span className="ml-3">{quantityStr}</span>
                <span className="ml-3">{bidTotalString}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
}
