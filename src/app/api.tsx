"use client";

export default async function fetchCoinList() {
  const url = "https://api.binance.com/api/v3/exchangeInfo";
  try {
    const response = await fetch(url);
    const data = await response.json();
    const symbols = data.symbols.map((symbol: object) => {
      return symbol;
    });
    return symbols;
  } catch (error) {
    console.error("Error fetching coin list:", error);
  }
}
