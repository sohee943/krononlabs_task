import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function CoinList() {
  const [searchTerm, setSearchTerm] = useState(""); // 서치 기능 구현용 useState
  // data fetch
  const { data, isLoading, isError } = useQuery({
    queryKey: ["symbols"],
    queryFn: async () =>
      (await fetch("https://api.binance.com/api/v3/exchangeInfo")).json(),
  });
  // const cryptoName = useRecoilValue(cryptocurrency);

  if (isLoading) return <div>로딩중...</div>; // 로딩 화면
  if (isError) return <div>에러가 발생했습니다.</div>; // 에러 화면
  
// search 기능용 filter
  const coinData = data.symbols;
  const filteredCoins = coinData.filter((coin) =>
    coin.symbol.toUpperCase().includes(searchTerm.toUpperCase())
  );
  
  if (!!data)
    return (
        <div className="w-1/6 h-[60vh] overflow-scroll">
          <input
            type="text"
            placeholder="Search coins"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded"
          />
          <ul className="h-[60vh] p-2">
            {filteredCoins.length > 0 ? (
              filteredCoins.map((coin) => (
                <li className="cursor-pointer hover:bg-gray-200 p-1" key={coin.symbol}>
                  {coin.symbol} ({coin.baseAsset} / {coin.quoteAsset})
                </li>
              ))
            ) : (
              <li>No coins found</li>
            )}
          </ul>
        </div>
    );
}
