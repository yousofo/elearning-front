import React from 'react'

const PaymentMethod = ({ paymentOption, setSelected }) => {
  return (
    <div className="flex gap-2 items-center py-2">
      <input
        type="radio"
        name="paymentOptionSelection"
        id={`paymentOptionSelection-${paymentOption.name}`}
        onClick={() => setSelected(paymentOption.name)}
      />
      <label
        htmlFor={`paymentOptionSelection-${paymentOption.name}`}
        className="flex gap-1 items-center"
      >
        <img src={paymentOption.image} className="max-h-10 " alt="" />
        <span className="text-[#212529]">{paymentOption.text}</span>
      </label>
    </div>
  );
};

export default PaymentMethod