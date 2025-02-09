import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { priceState } from "../hooks/store";

export default function OrderForm() {
    // const [price, setPrice] = useRecoilState(priceState)
    return (
        <div className="bg-gray-500">
          <input type="number" id="priceInput" placeholder="가격 입력" />
        </div>
    );
}


