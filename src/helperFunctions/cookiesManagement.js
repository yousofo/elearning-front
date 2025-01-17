const userAuthCookiesKeys = ["arabicName",
  "idnumber",
  "email",
  "phone",
  "gender",
  "birthDate",
  "nationality",
  "educationsType",
  "city",
  "token",]

function setCookie(name, value, days) {
  let maxAge = "";
  if (days) {
    maxAge = "; max-age=" + (days * 24 * 60 * 60);
  }
  document.cookie = name + "=" + (value || "") + maxAge + "; path=/; ";
}

function setCookiesFromObject(object = {}, days = null) {
  console.log("setCookiesFromObject")
  console.log(object)
  for (const [key, value] of Object.entries(object)) {
    setCookie(key, value, days)
  }
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function getAllUserAuthDataFromCookies() {
  let userAuthInfo = {}
  userAuthCookiesKeys.forEach(e => {
    userAuthInfo[e] = getCookie(e)
  })
  return userAuthInfo
}

function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
}

function deleteAllUserAuthDataFromCookies() {
  userAuthCookiesKeys.forEach(e => {
    deleteCookie(e)
  })
}


export { setCookiesFromObject, getAllUserAuthDataFromCookies, deleteAllUserAuthDataFromCookies }