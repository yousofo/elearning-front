import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { StateProvider } from "@/components/GlobalState/StateProvider";
// import Authentication from "@/components/auth/Authentication";
// import NavList from "@/components/NavList/NavList";
// import PopUps from "@/components/PopUps/PopUps";
import { ToastContainer } from "react-toastify";
// import Loader from "@/components/shared/Loader/Loader";
import "./globals.css";
import Head from "next/head";
import dynamic from "next/dynamic";
// import BrowserWarning from "@/components/shared/browser-support/BrowserWarning";

// import localFont from 'next/font/local'

// Font files can be colocated inside of `app`
// const bukra = localFont({
//   // src: [
//   //   {
//   //     path: './bukra/29LT-Bukra-regular.ttf',
//   //     weight: '400',
//   //     style: 'normal',
//   //   }
//   //   // {
//   //   //   path: './Roboto-Italic.woff2',
//   //   //   weight: '500',
//   //   //   style: 'medium',
//   //   // },
//   //   // {
//   //   //   path: './Roboto-Bold.woff2',
//   //   //   weight: '700',
//   //   //   style: 'bold',
//   //   // },
//   //   // {
//   //   //   path: './Roboto-BoldItalic.woff2',
//   //   //   weight: '700',
//   //   //   style: 'italic',
//   //   // },
//   // ],
//   display: 'swap'
// })

export const metadata = {
  title: "ABAD | آباد للتدريب",
  description:
    "معهد شبكة آباد للتدريب من المعاهد الرائدة في تقديم الدورات التطويرية المتخصصة في تقنية المعلومات.",
  keywords: [
    "abad",
    "ABAD",
    "abad institute",
    "abad training",
    "تدريب",
    "التدريب",
    "للتدريب",
    "معهد",
    "اباد",
    "كورس",
    "كورسات",
    "دورات",
    "دورة",
    "أباد",
    "اباد للتدريب",
    "معهد شبكة أباد في الرياض الذي يُعتبر الأفضل لتدريب وتعليم دورات تقنية المعلومات",
    " شبكات",
    " وأمان المعلومات في المملكة العربية السعودية. يُقدم المعهد مجموعة واسعة من الدورات",
    " بما في ذلك Cisco",
    " Microsoft",
    " CCNA",
    " CCNP",
    " CCIE",
    " MCSA",
    " صيانة الحاسوب والدعم الفني",
    " وأمان المعلومات مع تركيز على سيبر سيكيورتي وشهادة Security Plus. يقدم المعهد شهادات احترافية ومعتمدة في مجالات الشبكات وأمان المعلومات",
    " مما يساعد الطلاب على تعزيز مهاراتهم والاعتراف بخبراتهم من قبل الصناعة. التدريب يشمل جوانب عملية على رواترات وسويتشات",
    " Security Plus",
    " ITIL",
    " اختبارات CCNA وITIL",
    " إدارة المشاريع PMP عن بعد",
    " eLearn",
    " CEH (Certified Ethical Hacker)",
    " اختراق الشبكات والجوال",
    " شركة EC-Council",
    " فايروول",
    " CCNP Security",
    " تطبيقات عملية في داتا سينتر وكلاود أون لاين",
    " وإدارة وحماية السيرفرات حضوريًا في الرياض. توفير الدورات في مجال أمان المعلومات والسايبر سيكيورتي لجميع التخصصات",
    " بالإضافة إلى دورات في برمجة الويب باستخدام ASP.NET و Oracle",
    " ولغات البرمجة C# و Java",
    " والتعامل مع قواعد البيانات باستخدام SQL و Oracle.تمدة في وظائف تقنية المعلومات أمن الشبكات",
  ],
};
const Loader = dynamic(
  () => import("@/components/shared/Loader/Loader"),
  {
    ssr: false, // This disables server-side rendering for this component
  }
);
const Authentication = dynamic(
  () => import("@/components/auth/Authentication"),
  {
    ssr: false, // This disables server-side rendering for this component
  }
);
const NavList = dynamic(
  () => import("@/components/NavList/NavList"),
  {
    ssr: false, // This disables server-side rendering for this component
  }
);
const PopUps = dynamic(
  () => import("@/components/PopUps/PopUps"),
  {
    ssr: false, // This disables server-side rendering for this component
  }
);
export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <Head>
        <link rel="shortcut icon" href="/icon.png" type="image/png" />
      </Head>
      <body /*className={bukra.className}*/ suppressHydrationWarning={true}>
        {/* <BrowserWarning /> */}
        <StateProvider>
          <Loader />
          <Authentication />
          <NavList />
          <ToastContainer />
          <PopUps />
          <Header />
          {children}
          <Footer />
        </StateProvider>
      </body>
    </html>
  );
}
