import type { CoverLetterData } from "@/lib/cover-letter-data"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface CoverLetterTemplateProps {
  template: string
  data: CoverLetterData
}

export default function CoverLetterTemplate({ template, data }: CoverLetterTemplateProps) {
  const formattedDate = data.date ? format(new Date(data.date), "d 'de' MMMM 'de' yyyy", { locale: es }) : ""

  if (template === "professional") {
    return (
      <div className="bg-white shadow-lg max-w-4xl mx-auto p-8 print:shadow-none">
        <div className="flex justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">{data.fullName}</h1>
            <p>{data.email}</p>
            <p>{data.phone}</p>
          </div>
          <div className="text-right">
            <p>{formattedDate}</p>
            <p>{data.city}</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="font-semibold">{data.hiringManager || "Responsable de Contratación"}</p>
          <p>{data.company}</p>
        </div>

        <div className="space-y-4">
          <p>{data.greeting || "Estimado/a Responsable de Contratación,"}</p>

          <p className="text-justify">{data.introduction}</p>

          <p className="text-justify">{data.body}</p>

          <p className="text-justify">{data.closing}</p>

          <div className="mt-8">
            <p>{data.signature || "Atentamente,"}</p>
            <p className="mt-4 font-semibold">{data.fullName}</p>
          </div>
        </div>
      </div>
    )
  }

  if (template === "modern") {
    return (
      <div className="bg-white shadow-lg max-w-4xl mx-auto print:shadow-none">
        <div className="bg-slate-800 text-white p-8">
          <h1 className="text-3xl font-bold">{data.fullName}</h1>
          <p className="text-lg mt-2">Candidato para {data.position}</p>
        </div>

        <div className="p-8">
          <div className="flex justify-between mb-8 text-sm text-gray-600">
            <div className="space-y-1">
              <p>{data.email}</p>
              <p>{data.phone}</p>
            </div>
            <div className="text-right space-y-1">
              <p>{formattedDate}</p>
              <p>{data.city}</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="font-semibold">{data.hiringManager || "Responsable de Contratación"}</p>
            <p className="font-semibold">{data.company}</p>
          </div>

          <div className="space-y-4">
            <p>{data.greeting || "Estimado/a Responsable de Contratación,"}</p>

            <p className="text-justify">{data.introduction}</p>

            <p className="text-justify">{data.body}</p>

            <p className="text-justify">{data.closing}</p>

            <div className="mt-8">
              <p>{data.signature || "Atentamente,"}</p>
              <p className="mt-4 font-semibold">{data.fullName}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (template === "creative") {
    return (
      <div className="bg-white shadow-lg max-w-4xl mx-auto print:shadow-none">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8">
          <h1 className="text-3xl font-bold">{data.fullName}</h1>
          <p className="text-lg mt-2">Candidato para {data.position}</p>
          <div className="flex justify-between mt-4 text-sm">
            <div className="space-y-1">
              <p>{data.email}</p>
              <p>{data.phone}</p>
            </div>
            <div className="text-right space-y-1">
              <p>{formattedDate}</p>
              <p>{data.city}</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-6">
            <p className="font-semibold">{data.hiringManager || "Responsable de Contratación"}</p>
            <p className="font-semibold">{data.company}</p>
          </div>

          <div className="space-y-4">
            <p className="text-lg font-medium">{data.greeting || "Estimado/a Responsable de Contratación,"}</p>

            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-justify">{data.introduction}</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-justify">{data.body}</p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-justify">{data.closing}</p>
            </div>

            <div className="mt-8 border-t-2 border-gray-200 pt-4">
              <p>{data.signature || "Atentamente,"}</p>
              <p className="mt-4 font-semibold text-purple-600">{data.fullName}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
