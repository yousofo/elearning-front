import { resetPopUps } from "@/components/GlobalState/Features/popUpsSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const PaymentConfirmation = () => {
  const paymentConfirmationState = useSelector(store=>store.popUps.paymentConfirmation)
  const dispatch = useDispatch();
  
  return (
    <div className={`payment-confirmation text-center flex flex-col gap-5 items-center relative`}>
      {/* success logo */}
      <img className="w-24 h-24" src="/media/gifs/book-open-stars.gif" alt="" />

      <div className="flex flex-col gap-3 items-center">
        <h2>{paymentConfirmationState.text}</h2>
        <p>شكرا لثقتكم في اباد للتدريب</p>
      </div>
      {/* close popup */}
      <button onClick={()=>dispatch(resetPopUps())}>دخول</button>
    </div>
  );
};

export default PaymentConfirmation;
