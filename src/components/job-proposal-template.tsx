import type { JobProposalData } from "@/lib/job-proposal-data"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import Image from "next/image"

interface JobProposalTemplateProps {
  template: string
  data: JobProposalData
}

export default function JobProposalTemplate({ template, data }: JobProposalTemplateProps) {
  const { basicInfo, projectScope, deliverables, timeline, pricing } = data

  const formattedDate = basicInfo.date ? format(new Date(basicInfo.date), "d 'de' MMMM 'de' yyyy", { locale: es }) : ""

  if (template === "standard") {
    return (
      <div className="bg-white shadow-lg max-w-4xl mx-auto p-8 print:shadow-none">
        <div className="text-center mb-8 pb-6 border-b-2 border-gray-200">
          {basicInfo.logo && (
            <div className="flex justify-center mb-4">
              <Image
                src={basicInfo.logo || "/placeholder.svg"}
                alt="Company Logo"
                className="h-16 w-auto object-contain"
              />
            </div>
          )}
          <h1 className="text-3xl font-bold mb-2">Propuesta de Proyecto</h1>
          <h2 className="text-xl text-gray-600">{basicInfo.projectTitle}</h2>
          <p className="mt-4">
            Preparado por {basicInfo.yourName} para {basicInfo.clientName}
          </p>
          <p className="text-gray-500">{formattedDate}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Introducción</h2>
          <p className="text-gray-700 whitespace-pre-line">{basicInfo.introduction}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Alcance del Proyecto</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Descripción</h3>
              <p className="text-gray-700 whitespace-pre-line">{projectScope.description}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Objetivos</h3>
              <p className="text-gray-700 whitespace-pre-line">{projectScope.objectives}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Requisitos</h3>
              <p className="text-gray-700 whitespace-pre-line">{projectScope.requirements}</p>
            </div>
          </div>
        </div>

        {deliverables.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Entregables</h2>
            <div className="space-y-4">
              {deliverables.map((deliverable) => (
                <div key={deliverable.id} className="border-b pb-4">
                  <h3 className="text-xl font-semibold mb-2">{deliverable.name}</h3>
                  <p className="text-gray-700">{deliverable.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {timeline.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Cronograma</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Hito</th>
                    <th className="py-2 px-4 border-b text-left">Fecha Límite</th>
                    <th className="py-2 px-4 border-b text-left">Pago</th>
                  </tr>
                </thead>
                <tbody>
                  {timeline.map((milestone) => (
                    <tr key={milestone.id}>
                      <td className="py-2 px-4 border-b">{milestone.name}</td>
                      <td className="py-2 px-4 border-b">
                        {milestone.deadline ? format(new Date(milestone.deadline), "dd/MM/yyyy") : ""}
                      </td>
                      <td className="py-2 px-4 border-b">{milestone.payment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Precios y Pagos</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Precio Total</h3>
              <p className="text-gray-700">{pricing.totalPrice}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Términos de Pago</h3>
              <p className="text-gray-700">{pricing.paymentTerms}</p>
            </div>
            {pricing.additionalNotes && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Notas Adicionales</h3>
                <p className="text-gray-700 whitespace-pre-line">{pricing.additionalNotes}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t-2 border-gray-200">
          <p className="text-center text-gray-600">
            Esta propuesta es válida por 30 días a partir de la fecha indicada.
          </p>
        </div>
      </div>
    )
  }

  if (template === "business") {
    return (
      <div className="bg-white shadow-lg max-w-4xl mx-auto print:shadow-none">
        <div className="bg-slate-800 text-white p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{basicInfo.projectTitle}</h1>
              <div className="flex justify-between mt-4">
                <div>
                  <p className="text-sm opacity-80">Preparado por:</p>
                  <p className="font-semibold">{basicInfo.yourName}</p>
                </div>
                <div>
                  <p className="text-sm opacity-80">Para:</p>
                  <p className="font-semibold">{basicInfo.clientName}</p>
                </div>
                <div>
                  <p className="text-sm opacity-80">Fecha:</p>
                  <p className="font-semibold">{formattedDate}</p>
                </div>
              </div>
            </div>
            {basicInfo.logo && (
              <div className="ml-8">
                <Image
                  src={basicInfo.logo || "/placeholder.svg"}
                  alt="Company Logo"
                  className="h-16 w-auto object-contain bg-white p-2 rounded"
                />
              </div>
            )}
          </div>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">
              Resumen Ejecutivo
            </h2>
            <p className="text-gray-700 whitespace-pre-line">{basicInfo.introduction}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">
              Alcance del Proyecto
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-slate-700">Descripción</h3>
                <p className="text-gray-700 whitespace-pre-line">{projectScope.description}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-slate-700">Objetivos</h3>
                <p className="text-gray-700 whitespace-pre-line">{projectScope.objectives}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-slate-700">Requisitos</h3>
                <p className="text-gray-700 whitespace-pre-line">{projectScope.requirements}</p>
              </div>
            </div>
          </div>

          {deliverables.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">Entregables</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {deliverables.map((deliverable) => (
                  <div key={deliverable.id} className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2 text-slate-700">{deliverable.name}</h3>
                    <p className="text-gray-700">{deliverable.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {timeline.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">
                Cronograma y Pagos
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="py-3 px-4 text-left font-semibold">Hito</th>
                      <th className="py-3 px-4 text-left font-semibold">Fecha Límite</th>
                      <th className="py-3 px-4 text-left font-semibold">Pago</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timeline.map((milestone, index) => (
                      <tr key={milestone.id} className={index % 2 === 0 ? "bg-slate-50" : ""}>
                        <td className="py-3 px-4">{milestone.name}</td>
                        <td className="py-3 px-4">
                          {milestone.deadline ? format(new Date(milestone.deadline), "dd/MM/yyyy") : ""}
                        </td>
                        <td className="py-3 px-4 font-medium">{milestone.payment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">Inversión</h2>
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-slate-700">Precio Total:</h3>
                <p className="text-2xl font-bold text-slate-800">{pricing.totalPrice}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2 text-slate-700">Términos de Pago</h3>
                <p className="text-gray-700">{pricing.paymentTerms}</p>
              </div>
              {pricing.additionalNotes && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-700">Notas Adicionales</h3>
                  <p className="text-gray-700 whitespace-pre-line">{pricing.additionalNotes}</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 pt-6 border-t-2 border-slate-200">
            <p className="text-center text-slate-600">
              Esta propuesta es válida por 30 días a partir de la fecha indicada.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (template === "creative") {
    return (
      <div className="bg-white shadow-lg max-w-4xl mx-auto print:shadow-none">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">{basicInfo.projectTitle}</h1>
              <p className="text-lg mt-2">Una propuesta para {basicInfo.clientName}</p>
              <div className="flex justify-between mt-6 text-sm">
                <div>
                  <p className="opacity-80">Por:</p>
                  <p className="font-semibold">{basicInfo.yourName}</p>
                </div>
                <div>
                  <p className="opacity-80">Fecha:</p>
                  <p className="font-semibold">{formattedDate}</p>
                </div>
              </div>
            </div>
            {basicInfo.logo && (
              <div className="ml-8">
                <Image
                  src={basicInfo.logo || "/placeholder.svg"}
                  alt="Company Logo"
                  className="h-20 w-auto object-contain bg-white/10 backdrop-blur-sm p-3 rounded-lg"
                />
              </div>
            )}
          </div>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">✨</div>
              Introducción
            </h2>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-gray-700 whitespace-pre-line">{basicInfo.introduction}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">🎯</div>
              Alcance del Proyecto
            </h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-blue-700">Descripción</h3>
                <p className="text-gray-700 whitespace-pre-line">{projectScope.description}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-blue-700">Objetivos</h3>
                <p className="text-gray-700 whitespace-pre-line">{projectScope.objectives}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-blue-700">Requisitos</h3>
                <p className="text-gray-700 whitespace-pre-line">{projectScope.requirements}</p>
              </div>
            </div>
          </div>

          {deliverables.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-green-600 mb-4 flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">📦</div>
                Entregables
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {deliverables.map((deliverable) => (
                  <div key={deliverable.id} className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2 text-green-700">{deliverable.name}</h3>
                    <p className="text-gray-700">{deliverable.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {timeline.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-amber-600 mb-4 flex items-center">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3">📅</div>
                Cronograma
              </h2>
              <div className="space-y-4">
                {timeline.map((milestone) => (
                  <div key={milestone.id} className="bg-amber-50 p-4 rounded-lg flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-amber-700">{milestone.name}</h3>
                      <p className="text-sm text-gray-600">
                        {milestone.deadline ? format(new Date(milestone.deadline), "dd/MM/yyyy") : ""}
                      </p>
                    </div>
                    <div className="bg-amber-200 px-3 py-1 rounded-full text-amber-800 font-medium">
                      {milestone.payment}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">💰</div>
              Inversión
            </h2>
            <div className="bg-red-50 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-red-700">Precio Total:</h3>
                <p className="text-2xl font-bold text-red-700">{pricing.totalPrice}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2 text-red-700">Términos de Pago</h3>
                <p className="text-gray-700">{pricing.paymentTerms}</p>
              </div>
              {pricing.additionalNotes && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-red-700">Notas Adicionales</h3>
                  <p className="text-gray-700 whitespace-pre-line">{pricing.additionalNotes}</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 pt-6 border-t-2 border-gray-200">
            <p className="text-center text-gray-600">
              Esta propuesta es válida por 30 días a partir de la fecha indicada.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return null
}
