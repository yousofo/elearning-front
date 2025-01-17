export const fetchCache = 'force-no-store';

const countires = [
  { "id": "AE", "name": "United Arab Emirates", "name_ar": "الإمارات العربية المتحدة" },
  { "id": "BH", "name": "Bahrain", "name_ar": "البحرين" },
  { "id": "DJ", "name": "Djibouti", "name_ar": "جيبوتي" },
  { "id": "DZ", "name": "Algeria", "name_ar": "الجزائر" },
  { "id": "EG", "name": "Egypt", "name_ar": "مصر" },
  { "id": "IQ", "name": "Iraq", "name_ar": "العراق" },
  { "id": "JO", "name": "Jordan", "name_ar": "الأردن" },
  { "id": "KM", "name": "Comoros", "name_ar": "جزر القمر" },
  { "id": "KW", "name": "Kuwait", "name_ar": "الكويت" },
  { "id": "LB", "name": "Lebanon", "name_ar": "لبنان" },
  { "id": "LY", "name": "Libya", "name_ar": "ليبيا" },
  { "id": "MA", "name": "Morocco", "name_ar": "المغرب" },
  { "id": "MR", "name": "Mauritania", "name_ar": "موريتانيا" },
  { "id": "OM", "name": "Oman", "name_ar": "عمان" },
  { "id": "PS", "name": "Palestine", "name_ar": "فلسطين" },
  { "id": "QA", "name": "Qatar", "name_ar": "قطر" },
  { "id": "SA", "name": "Saudi Arabia", "name_ar": "السعودية" },
  { "id": "SD", "name": "Sudan", "name_ar": "السودان" },
  { "id": "SO", "name": "Somalia", "name_ar": "الصومال" },
  { "id": "SY", "name": "Syria", "name_ar": "سوريا" },
  { "id": "TN", "name": "Tunisia", "name_ar": "تونس" },
  { "id": "YE", "name": "Yemen", "name_ar": "اليمن" }
]


export async function GET(request) {
  return new Response(JSON.stringify(countires), {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Content-Type': 'application/json',
      'Expires': '0',
      'Surrogate-Control': 'no-store'
    }
  });
}
