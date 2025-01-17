"use client"
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const DiscountAccordion = ({
  discountCode,
  checkDiscount,
  setCodeDiscount,
}) => {
  const [isApplicable, setIsApplicable] = useState(false);
  async function checkDiscountCode(e) {
    if(discountCode.current.value == ""){
      toast.error("يرجى ادخال كود الخصم");
      return;
    }
    try {
      const result = await checkDiscount();
      if (result?.isDiscountApplicable) {
        setIsApplicable(result.isDiscountApplicabl);
        setCodeDiscount(result.codeDiscountPercentage);
      }
    } catch {
      toast.error("حدث خطأ في التحقق من الكود");
    }
  }
  return (
    <div className={`w-full transition-all overflow-hidden flex items-end`}>
      <div className="input discount-input flex-1 relative">
        <svg
          width="23"
          height="23"
          viewBox="0 0 23 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${
            !isApplicable && " hidden "
          } absolute top-1/2 -translate-y-1/2 left-2`}
        >
          <path
            d="M11.5 0C5.14894 0 0 5.14715 0 11.5C0 17.8529 5.14894 23 11.5 23C17.8511 23 23 17.8497 23 11.5C23 5.15029 17.8511 0 11.5 0Z"
            fill="#2AD352"
          />
          <path
            d="M1.06798e-05 11.5C-0.00258532 13.4009 0.468128 15.2724 1.36968 16.9459C2.51828 17.2831 3.7093 17.4539 4.90638 17.4531C11.8199 17.4531 17.4243 11.8486 17.4243 4.93513C17.4253 3.71907 17.2492 2.50935 16.9014 1.34408C15.2389 0.458543 13.3836 -0.00312088 11.5 1.58781e-05C5.14896 1.58781e-05 1.06798e-05 5.14716 1.06798e-05 11.5Z"
            fill="#74DA7F"
          />
          <path
            d="M18.0596 9.59447L11.1474 16.8534C10.9591 17.051 10.7328 17.2086 10.482 17.3166C10.2313 17.4247 9.96139 17.481 9.68839 17.4823H9.6794C9.40791 17.4824 9.13918 17.4279 8.88915 17.3221C8.63913 17.2163 8.41291 17.0613 8.22393 16.8664L4.55606 13.0885C4.36655 12.8983 4.2167 12.6723 4.11522 12.4237C4.01374 12.1751 3.96265 11.9088 3.96492 11.6403C3.96718 11.3718 4.02275 11.1064 4.1284 10.8595C4.23405 10.6126 4.38768 10.3892 4.58038 10.2022C4.77307 10.0152 5.00099 9.86832 5.2509 9.7701C5.50082 9.67188 5.76775 9.62428 6.03621 9.63005C6.30467 9.63582 6.56931 9.69486 6.81477 9.80373C7.06023 9.9126 7.28162 10.0691 7.4661 10.2643L9.66503 12.5292L15.1226 6.79809C15.3054 6.60205 15.5253 6.44421 15.7695 6.33369C16.0137 6.22317 16.2774 6.16217 16.5453 6.15421C16.8133 6.14626 17.0801 6.1915 17.3305 6.28733C17.5808 6.38316 17.8097 6.52768 18.0038 6.71252C18.1979 6.89736 18.3535 7.11886 18.4615 7.3642C18.5695 7.60954 18.6277 7.87386 18.6329 8.14186C18.6381 8.40987 18.5901 8.67624 18.4917 8.92558C18.3933 9.17491 18.2464 9.40226 18.0596 9.59447Z"
            fill="white"
          />
        </svg>

        <input
          ref={discountCode}
          type="text"
          name=""
          required
          className="py-6 md:py-8 px-5 md:px-6 font-medium text-xs sm:text-base"
          placeholder="ادخل كوبون الخصم "
        />
      </div>
      <button
        onClick={checkDiscountCode}
        disabled={isApplicable}
        className="discount-btn  text-white font-medium rounded-lg h-fit py-6 md:py-8 px-5 md:px-6 text-xs sm:text-base"
      >
        تفعيل
      </button>
    </div>
  );
};

export default DiscountAccordion