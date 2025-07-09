"use client"

import type React from "react"
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
import { Plus, Trash2, Download, Eye, Palette } from "lucide-react"
import { type JobProposalData, initialJobProposalData, proposalTemplates } from "@/lib/job-proposal-data"
import { fontOptions, colorPresets } from "@/lib/cv-data"
import JobProposalTemplate from "@/components/job-proposal-template"
import { printJobProposal } from "@/components/print-utils"

export default function JobProposalGenerator() {
  const [proposalData, setProposalData] = useState<JobProposalData>(initialJobProposalData)
  const [selectedTemplate, setSelectedTemplate] = useState("standard")
  const [activeTab, setActiveTab] = useState("basic")
  const [showPreview, setShowPreview] = useState(false)

  const updateBasicInfo = (field: keyof typeof proposalData.basicInfo, value: string) => {
    setProposalData((prev) => ({
      ...prev,
      basicInfo: { ...prev.basicInfo, [field]: value },
    }))
  }

  const updateCustomization = (field: keyof typeof proposalData.customization, value: any) => {
    setProposalData((prev) => ({
      ...prev,
      customization: { ...prev.customization, [field]: value },
    }))
  }

  const applyColorPreset = (preset: (typeof colorPresets)[0]) => {
    setProposalData((prev) => ({
      ...prev,
      customization: {
        ...prev.customization,
        headerColor: preset.header,
        accentColor: preset.accent,
      },
    }))
  }

  const updateProjectScope = (field: keyof typeof proposalData.projectScope, value: string) => {
    setProposalData((prev) => ({
      ...prev,
      projectScope: { ...prev.projectScope, [field]: value },
    }))
  }

  const addDeliverable = () => {
    const newDeliverable = {
      id: Date.now().toString(),
      name: "",
      description: "",
    }
    setProposalData((prev) => ({
      ...prev,
      deliverables: [...prev.deliverables, newDeliverable],
    }))
  }

  const updateDeliverable = (id: string, field: string, value: string) => {
    setProposalData((prev) => ({
      ...prev,
      deliverables: prev.deliverables.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }))
  }

  const removeDeliverable = (id: string) => {
    setProposalData((prev) => ({
      ...prev,
      deliverables: prev.deliverables.filter((item) => item.id !== id),
    }))
  }

  const addMilestone = () => {
    const newMilestone = {
      id: Date.now().toString(),
      name: "",
      deadline: "",
      payment: "",
    }
    setProposalData((prev) => ({
      ...prev,
      timeline: [...prev.timeline, newMilestone],
    }))
  }

  const updateMilestone = (id: string, field: string, value: string) => {
    setProposalData((prev) => ({
      ...prev,
      timeline: prev.timeline.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }))
  }

  const removeMilestone = (id: string) => {
    setProposalData((prev) => ({
      ...prev,
      timeline: prev.timeline.filter((item) => item.id !== id),
    }))
  }

  const updatePricing = (field: keyof typeof proposalData.pricing, value: string) => {
    setProposalData((prev) => ({
      ...prev,
      pricing: { ...prev.pricing, [field]: value },
    }))
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        alert("El archivo es demasiado grande. El tamaño máximo es 2MB.")
        return
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        alert("Por favor selecciona un archivo de imagen válido.")
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        updateBasicInfo("logo", result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeLogo = () => {
    updateBasicInfo("logo", "")
  }

  const handlePrint = () => {
    printJobProposal(selectedTemplate, proposalData)
  }

  if (showPreview) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Vista Previa de la Propuesta</h1>
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
          <JobProposalTemplate template={selectedTemplate} data={proposalData} />
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
            <CardTitle>Propuesta de Empleo</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="basic">Información Básica</TabsTrigger>
                <TabsTrigger value="scope">Alcance del Proyecto</TabsTrigger>
                <TabsTrigger value="deliverables">Entregables</TabsTrigger>
                <TabsTrigger value="timeline">Cronograma y Precio</TabsTrigger>
                {selectedTemplate === "custom" && (
                  <TabsTrigger value="customization">
                    <Palette className="w-4 h-4" />
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="yourName"className="mb-2">Tu Nombre/Empresa</Label>
                    <Input
                      id="yourName"
                      value={proposalData.basicInfo.yourName}
                      onChange={(e) => updateBasicInfo("yourName", e.target.value)}
                      placeholder="Tu nombre o nombre de tu empresa"
                    />
                  </div>
                  <div>
                    <Label htmlFor="clientName"className="mb-2">Nombre del Cliente</Label>
                    <Input
                      id="clientName"
                      value={proposalData.basicInfo.clientName}
                      onChange={(e) => updateBasicInfo("clientName", e.target.value)}
                      placeholder="Nombre del cliente o empresa"
                    />
                  </div>
                  <div>
                    <Label htmlFor="projectTitle"className="mb-2">Título del Proyecto</Label>
                    <Input
                      id="projectTitle"
                      value={proposalData.basicInfo.projectTitle}
                      onChange={(e) => updateBasicInfo("projectTitle", e.target.value)}
                      placeholder="Ej: Desarrollo de Sitio Web E-commerce"
                    />
                  </div>
                  <div>
                    <Label htmlFor="date"className="mb-2">Fecha</Label>
                    <Input
                      id="date"
                      type="date"
                      value={proposalData.basicInfo.date}
                      onChange={(e) => updateBasicInfo("date", e.target.value)}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="logo"className="mb-2">Logo de la Empresa (opcional)</Label>
                    <div className="space-y-4">
                      <Input
                        id="logo"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="cursor-pointer"
                      />
                      {proposalData.basicInfo.logo && (
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <img
                              src={proposalData.basicInfo.logo || "/placeholder.svg"}
                              alt="Logo preview"
                              className="h-16 w-auto object-contain border rounded"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                              onClick={removeLogo}
                            >
                              ×
                            </Button>
                          </div>
                          <p className="text-sm text-gray-600">Logo cargado correctamente</p>
                        </div>
                      )}
                      <p className="text-xs text-gray-500">Formatos soportados: JPG, PNG, GIF. Tamaño máximo: 2MB</p>
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="introduction"className="mb-2">Introducción</Label>
                  <Textarea
                    id="introduction"
                    value={proposalData.basicInfo.introduction}
                    onChange={(e) => updateBasicInfo("introduction", e.target.value)}
                    placeholder="Breve introducción sobre la propuesta..."
                    rows={4}
                  />
                </div>
              </TabsContent>

              <TabsContent value="scope" className="space-y-4">
                <div>
                  <Label htmlFor="description"className="mb-2">Descripción del Proyecto</Label>
                  <Textarea
                    id="description"
                    value={proposalData.projectScope.description}
                    onChange={(e) => updateProjectScope("description", e.target.value)}
                    placeholder="Descripción detallada del proyecto..."
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="objectives"className="mb-2">Objetivos</Label>
                  <Textarea
                    id="objectives"
                    value={proposalData.projectScope.objectives}
                    onChange={(e) => updateProjectScope("objectives", e.target.value)}
                    placeholder="Objetivos principales del proyecto..."
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="requirements"className="mb-2">Requisitos</Label>
                  <Textarea
                    id="requirements"
                    value={proposalData.projectScope.requirements}
                    onChange={(e) => updateProjectScope("requirements", e.target.value)}
                    placeholder="Requisitos técnicos o funcionales..."
                    rows={4}
                  />
                </div>
              </TabsContent>

              <TabsContent value="deliverables" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Entregables</h3>
                  <Button onClick={addDeliverable} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar
                  </Button>
                </div>
                {proposalData.deliverables.map((deliverable) => (
                  <Card key={deliverable.id}>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <Label className="mb-2">Nombre del Entregable</Label>
                          <Input
                            value={deliverable.name}
                            onChange={(e) => updateDeliverable(deliverable.id, "name", e.target.value)}
                            placeholder="Ej: Diseño de Interfaz de Usuario"
                          />
                        </div>
                        <div>
                          <Label className="mb-2">Descripción</Label>
                          <Textarea
                            value={deliverable.description}
                            onChange={(e) => updateDeliverable(deliverable.id, "description", e.target.value)}
                            placeholder="Descripción detallada del entregable..."
                            rows={3}
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button onClick={() => removeDeliverable(deliverable.id)} variant="destructive" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="timeline" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Cronograma</h3>
                  <Button onClick={addMilestone} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Hito
                  </Button>
                </div>
                {proposalData.timeline.map((milestone) => (
                  <Card key={milestone.id}>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label className="mb-2">Nombre del Hito</Label>
                          <Input
                            value={milestone.name}
                            onChange={(e) => updateMilestone(milestone.id, "name", e.target.value)}
                            placeholder="Ej: Fase de Diseño"
                          />
                        </div>
                        <div>
                          <Label className="mb-2">Fecha Límite</Label>
                          <Input
                            type="date"
                            value={milestone.deadline}
                            onChange={(e) => updateMilestone(milestone.id, "deadline", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label className="mb-2">Pago</Label>
                          <Input
                            value={milestone.payment}
                            onChange={(e) => updateMilestone(milestone.id, "payment", e.target.value)}
                            placeholder="Ej: $1,000"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button onClick={() => removeMilestone(milestone.id)} variant="destructive" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Precios</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="totalPrice"className="mb-2">Precio Total</Label>
                      <Input
                        id="totalPrice"
                        value={proposalData.pricing.totalPrice}
                        onChange={(e) => updatePricing("totalPrice", e.target.value)}
                        placeholder="Ej: $5,000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="paymentTerms"className="mb-2">Términos de Pago</Label>
                      <Input
                        id="paymentTerms"
                        value={proposalData.pricing.paymentTerms}
                        onChange={(e) => updatePricing("paymentTerms", e.target.value)}
                        placeholder="Ej: 50% adelantado, 50% al finalizar"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="additionalNotes"className="mb-2">Notas Adicionales</Label>
                    <Textarea
                      id="additionalNotes"
                      value={proposalData.pricing.additionalNotes}
                      onChange={(e) => updatePricing("additionalNotes", e.target.value)}
                      placeholder="Cualquier nota adicional sobre precios o pagos..."
                      rows={3}
                    />
                  </div>
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
                            value={proposalData.customization.headerColor}
                            onChange={(e) => updateCustomization("headerColor", e.target.value)}
                            className="w-16 h-10"
                          />
                          <Input
                            value={proposalData.customization.headerColor}
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
                            value={proposalData.customization.accentColor}
                            onChange={(e) => updateCustomization("accentColor", e.target.value)}
                            className="w-16 h-10"
                          />
                          <Input
                            value={proposalData.customization.accentColor}
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
                        value={proposalData.customization.fontFamily}
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
                        value={proposalData.customization.headerStyle}
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

                    {/* Logo Position */}
                    <div className="mb-6">
                      <Label>Posición del Logo</Label>
                      <Select
                        value={proposalData.customization.logoPosition}
                        onValueChange={(value) => updateCustomization("logoPosition", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">Izquierda</SelectItem>
                          <SelectItem value="center">Centro</SelectItem>
                          <SelectItem value="right">Derecha</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Section Spacing */}
                    <div className="mb-6">
                      <Label>Espaciado de Secciones</Label>
                      <Select
                        value={proposalData.customization.sectionSpacing}
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
                      <Label>Redondez de Bordes: {proposalData.customization.borderRadius}px</Label>
                      <Slider
                        value={[proposalData.customization.borderRadius]}
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
                        checked={proposalData.customization.showIcons}
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
            {proposalTemplates.map((template) => (
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
