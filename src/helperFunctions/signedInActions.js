// sharedFunctions.js
"use client";
import {
  toggleResetAuth,
  toggleSignIn,
} from "@/components/GlobalState/Features/authSlice";
import {
  closeLoader,
  openLoader,
  toggleCurrentCourseToken,
  toggleEnlistInCourse,
  toggleSelectPaymentOptions,
} from "@/components/GlobalState/Features/popUpsSlice";
import {
  fetchUserBasket,
  toggleResetUserData,
} from "@/components/GlobalState/Features/userData";
import { store } from "@/components/GlobalState/store";
import {
  fetchAddToBasket,
  fetchRegisterAttendanceCourse,
} from "./dataFetching";
import { toast } from "react-toastify";
import { fetchCheckToken } from "./auth";
import { deleteAllUserAuthDataFromCookies } from "./cookiesManagement";

export function isUserSignedIn() {
  const userData = store.getState().userData;

  return Boolean(userData.info);
}

export function getUserInfoFromStore() {
  const { info } = store.getState().userData;

  return info;
}

export async function buyCourseNow(courseToken,router) {
  if (isUserSignedIn()) {
    handleAddToBasket(courseToken,router);
    router.push("/basket");
    // store.dispatch(toggleSelectPaymentOptions(courseToken));
  } else {
    store.dispatch(toggleSignIn());
  }
}

export async function handleAddToBasket(courseToken,router) {
  if (!isUserSignedIn()) {
    store.dispatch(toggleSignIn());
    return;
  }
  store.dispatch(openLoader(""));

  const user = getUserInfoFromStore();

  const result = await fetchAddToBasket({
    tokenCourse: courseToken,
    tokenStudent: user.token,
  });

  
  if (result.message) {
    store.dispatch(fetchUserBasket(user.token));
    toast.success(result.message);
  } else if (result.error) {
    toast.error(result.error);
  }
  
  router.push("/basket");
  store.dispatch(closeLoader());
}

export async function handleRegisterAttendanceCourse(courseToken) {
  if (!isUserSignedIn()) {
    store.dispatch(toggleSignIn());
    return;
  }
  console.log(courseToken, store.getState().userData.info.token);

  store.dispatch(toggleCurrentCourseToken(courseToken));
  store.dispatch(toggleEnlistInCourse());
}

export async function handleValidateToken() {
  if (!isUserSignedIn()) return true;

  const result = await fetchCheckToken(store.getState().userData.info.token);

  if (!result.exists) {
    deleteAllUserAuthDataFromCookies();
    store.dispatch(toggleResetUserData());
    store.dispatch(toggleResetAuth());
  }
  return result.exists;
}
