import { atom } from "recoil";

const priceState = atom({
  key: "priceState",
  default: "", // 선택된 가격 저장
});

const cryptocurrency = atom({
  key: "cryptocurrency",
  default: "BTCUSDT", // 선택된 가격 저장
});

export {priceState, cryptocurrency};