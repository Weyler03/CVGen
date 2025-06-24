"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Download, Eye, Palette } from "lucide-react"
import { type CoverLetterData, initialCoverLetterData, coverLetterTemplates } from "@/lib/cover-letter-data"
import { fontOptions, colorPresets } from "@/lib/cv-data"
import CoverLetterTemplate from "@/components/cover-letter-template"
import { printCoverLetter } from "@/components/print-utils"

export default function CoverLetterGenerator() {
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData>(initialCoverLetterData)
  const [selectedTemplate, setSelectedTemplate] = useState("professional")
  const [activeTab, setActiveTab] = useState("basic")
  const [showPreview, setShowPreview] = useState(false)

  const updateField = (field: keyof Omit<CoverLetterData, "customization">, value: string) => {
    setCoverLetterData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateCustomization = (field: keyof typeof coverLetterData.customization, value: any) => {
    setCoverLetterData((prev) => ({
      ...prev,
      customization: { ...prev.customization, [field]: value },
    }))
  }

  const applyColorPreset = (preset: (typeof colorPresets)[0]) => {
    setCoverLetterData((prev) => ({
      ...prev,
      customization: {
        ...prev.customization,
        headerColor: preset.header,
        accentColor: preset.accent,
      },
    }))
  }

  const handlePrint = () => {
    printCoverLetter(selectedTemplate, coverLetterData)
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
              <Button onClick={handlePrint}>
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
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className={`grid w-full ${selectedTemplate === "custom" ? "grid-cols-2" : "grid-cols-1"}`}>
                <TabsTrigger value="basic">Información</TabsTrigger>
                {selectedTemplate === "custom" && (
                  <TabsTrigger value="customization">
                    <Palette className="w-4 h-4 mr-2" />
                    Personalizar
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
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
              </TabsContent>

              {selectedTemplate === "custom" && (
                <TabsContent value="customization" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Personalización</h3>

                    {/* Color Presets */}
                    <div className="mb-6">
                      <Label className="text-base font-medium">Combinaciones de Colores</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {colorPresets.map((preset) => (
                          <Button
                            key={preset.name}
                            variant="outline"
                            size="sm"
                            onClick={() => applyColorPreset(preset)}
                            className="justify-start"
                          >
                            <div className="flex items-center space-x-2">
                              <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.header }} />
                              <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.accent }} />
                              <span className="text-xs">{preset.name}</span>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Colors */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <Label htmlFor="headerColor">Color de Cabecera</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="headerColor"
                            type="color"
                            value={coverLetterData.customization.headerColor}
                            onChange={(e) => updateCustomization("headerColor", e.target.value)}
                            className="w-16 h-10"
                          />
                          <Input
                            value={coverLetterData.customization.headerColor}
                            onChange={(e) => updateCustomization("headerColor", e.target.value)}
                            placeholder="#1e293b"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="accentColor">Color de Acento</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="accentColor"
                            type="color"
                            value={coverLetterData.customization.accentColor}
                            onChange={(e) => updateCustomization("accentColor", e.target.value)}
                            className="w-16 h-10"
                          />
                          <Input
                            value={coverLetterData.customization.accentColor}
                            onChange={(e) => updateCustomization("accentColor", e.target.value)}
                            placeholder="#3b82f6"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Font Selection */}
                    <div className="mb-6">
                      <Label>Fuente</Label>
                      <Select
                        value={coverLetterData.customization.fontFamily}
                        onValueChange={(value) => updateCustomization("fontFamily", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fontOptions.map((font) => (
                            <SelectItem key={font.value} value={font.value}>
                              {font.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Header Style */}
                    <div className="mb-6">
                      <Label>Estilo de Cabecera</Label>
                      <Select
                        value={coverLetterData.customization.headerStyle}
                        onValueChange={(value) => updateCustomization("headerStyle", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="solid">Sólido</SelectItem>
                          <SelectItem value="gradient">Gradiente</SelectItem>
                          <SelectItem value="pattern">Patrón</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Section Spacing */}
                    <div className="mb-6">
                      <Label>Espaciado de Secciones</Label>
                      <Select
                        value={coverLetterData.customization.sectionSpacing}
                        onValueChange={(value) => updateCustomization("sectionSpacing", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="compact">Compacto</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="spacious">Espacioso</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Border Radius */}
                    <div className="mb-6">
                      <Label>Redondez de Bordes: {coverLetterData.customization.borderRadius}px</Label>
                      <Slider
                        value={[coverLetterData.customization.borderRadius]}
                        onValueChange={(value) => updateCustomization("borderRadius", value[0])}
                        max={20}
                        min={0}
                        step={1}
                        className="mt-2"
                      />
                    </div>

                    {/* Show Icons */}
                    <div className="flex items-center justify-between">
                      <Label>Mostrar Iconos</Label>
                      <Switch
                        checked={coverLetterData.customization.showIcons}
                        onCheckedChange={(checked) => updateCustomization("showIcons", checked)}
                      />
                    </div>
                  </div>
                </TabsContent>
              )}
            </Tabs>
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
