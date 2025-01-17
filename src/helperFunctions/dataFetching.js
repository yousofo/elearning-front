export const noCacheHeaders = {
  // 'Content-Type': 'application/json',
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
  "Surrogate-Control": "no-store",
};

export const cashedHeaders = {
  "Cache-Control": "",
  Pragma: "no-cache",
  Expires: "0",
  "Surrogate-Control": "no-store",
};
/**
 * Fetches a URL with optional caching and error handling.
 *
 * @param {string} url - The URL to fetch.
 * @param {object} [options={}] - Additional options to pass to the fetch request.
 * @param {any} [fallBack] - A fallback value to return if the fetch fails.
 * @param {boolean} [cashe] - wether to cache the response or not.
 * @return {Promise<any>} - A promise that resolves to the parsed JSON response or the response text.
 * @throws {Error} - If the fetch fails and no fallback value is provided.
 */
export async function fetchWithCheck(url, options = {}, fallBack, cashe) {
  try {
    const headers = cashe ? { "": "" } : noCacheHeaders;
    const casheOption = cashe ? { "": "" } : { cache: "no-cache" };

    const response = await fetch(url, {
      ...casheOption,
      ...options,
      headers: {
        ...headers,
        ...options?.headers,
      },
    });

    let data = await response.text();
    if (!response.ok) {
      let finalData;
      try {
        console.log(data);
        finalData = JSON.parse(data);
      } catch {
        finalData = data;
      } finally {
        throw finalData;
      }
    }

    try {
      return JSON.parse(data);
    } catch {
      return data;
    }
  } catch (error) {
    console.error("fetch with check catch");
    console.error(error);
    if (fallBack) return fallBack;
    throw error;
  }
}

// home

export async function fetchHomeData() {
  const data = await fetchWithCheck(`/api/home/homeData`, null, null);
  return data;
}

export async function fetchLatestArticles() {
  const data = await fetchWithCheck(
    `/api/articles/getLatestArticles`,
    null,
    []
  );
  return data;
}

export async function fetchComments() {
  const data = await fetchWithCheck(`/api/comments`, null, []);
  return data;
}



//header - navlist

export async function fetchCheckCourse(courseToken) {
  try {
    const data = await fetchWithCheck(
      `/api/reservations/checkCourse?token=${courseToken}&timestamp=${new Date().getTime()}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

// courses

export async function fetchCourses() {
  const data = await fetchWithCheck(`/api/home/allCourses`, null, []);
  return data;
}

//course details

export async function fetchCourseDetails(name) {
  try {
    const data = await fetchWithCheck(
      `/api/home/getByName?courseName=${name}`
    );
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}
////old with token
// export async function fetchCourseDetails(token) {
//   try {
//     const data = await fetchWithCheck(
//       `/api/home/courseDetails/${token}`
//     );
//     console.log(data);
//     return data;
//   } catch (e) {
//     console.log(e);
//   }
// }

// articles

export async function fetchArticles() {
  const data = await fetchWithCheck(`/api/articles/getArticles`, null, []);
  return data;
}

// catgories

export async function fetchCoursesCategories() {
  const data = await fetchWithCheck(
    `/api/categories/coursesCategories`,
    null,
    []
  );
  return data;
}

export async function fetchCoursesWithTypes() {
  const data = await fetchWithCheck(
    `/api/categories/coursesWithTypes`,
    null,
    []
  );
  return data;
}

// registeration - payment - basket

export async function fetchAddToBasket(data) {
  try {
    const addResult = await fetchWithCheck(
      `/api/reservations/addToBasket?tokenCourse=${data.tokenCourse}&tokenStudent=${data.tokenStudent}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(addResult);
    return addResult;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function fetchRegisterAttendanceCourse(data) {
  try {
    const courseDetails = await fetchWithCheck(
      `/api/reservations/addOfflineCourse`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return courseDetails;
  } catch (error) {
    console.log(error);
    return error;
  }
}

//registed course details

export async function fetchRegisteredCourseDetails(token) {
  try {
    const data = await fetchWithCheck(
      `/api/home/registeredCourseDetails/${token}`
    );
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}

//contact us

export async function fetchContactUsRequest(data) {
  try {
    const courseDetails = await fetchWithCheck(
      `/api/contact`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return courseDetails;
  } catch (error) {
    console.log(error);
    return error;
  }
}