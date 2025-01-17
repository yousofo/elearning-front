"use client"
import { closeLoader, openLoader } from "@/components/GlobalState/Features/popUpsSlice";
import { store } from "@/components/GlobalState/store";
import { fetchCourseDetails } from "./dataFetching";
import { togglePreFetchedCourse } from "@/components/GlobalState/Features/dataContentSlice";



export async function fetchPreloadCourseData(courseToken) {
  store.dispatch(openLoader(""));
  const result = await fetchCourseDetails(courseToken);
  store.dispatch(togglePreFetchedCourse(result));
  store.dispatch(closeLoader());
  return result
}

export async function handleNavigateToCourseDetails(event,courseName,router){
  event.preventDefault()
  const result = await fetchPreloadCourseData(courseName)
  console.log(result)
  // /${result.courseName.split(" ").join("-")}
  router.push(`/courses/${courseName}`)
} 