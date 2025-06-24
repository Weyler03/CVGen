import type { CoverLetterData } from "@/lib/cover-letter-data"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Mail, Phone, MapPin, Calendar } from "lucide-react"

interface CoverLetterTemplateProps {
  template: string
  data: CoverLetterData
}

export default function CoverLetterTemplate({ template, data }: CoverLetterTemplateProps) {
  const formattedDate = data.date ? format(new Date(data.date), "d 'de' MMMM 'de' yyyy", { locale: es }) : ""

  if (template === "custom") {
    const spacingClass = {
      compact: "space-y-4",
      normal: "space-y-6",
      spacious: "space-y-8",
    }[data.customization.sectionSpacing]

    const headerStyle =
      data.customization.headerStyle === "gradient"
        ? {
            background: `linear-gradient(135deg, ${data.customization.headerColor}, ${data.customization.accentColor})`,
          }
        : data.customization.headerStyle === "pattern"
          ? {
              backgroundColor: data.customization.headerColor,
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: "20px 20px",
            }
          : { backgroundColor: data.customization.headerColor }

    return (
      <div
        className="bg-white shadow-lg max-w-4xl mx-auto print:shadow-none print-preserve-bg"
        style={{
          fontFamily: data.customization.fontFamily,
          color: data.customization.textColor,
          backgroundColor: data.customization.backgroundColor,
          borderRadius: `${data.customization.borderRadius}px`,
        }}
      >
        <div className="text-white p-8 print-preserve-bg" style={headerStyle}>
          <h1 className="text-3xl font-bold mb-4">{data.fullName}</h1>
          <p className="text-lg mb-4">Candidato para {data.position}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              {data.email && (
                <div className="flex items-center">
                  {data.customization.showIcons && <Mail className="w-4 h-4 mr-2" />}
                  <span>{data.email}</span>
                </div>
              )}
              {data.phone && (
                <div className="flex items-center">
                  {data.customization.showIcons && <Phone className="w-4 h-4 mr-2" />}
                  <span>{data.phone}</span>
                </div>
              )}
            </div>
            <div className="space-y-2">
              {data.city && (
                <div className="flex items-center">
                  {data.customization.showIcons && <MapPin className="w-4 h-4 mr-2" />}
                  <span>{data.city}</span>
                </div>
              )}
              {formattedDate && (
                <div className="flex items-center">
                  {data.customization.showIcons && <Calendar className="w-4 h-4 mr-2" />}
                  <span>{formattedDate}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={`p-8 ${spacingClass}`}>
          <div className="mb-6">
            <p className="font-semibold" style={{ color: data.customization.headerColor }}>
              {data.hiringManager || "Responsable de Contratación"}
            </p>
            <p className="font-semibold" style={{ color: data.customization.accentColor }}>
              {data.company}
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-lg font-medium">{data.greeting || "Estimado/a Responsable de Contratación,"}</p>

            <div
              className="p-4 rounded-lg"
              style={{
                backgroundColor: `${data.customization.accentColor}10`,
                borderLeft: `4px solid ${data.customization.accentColor}`,
                borderRadius: `${data.customization.borderRadius}px`,
              }}
            >
              <p className="text-justify leading-relaxed">{data.introduction}</p>
            </div>

            <div
              className="p-4 rounded-lg"
              style={{
                backgroundColor: `${data.customization.headerColor}08`,
                borderRadius: `${data.customization.borderRadius}px`,
              }}
            >
              <p className="text-justify leading-relaxed">{data.body}</p>
            </div>

            <div
              className="p-4 rounded-lg"
              style={{
                backgroundColor: `${data.customization.accentColor}10`,
                borderLeft: `4px solid ${data.customization.accentColor}`,
                borderRadius: `${data.customization.borderRadius}px`,
              }}
            >
              <p className="text-justify leading-relaxed">{data.closing}</p>
            </div>

            <div className="mt-8 pt-4 border-t-2" style={{ borderColor: data.customization.accentColor }}>
              <p>{data.signature || "Atentamente,"}</p>
              <p className="mt-4 font-semibold text-lg" style={{ color: data.customization.headerColor }}>
                {data.fullName}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Existing templates remain the same...
  if (template === "professional") {
    return (
      <div className="bg-white shadow-lg max-w-4xl mx-auto p-8 print:shadow-none print-preserve-bg">
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
      <div className="bg-white shadow-lg max-w-4xl mx-auto print:shadow-none print-preserve-bg">
        <div className="bg-slate-800 text-white p-8 print-preserve-bg">
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
      <div className="bg-white shadow-lg max-w-4xl mx-auto print:shadow-none print-preserve-bg">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 print-preserve-bg">
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
