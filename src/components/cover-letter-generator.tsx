"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Download, Eye } from "lucide-react"
import { type CoverLetterData, initialCoverLetterData, coverLetterTemplates } from "@/lib/cover-letter-data"
import CoverLetterTemplate from "@/components/cover-letter-template"

export default function CoverLetterGenerator() {
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData>(initialCoverLetterData)
  const [selectedTemplate, setSelectedTemplate] = useState("professional")
  const [showPreview, setShowPreview] = useState(false)

  const updateField = (field: keyof CoverLetterData, value: string) => {
    setCoverLetterData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  if (showPreview) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Vista Previa de la Carta</h1>
            <div className="flex gap-2">
              <Button onClick={() => setShowPreview(false)} variant="outline">
                Volver a Editar
              </Button>
              <Button onClick={() => window.print()}>
                <Download className="w-4 h-4 mr-2" />
                Descargar PDF
              </Button>
            </div>
          </div>
          <CoverLetterTemplate template={selectedTemplate} data={coverLetterData} />
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Formulario */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Carta de Presentación</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Tu Nombre Completo</Label>
                <Input
                  id="fullName"
                  value={coverLetterData.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  placeholder="Juan Pérez"
                />
              </div>
              <div>
                <Label htmlFor="position">Puesto al que Aplicas</Label>
                <Input
                  id="position"
                  value={coverLetterData.position}
                  onChange={(e) => updateField("position", e.target.value)}
                  placeholder="Desarrollador Frontend"
                />
              </div>
              <div>
                <Label htmlFor="company">Empresa</Label>
                <Input
                  id="company"
                  value={coverLetterData.company}
                  onChange={(e) => updateField("company", e.target.value)}
                  placeholder="Nombre de la Empresa"
                />
              </div>
              <div>
                <Label htmlFor="hiringManager">Responsable de Contratación</Label>
                <Input
                  id="hiringManager"
                  value={coverLetterData.hiringManager}
                  onChange={(e) => updateField("hiringManager", e.target.value)}
                  placeholder="Nombre del Responsable (opcional)"
                />
              </div>
              <div>
                <Label htmlFor="email">Tu Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={coverLetterData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Tu Teléfono</Label>
                <Input
                  id="phone"
                  value={coverLetterData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div>
                <Label htmlFor="date">Fecha</Label>
                <Input
                  id="date"
                  type="date"
                  value={coverLetterData.date}
                  onChange={(e) => updateField("date", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="city">Ciudad</Label>
                <Input
                  id="city"
                  value={coverLetterData.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  placeholder="Ciudad, País"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="greeting">Saludo</Label>
              <Input
                id="greeting"
                value={coverLetterData.greeting}
                onChange={(e) => updateField("greeting", e.target.value)}
                placeholder="Estimado/a Sr./Sra. [Apellido]"
              />
            </div>

            <div>
              <Label htmlFor="introduction">Introducción</Label>
              <Textarea
                id="introduction"
                value={coverLetterData.introduction}
                onChange={(e) => updateField("introduction", e.target.value)}
                placeholder="Párrafo de introducción explicando tu interés en el puesto..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="body">Cuerpo Principal</Label>
              <Textarea
                id="body"
                value={coverLetterData.body}
                onChange={(e) => updateField("body", e.target.value)}
                placeholder="Detalla tu experiencia relevante y por qué eres un buen candidato..."
                rows={6}
              />
            </div>

            <div>
              <Label htmlFor="closing">Cierre</Label>
              <Textarea
                id="closing"
                value={coverLetterData.closing}
                onChange={(e) => updateField("closing", e.target.value)}
                placeholder="Párrafo de cierre agradeciendo la consideración y expresando interés en una entrevista..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="signature">Firma</Label>
              <Input
                id="signature"
                value={coverLetterData.signature}
                onChange={(e) => updateField("signature", e.target.value)}
                placeholder="Atentamente,"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Selector de Plantillas */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Plantillas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {coverLetterTemplates.map((template) => (
              <div
                key={template.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedTemplate === template.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <h3 className="font-semibold">{template.name}</h3>
                <p className="text-sm text-gray-600">{template.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="mt-6">
          <Button onClick={() => setShowPreview(true)} className="w-full">
            <Eye className="w-4 h-4 mr-2" />
            Vista Previa
          </Button>
        </div>
      </div>
    </div>
  )
}
