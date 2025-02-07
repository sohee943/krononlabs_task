import { useQuery } from "@tanstack/react-query";

export default function CoinList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["symbols"],
    queryFn: async () =>
      (await fetch("https://api.binance.com/api/v3/exchangeInfo")).json(),
  });
    console.log("this is " + JSON.stringify(data));
  //   ! 문제 상황: string으로는 console이 찍히는데 object로는 찍히지 않음
  //   ? 원인 분석: 받아오는 데이터가 너무 커서 string은 로딩이 빨리 되는데 object로는 안되는 듯
  //  TODO 해결 방안 : if문으로 로딩 화면 생성
  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  const coinData = data.symbols;
  if (!!data)
    return (
      <div className="bg-gray-200 w-1/5 h-screen overflow-scroll">
        <input></input>
        <ul>
          {coinData.map((coin) => (
            <li key={coin.symbol}>{coin.symbol}/{coin.quoteAsset}</li>
          ))}
        </ul>
        <div>tests</div>
      </div>
    );
}
