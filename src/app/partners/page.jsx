"use client";
import "./profile.css";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchWithCheck } from "@/helperFunctions/dataFetching";
import { toast } from "react-toastify";
import { closeLoader, openLoader } from "@/components/GlobalState/Features/popUpsSlice";
import Hero from "@/components/shared/hero/Hero";

const Partners = () => {
  const [coursesTypes, setCoursesTypes] = useState([]);
  const [companyServices, setCompanyServices] = useState([]);
  const [generalError, setGeneralError] = useState("");
  const dispatch = useDispatch();

  // logged user data
  const userInfo = useSelector((store) => store.userData.info);

  // react-hook-form
  const partnersApplyForm = useForm();
  const { register, handleSubmit, formState, setError, reset } =
    partnersApplyForm;
  // const { name,ref,onChange,onBlur}=register("id")
  let { errors } = formState;

  async function handleFormSubmit(reactForm, event) {
    dispatch(openLoader("جاري التحديث"));

    const formData = new FormData();

    // Append file
    if (reactForm.file[0]) {
      formData.append(
        "attachedFile",
        reactForm.file[0],
        reactForm.file[0].name
      );
    }

    // Append other form fields
    formData.append("TokenNumber", userInfo?.token || "");
    formData.append("Details", reactForm?.details || "");
    formData.append("TitleJob", reactForm?.jobName || "");
    formData.append("SerivesModelId", reactForm?.serviceName || "");
    formData.append("CoursesTypeId", reactForm?.courseName || "");
    formData.append("OurEmail", reactForm?.email || "");
    formData.append("Telphone", reactForm?.phone || "");
    formData.append("FullName", reactForm?.arabicName || "");
    formData.append("OrganizationName", reactForm?.organization || "");
    // Make the POST request
    try {
      const result = await fetchWithCheck(
        `/api/companyServices/createCompanyRequest`,
        {
          method: "POST",
          body: formData,
        }
      );
      console.log(result);
      toast.success(result.message);
    } catch (error) {
      setGeneralError(error.message);
    } finally {
      dispatch(closeLoader(""));
    }
  }

  useEffect(() => {
    fetchWithCheck("/api/companyServices/coursesTypes").then((e) =>
      setCoursesTypes(e)
    );
    fetchWithCheck("/api/companyServices/companyServices").then((e) =>
      setCompanyServices(e)
    );
  }, []);

  return (
    <main className="pb-10 sm:pb-24 relative">
      {/* HERO start  */}
      <Hero>
        <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl xl:text-6xl max-w-60 sm:max-w-fit">
          <span className="text-abad-gold whitespace-nowrap">تدريب</span>
          &nbsp;
          <span>الشركات</span>
        </h2>
      </Hero>
      {/* HERO end  */}
      {/* main content start */}
      <section className="profile flex flex-col gap-8 max-w-screen-xl mx-auto px-4 ">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          action=""
          noValidate
          id="partnersApplyForm"
          className="grid md:grid-cols-2 gap-4"
        >
          {/* arabic name !*/}
          <div className="input">
            <label htmlFor="arabicName">الاسم كامل*</label>
            <input
              type="text"
              name=""
              placeholder="اكتب الاسم كامل"
              id="arabicName"
              {...register("arabicName", {
                required: "يجب كتابة الاسم بالكامل",
              })}
            />
            <p className="input-error">{errors.arabicName?.message}</p>
          </div>
          {/* email !*/}
          <div className="input">
            <label htmlFor="email">عنوان البريد الإلكتروني الخاص بالعمل*</label>
            <input
              type="email"
              name=""
              placeholder="اكتب البريد الالكتروني الخاص بالعمل"
              id="email"
              {...register("email", {
                required: "يجب كتابة البريد الالكتروني الخاص بالعمل",
              })}
            />
            <p className="input-error">{errors.email?.message}</p>
          </div>
          {/* phone !*/}
          <div className="input">
            <label htmlFor="phone">الهاتف*</label>
            <input
              type="text"
              name=""
              placeholder="اكتب رقم الهاتف"
              id="phone"
              {...register("phone", { required: "يجب كتابة رقم الهاتف" })}
            />
            <p className="input-error">{errors.phone?.message}</p>
          </div>
          {/* job name !*/}
          <div className="input">
            <label htmlFor="jobName">المسمي الوظيفي*</label>
            <input
              type="text"
              name=""
              placeholder="اكتب المسمي الوظيفي"
              id="jobName"
              {...register("jobName", {
                required: "اكتب المسمي الوظيفي",
              })}
            />
            <p className="input-error">{errors.jobName?.message}</p>
          </div>
          {/* organization  !*/}
          <div className="input md:col-span-2">
            <label htmlFor="organization">اسم المنظمة*</label>
            <input
              type="text"
              name=""
              placeholder="اكتب اسم المنظمة"
              id="organization"
              {...register("organization", {
                required: "يجب كتابة اسم المنظمة ",
              })}
            />
            <p className="input-error">{errors.organization?.message}</p>
          </div>
          {/* course name !*/}
          <div className="input">
            <label htmlFor="courseName">اسم الدورة*</label>
            <div className="select relative">
              <select
                name=""
                id="courseName"
                className="w-full focus:outline-none"
                {...register("courseName", {
                  required: "يجب اخيار اسم الدورة",
                })}
              >
                <option value="" className="hidden">
                  اختر الدورة
                </option>
                {coursesTypes.map((e, i) => (
                  <option key={i} value={e.code}>
                    {e.arabicName}
                  </option>
                ))}
              </select>
            </div>
            <p className="input-error">{errors.courseName?.message}</p>
          </div>
          {/* services !*/}
          <div className="input ">
            <label htmlFor="servicesName">الخدمات المطلوبة*</label>
            <div className="select relative">
              <select
                name=""
                id="serviceName"
                className="w-full focus:outline-none"
                {...register("serviceName", {
                  required: "يجب اخيار الخدمة",
                })}
              >
                <option value="" className="hidden">
                  اختر الخدمة
                </option>
                {companyServices.map((e, i) => (
                  <option key={i} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
              {/* <Select
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: "#cdd0d8",
                    padding: "9.5px",
                    borderRadius: "8px",
                  }),
                }}
                isMulti={true}
                isRtl={true}
                placeholder="اختر الخدمات"
                options={options}
              /> */}
            </div>
            <p className="input-error">{errors.courseName?.message}</p>
          </div>
          {/* details !*/}
          <div className="input md:col-span-2">
            <label htmlFor="details">تفاصيل الطلب*</label>
            <div className="select relative">
              <textarea
                name=""
                id="details"
                className="w-full focus:outline-none"
                {...register("details", {
                  required: "يجب كتابة تفاصيل الطلب*",
                })}
              ></textarea>
            </div>
            <p className="input-error">{errors.details?.message}</p>
          </div>
          {/* file !*/}
          <div className="input md:col-span-2">
            <label htmlFor="file">ملف مرفق</label>
            <div className="select relative">
              <input
                type="file"
                name=""
                className="w-full"
                placeholder="ملف مرفق"
                accept=".pdf"
                id="file"
                {...register("file")}
              />
            </div>
            {/* <div
              className="select flex items-center gap-3 !p-2 !px-4"
              style={{ boxShadow: "5px 4px 30px 0px #00000014" }}
            >
              <div className="relative w-fit overflow-hidden cursor-pointer">
                <div
                  style={{ border: "1px solid #D3D3D3" }}
                  className="bg-[#E8E8E8] p-2 rounded-lg block pointer-events-none"
                >
                  اختر الملف
                </div>
                <input
                  type="file"
                  name=""
                  className="absolute z-10 opacity-0 w-[300px] h-full left-0 top-0 cursor-pointer"
                  placeholder="ملف مرفق"
                  id="file"
                  {...register("file")}
                />
              </div>
              <p className="font-light text-base">لا يوجد ملف تم اختيارة</p>
            </div> */}
            <p className="input-error">{errors.file?.message}</p>
          </div>
          {/* general error */}
          <p
            style={{ display: generalError ? "block" : "none" }}
            className={`input-error`}
          >
            {generalError}
          </p>
        </form>
        <div className="btns">
          <button
            type="submit"
            form="partnersApplyForm"
            className="bg-abad-gold text-[#282828] p-4 rounded-2xl px-[4.5rem]"
          >
            ارسال
          </button>
        </div>
      </section>
      {/* main content end */}
    </main>
  );
};

export default Partners;
