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
import { Download, Eye, Palette, X } from "lucide-react"
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

  const updateCustomization = (field: keyof typeof coverLetterData.customization, value: unknown) => {
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

  const tabItems = [
    { id: "basic", label: "Información", shortLabel: "Info" },
    ...(selectedTemplate === "custom" ? [{ id: "customization", label: "Personalizar", shortLabel: "Style" }] : []),
  ]

  if (showPreview) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="sticky top-0 z-40 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-3 sm:py-4">
              <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold">Vista Previa de la Carta</h1>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowPreview(false)}
                  variant="outline"
                  size="sm"
                  className="text-xs sm:text-sm"
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Volver a Editar</span>
                  <span className="sm:hidden">Editar</span>
                </Button>
                <Button onClick={handlePrint} size="sm" className="text-xs sm:text-sm">
                  <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Descargar PDF</span>
                  <span className="sm:hidden">PDF</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto p-4 sm:p-6">
          <CoverLetterTemplate template={selectedTemplate} data={coverLetterData} />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Mobile Template Selector */}
      <div className="lg:hidden">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Plantilla Seleccionada</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {coverLetterTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors text-center ${
                    selectedTemplate === template.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <h3 className="font-semibold text-sm">{template.name}</h3>
                  <p className="text-xs text-gray-600 mt-1">{template.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Form Section */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg sm:text-xl">Carta de Presentación</CardTitle>
                <Button onClick={() => setShowPreview(true)} className="lg:hidden" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Vista Previa
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Mobile Tabs */}
              <div className="sm:hidden mb-4">
                <div className="flex overflow-x-auto space-x-1 pb-2">
                  {tabItems.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-shrink-0 px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                        activeTab === tab.id ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {tab.shortLabel}
                    </button>
                  ))}
                </div>
              </div>

              {/* Desktop/Tablet Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="hidden sm:block">
                <TabsList
                  className={`grid w-full ${selectedTemplate === "custom" ? "grid-cols-2" : "grid-cols-1"} h-auto`}
                >
                  {tabItems.map((tab) => (
                    <TabsTrigger key={tab.id} value={tab.id} className="text-xs sm:text-sm py-2 px-1 sm:px-3">
                      {tab.id === "customization" ? <Palette className="w-4 h-4 sm:mr-2" /> : null}
                      
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden">{tab.shortLabel}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="basic" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="block mb-2">Tu Nombre Completo</Label>
                      <Input
                        id="fullName"
                        value={coverLetterData.fullName}
                        onChange={(e) => updateField("fullName", e.target.value)}
                        placeholder="Juan Pérez"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position" className="block mb-2">Puesto al que Aplicas</Label>
                      <Input
                        id="position"
                        value={coverLetterData.position}
                        onChange={(e) => updateField("position", e.target.value)}
                        placeholder="Desarrollador Frontend"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="block mb-2">Empresa</Label>
                      <Input
                        id="company"
                        value={coverLetterData.company}
                        onChange={(e) => updateField("company", e.target.value)}
                        placeholder="Nombre de la Empresa"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hiringManager" className="block mb-2">Responsable de Contratación</Label>
                      <Input
                        id="hiringManager"
                        value={coverLetterData.hiringManager}
                        onChange={(e) => updateField("hiringManager", e.target.value)}
                        placeholder="Nombre del Responsable (opcional)"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="block mb-2">Tu Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={coverLetterData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="tu@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="block mb-2">Tu Teléfono</Label>
                      <Input
                        id="phone"
                        value={coverLetterData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date" className="block mb-2">Fecha</Label>
                      <Input
                        id="date"
                        type="date"
                        value={coverLetterData.date}
                        onChange={(e) => updateField("date", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city" className="block mb-2">Ciudad</Label>
                      <Input
                        id="city"
                        value={coverLetterData.city}
                        onChange={(e) => updateField("city", e.target.value)}
                        placeholder="Ciudad, País"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="greeting" className="block mb-2">Saludo</Label>
                    <Input
                      id="greeting"
                      value={coverLetterData.greeting}
                      onChange={(e) => updateField("greeting", e.target.value)}
                      placeholder="Estimado/a Sr./Sra. [Apellido]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="introduction" className="block mb-2">Introducción</Label>
                    <Textarea
                      id="introduction"
                      value={coverLetterData.introduction}
                      onChange={(e) => updateField("introduction", e.target.value)}
                      placeholder="Párrafo de introducción explicando tu interés en el puesto..."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="body" className="block mb-2">Cuerpo Principal</Label>
                    <Textarea
                      id="body"
                      value={coverLetterData.body}
                      onChange={(e) => updateField("body", e.target.value)}
                      placeholder="Detalla tu experiencia relevante y por qué eres un buen candidato..."
                      rows={6}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="closing" className="block mb-2">Cierre</Label>
                    <Textarea
                      id="closing"
                      value={coverLetterData.closing}
                      onChange={(e) => updateField("closing", e.target.value)}
                      placeholder="Párrafo de cierre agradeciendo la consideración y expresando interés en una entrevista..."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signature" className="block mb-2">Firma</Label>
                    <Input
                      id="signature"
                      value={coverLetterData.signature}
                      onChange={(e) => updateField("signature", e.target.value)}
                      placeholder="Atentamente,"
                    />
                  </div>
                </TabsContent>
                {selectedTemplate === "custom" && (
                  <TabsContent value="customization" className="space-y-6 mt-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-4">Personalización</h3>
                      {/* Color Presets */}
                      <div className="mb-6">
                        <Label className="text-base font-medium">Combinaciones de Colores</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                          {colorPresets.map((preset) => (
                            <Button
                              key={preset.name}
                              variant="outline"
                              size="sm"
                              onClick={() => applyColorPreset(preset)}
                              className="justify-start h-auto py-2"
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div>
                          <Label htmlFor="headerColor" className="mb-2">Color de Cabecera</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              id="headerColor"
                              type="color"
                              value={coverLetterData.customization.headerColor}
                              onChange={(e) => updateCustomization("headerColor", e.target.value)}
                              className="w-12 h-10 flex-shrink-0"
                            />
                            <Input
                              value={coverLetterData.customization.headerColor}
                              onChange={(e) => updateCustomization("headerColor", e.target.value)}
                              placeholder="#1e293b"
                              className="flex-1"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="accentColor" className="mb-2">Color de Acento</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              id="accentColor"
                              type="color"
                              value={coverLetterData.customization.accentColor}
                              onChange={(e) => updateCustomization("accentColor", e.target.value)}
                              className="w-12 h-10 flex-shrink-0"
                            />
                            <Input
                              value={coverLetterData.customization.accentColor}
                              onChange={(e) => updateCustomization("accentColor", e.target.value)}
                              placeholder="#3b82f6"
                              className="flex-1"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Font Selection */}
                      <div className="mb-6">
                        <Label className="mb-2">Fuente</Label>
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

              {/* Mobile Tab Content */}
              <div className="sm:hidden">
                {activeTab === "basic" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="block mb-2">Tu Nombre Completo</Label>
                      <Input
                        id="fullName"
                        value={coverLetterData.fullName}
                        onChange={(e) => updateField("fullName", e.target.value)}
                        placeholder="Juan Pérez"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position" className="block mb-2">Puesto al que Aplicas</Label>
                      <Input
                        id="position"
                        value={coverLetterData.position}
                        onChange={(e) => updateField("position", e.target.value)}
                        placeholder="Desarrollador Frontend"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="block mb-2">Empresa</Label>
                      <Input
                        id="company"
                        value={coverLetterData.company}
                        onChange={(e) => updateField("company", e.target.value)}
                        placeholder="Nombre de la Empresa"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hiringManager" className="block mb-2">Responsable de Contratación</Label>
                      <Input
                        id="hiringManager"
                        value={coverLetterData.hiringManager}
                        onChange={(e) => updateField("hiringManager", e.target.value)}
                        placeholder="Nombre del Responsable (opcional)"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="block mb-2">Tu Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={coverLetterData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="tu@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="block mb-2">Tu Teléfono</Label>
                      <Input
                        id="phone"
                        value={coverLetterData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date" className="block mb-2">Fecha</Label>
                      <Input
                        id="date"
                        type="date"
                        value={coverLetterData.date}
                        onChange={(e) => updateField("date", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city" className="block mb-2">Ciudad</Label>
                      <Input
                        id="city"
                        value={coverLetterData.city}
                        onChange={(e) => updateField("city", e.target.value)}
                        placeholder="Ciudad, País"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="greeting" className="block mb-2">Saludo</Label>
                      <Input
                        id="greeting"
                        value={coverLetterData.greeting}
                        onChange={(e) => updateField("greeting", e.target.value)}
                        placeholder="Estimado/a Sr./Sra. [Apellido]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="introduction" className="block mb-2">Introducción</Label>
                      <Textarea
                        id="introduction"
                        value={coverLetterData.introduction}
                        onChange={(e) => updateField("introduction", e.target.value)}
                        placeholder="Párrafo de introducción explicando tu interés en el puesto..."
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="body" className="block mb-2">Cuerpo Principal</Label>
                      <Textarea
                        id="body"
                        value={coverLetterData.body}
                        onChange={(e) => updateField("body", e.target.value)}
                        placeholder="Detalla tu experiencia relevante y por qué eres un buen candidato..."
                        rows={6}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="closing" className="block mb-2">Cierre</Label>
                      <Textarea
                        id="closing"
                        value={coverLetterData.closing}
                        onChange={(e) => updateField("closing", e.target.value)}
                        placeholder="Párrafo de cierre agradeciendo la consideración y expresando interés en una entrevista..."
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signature" className="block mb-2">Firma</Label>
                      <Input
                        id="signature"
                        value={coverLetterData.signature}
                        onChange={(e) => updateField("signature", e.target.value)}
                        placeholder="Atentamente,"
                      />
                    </div>
                  </div>
                )}
                {activeTab === "customization" && selectedTemplate === "custom" && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Personalización</h3>
                    <div>
                      <Label className="text-base font-medium mb-3 block">Combinaciones de Colores</Label>
                      <div className="grid grid-cols-1 gap-2">
                        {colorPresets.map((preset) => (
                          <Button
                            key={preset.name}
                            variant="outline"
                            size="sm"
                            onClick={() => applyColorPreset(preset)}
                            className="justify-start h-auto py-3"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.header }} />
                              <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.accent }} />
                              <span className="text-sm">{preset.name}</span>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="headerColor" className="mb-2">Color de Cabecera</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="headerColor"
                            type="color"
                            value={coverLetterData.customization.headerColor}
                            onChange={(e) => updateCustomization("headerColor", e.target.value)}
                            className="w-12 h-10 flex-shrink-0"
                          />
                          <Input
                            value={coverLetterData.customization.headerColor}
                            onChange={(e) => updateCustomization("headerColor", e.target.value)}
                            placeholder="#1e293b"
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="accentColor"className="mb-2">Color de Acento</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="accentColor"
                            type="color"
                            value={coverLetterData.customization.accentColor}
                            onChange={(e) => updateCustomization("accentColor", e.target.value)}
                            className="w-12 h-10 flex-shrink-0"
                          />
                          <Input
                            value={coverLetterData.customization.accentColor}
                            onChange={(e) => updateCustomization("accentColor", e.target.value)}
                            placeholder="#3b82f6"
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label className="mb-2">Fuente</Label>
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
                      <div>
                        <Label className="mb-2">Estilo de Cabecera</Label>
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
                      <div>
                        <Label className="mb-2">Espaciado de Secciones</Label>
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
                      <div>
                        <Label className="mb-2">Redondez de Bordes: {coverLetterData.customization.borderRadius}px</Label>
                        <Slider
                          value={[coverLetterData.customization.borderRadius]}
                          onValueChange={(value) => updateCustomization("borderRadius", value[0])}
                          max={20}
                          min={0}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Mostrar Iconos</Label>
                        <Switch
                          checked={coverLetterData.customization.showIcons}
                          onCheckedChange={(checked) => updateCustomization("showIcons", checked)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Desktop Template Selector */}
        <div className="hidden lg:block">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Plantillas</CardTitle>
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
    </div>
  )
}