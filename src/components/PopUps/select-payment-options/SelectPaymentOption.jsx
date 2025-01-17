import {
  closeLoader,
  openLoader,
} from "@/components/GlobalState/Features/popUpsSlice";
import { fetchWithCheck } from "@/helperFunctions/dataFetching";
import { useParams } from "next/navigation";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

/**
 * Renders a payment method button with the given image, text, and isTamara flag.
 * When clicked, it makes a request to the server to pay without saving data.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.image - The image URL for the payment method.
 * @param {string} props.text - The text to display for the payment method.
 * @param {boolean} props.isTamara - Flag indicating if the payment method is Tamara.
 * @return {JSX.Element} The payment method button component.
 */
const PaymentMethod = ({ image, text, setSelected }) => {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="radio"
        name="paymentOptionSelection"
        id={`paymentOptionSelection-${text}`}
        onClick={() => setSelected(text)}
      />
      <label
        htmlFor={`paymentOptionSelection-${text}`}
        className="flex gap-1 items-center"
      >
        <img src={image} className="max-h-10 " alt="" />
        <span className="text-sm">{text}</span>
      </label>
    </div>
  );
};

const DiscountAccordion = ({ discountCode,checkDiscount }) => {
  const [active, setActive] = useState(false);

  return (
    <div className="w-full border-b pb-5 flex flex-col gap-2">
      <div
        className="w-full flex justify-between cursor-pointer"
        onClick={() => setActive(!active)}
      >
        <span className="text-[#6A6A6C] text-sm">هل لديك كود خصم؟</span>
        <svg
          width={20}
          height={20}
          viewBox="0 0 20 20"
          fill="none"
          className={`${active ? "rotate-0" : "rotate-180"} transition-all`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.25 12.5L10 6.25L3.75 12.5"
            stroke="#6A6A6C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div
        className={`w-full ${
          active ? "max-h-36" : "max-h-0"
        } transition-all overflow-hidden flex items-end gap-3`}
      >
        <div className="input discount-input flex-1 ">
          <input
            ref={discountCode}
            type="text"
            name=""
            required
            placeholder="اكتب كود الخصم"
          />
        </div>
        <button onClick={checkDiscount} className="text-xs rounded-lg h-fit py-[14px] px-5 border border-green-500 text-green-500">
          تطبيق
        </button>
      </div>
    </div>
  );
};

const SelectPaymentOption = () => {
  const [selected, setSelected] = useState(null);
  const { token } = useParams(); //course token
  const userInfo = useSelector((store) => store.userData.info);
  const userBasket = useSelector((store) => store.userData.basket.data);
  const dispatch = useDispatch();
  const discountCode = useRef(null);
  const currentCourseToken = useSelector(
    (store) => store.popUps.currentCourseToken
  );

  const allPaymentOptions = [
    {
      image: "/media/logos/payment/tamara.png",
      text: "Tamara",
    },
    {
      image: "/media/logos/payment/master-card.png",
      text: "Mastercard",
    },
    {
      image: "/media/logos/payment/apple-pay.png",
      text: "Apple Pay",
    },
    {
      image: "/media/logos/payment/mada-pay.jpg",
      text: "mada Pay",
    },
    {
      image: "/media/logos/payment/tabby-pay.png",
      text: "Tabby",
    },
  ];

  async function checkDiscount() {
    const formDataForDiscount = new FormData();
    let coursesLength;

    if (window.location.pathname == "/basket") {
      coursesLength = userBasket.length;
    } else {
      coursesLength = 1;
    }

    console.log(discountCode.current);
    formDataForDiscount.append("discountCode", discountCode.current);
    formDataForDiscount.append("numberOfCourses", coursesLength);

    try {
      const result = await fetchWithCheck(`/api/views/checkDiscount`, {
        method: "POST",
        body: formDataForDiscount,
      });
      if(result.isDiscountApplicable){
        toast.success(result.message);
      }else{
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSubmit() {
    if (!selected) {
      toast.error("يرجى تحديد طريقة الدفع");
      return;
    }

    dispatch(openLoader("جاري الدفع"));

    let tokenCoursesList;

    if (window.location.pathname == "/basket") {
      tokenCoursesList = userBasket;
    } else {
      tokenCoursesList = [token || currentCourseToken];
    }

    console.log({
      tokenCoursesList,
      TokenStudent: userInfo.token,
      IsTamar: selected == "Tamara",
      IsTabby: selected == "Tabby",
      DiscountCode: discountCode.current.value,
    });

    try {
      const result = await fetchWithCheck(
        `/api/reservations/payWithoutSaveData`,
        {
          method: "POST",
          body: JSON.stringify({
            tokenCoursesList,
            TokenStudent: userInfo.token,
            IsTamar: selected == "Tamara",
            IsTabby: selected == "Tabby",
            DiscountCode: discountCode.current.value,
          }),
        }
      );
      console.log(result);
      toast.success(result.message);

      // router.push(result.redirect_url);
    } catch (error) {
      toast.error(error.error);
      console.log(error);
    } finally {
      dispatch(closeLoader());
    }
  }

  return (
    <div className="payment-options min-w-80 md:w-[400px] flex flex-col gap-4 relative">
      <div
        style={{
          background:
            "linear-gradient(83.79deg, #1B45B4 3.25%, #1C3899 96.85%)",
        }}
      >
        <h2 className="text-2xl font-bold text-white cairo-font md:text-3xl mb-2 p-4">
          وسلية الدفع
        </h2>
      </div>
      <div className="flex flex-col gap-4 p-4 pt-0">
        {/* <PaymentMethod image="/media/logos/payment/paypal.png" text="Paypal" /> */}

        <div className="flex flex-col gap-1">
          {allPaymentOptions.map((paymentOption, index) => (
            <PaymentMethod
              setSelected={setSelected}
              key={index}
              image={paymentOption.image}
              text={paymentOption.text}
            />
          ))}
        </div>

        <DiscountAccordion discountCode={discountCode} checkDiscount={checkDiscount}/>
        <button
          className="bg-abad-gold rounded-lg text-[#282828] font-medium p-3 drop-shadow-lg"
          onClick={handleSubmit}
        >
          شراء الان
        </button>
      </div>
    </div>
  );
};

export default SelectPaymentOption;
