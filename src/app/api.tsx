'use client'
export default async function fetchCoinList() {
  const url = "https://api.binance.com/api/v3/exchangeInfo";
  try {
      const response = await fetch(url);
      const data = await response.json();
      const symbols = data.symbols.map(symbol => symbol.symbol); // 모든 거래 가능한 심볼 가져오기
      console.log("this is "+symbols); // 심볼 리스트 출력
      return symbols;
  } catch (error) {
      console.error("Error fetching coin list:", error);
  }
}