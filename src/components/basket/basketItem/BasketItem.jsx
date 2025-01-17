import { closeLoader, openLoader } from '@/components/GlobalState/Features/popUpsSlice';
import { fetchUserBasket } from '@/components/GlobalState/Features/userData';
import { fetchWithCheck } from '@/helperFunctions/dataFetching';
import React from 'react'
import { useDispatch } from 'react-redux';
async function fetchDeletetFromBasket(basketCourseToken) {
  try {
    const data = await fetchWithCheck(
      `/api/reservations/removeFromBasket?tokenBasket=${basketCourseToken}`,
      {
        method: "DELETE",
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
const BasketItem = ({ data, userToken }) => {
  const dispatch = useDispatch();

  async function handleDelete(basketCourseToken) {
    dispatch(openLoader("جاري الحذف"));

    await fetchDeletetFromBasket(basketCourseToken)
      .then(() => {
        dispatch(fetchUserBasket(userToken));
      })
      .catch((error) => console.log(error));

    dispatch(closeLoader(""));
  }

  return (
    <tr
      className={`text-[#212529] bg-white p-2.5 rounded-[10px] abad-drop-shadow sm:shadow-none font-medium flex flex-col sm:table-row`}
    >
      <td>
        <div className="flex justify-between pe-4">
          <img
            className="max-w-20 max-h-20 object-cover"
            src="/media/placeholders/basket-item.png"
            alt=""
            loading='lazy'
          />
          {/* remove from basket */}
          <button
            className={`text-[#CDD0D8] hover:text-red-400 sm:hidden`}
            onClick={() => handleDelete(data.basketToken)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18 19C18 19.551 17.552 20 17 20H7C6.448 20 6 19.551 6 19V8H18V19ZM10 4.328C10 4.173 10.214 4 10.5 4H13.5C13.786 4 14 4.173 14 4.328V6H10V4.328ZM21 6H20H16V4.328C16 3.044 14.879 2 13.5 2H10.5C9.121 2 8 3.044 8 4.328V6H4H3C2.45 6 2 6.45 2 7C2 7.55 2.45 8 3 8H4V19C4 20.654 5.346 22 7 22H17C18.654 22 20 20.654 20 19V8H21C21.55 8 22 7.55 22 7C22 6.45 21.55 6 21 6Z"
              />
              <mask
                id="mask0_402_763752"
                className="mask0_402_76375"
                style={{ maskType: "luminance" }}
                maskUnits="userSpaceOnUse"
                x="2"
                y="2"
                width="20"
                height="20"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18 19C18 19.551 17.552 20 17 20H7C6.448 20 6 19.551 6 19V8H18V19ZM10 4.328C10 4.173 10.214 4 10.5 4H13.5C13.786 4 14 4.173 14 4.328V6H10V4.328ZM21 6H20H16V4.328C16 3.044 14.879 2 13.5 2H10.5C9.121 2 8 3.044 8 4.328V6H4H3C2.45 6 2 6.45 2 7C2 7.55 2.45 8 3 8H4V19C4 20.654 5.346 22 7 22H17C18.654 22 20 20.654 20 19V8H21C21.55 8 22 7.55 22 7C22 6.45 21.55 6 21 6Z"
                  fill="white"
                />
              </mask>
              <g mask="url(.mask0_402_763752)">
                <rect width="24" height="24" />
              </g>
            </svg>
          </button>
        </div>
      </td>
      <td>
        <p className="text-[13px] text-[#3F3E43] sm:text-inherit">
          <bdi>{data.courseName}</bdi>
        </p>
      </td>
      <td>
        <div className="flex justify-between pe-4">
          <span className="text-[15px] ">
            <bdi>{data.coursePrice} ريال سعودي</bdi>
          </span>

          {/* remove from basket */}
          <button
            className={`text-[#CDD0D8] hover:text-red-400 hidden sm:block`}
            onClick={() => handleDelete(data.basketToken)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18 19C18 19.551 17.552 20 17 20H7C6.448 20 6 19.551 6 19V8H18V19ZM10 4.328C10 4.173 10.214 4 10.5 4H13.5C13.786 4 14 4.173 14 4.328V6H10V4.328ZM21 6H20H16V4.328C16 3.044 14.879 2 13.5 2H10.5C9.121 2 8 3.044 8 4.328V6H4H3C2.45 6 2 6.45 2 7C2 7.55 2.45 8 3 8H4V19C4 20.654 5.346 22 7 22H17C18.654 22 20 20.654 20 19V8H21C21.55 8 22 7.55 22 7C22 6.45 21.55 6 21 6Z"
              />
              <mask
                id="mask0_402_76375"
                className="mask0_402_76375"
                style={{ maskType: "luminance" }}
                maskUnits="userSpaceOnUse"
                x="2"
                y="2"
                width="20"
                height="20"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18 19C18 19.551 17.552 20 17 20H7C6.448 20 6 19.551 6 19V8H18V19ZM10 4.328C10 4.173 10.214 4 10.5 4H13.5C13.786 4 14 4.173 14 4.328V6H10V4.328ZM21 6H20H16V4.328C16 3.044 14.879 2 13.5 2H10.5C9.121 2 8 3.044 8 4.328V6H4H3C2.45 6 2 6.45 2 7C2 7.55 2.45 8 3 8H4V19C4 20.654 5.346 22 7 22H17C18.654 22 20 20.654 20 19V8H21C21.55 8 22 7.55 22 7C22 6.45 21.55 6 21 6Z"
                  fill="white"
                />
              </mask>
              <g mask="url(.mask0_402_76375)">
                <rect width="24" height="24" />
              </g>
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BasketItem