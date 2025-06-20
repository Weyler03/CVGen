"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Download, Eye } from "lucide-react"
import { type JobProposalData, initialJobProposalData, proposalTemplates } from "@/lib/job-proposal-data"
import JobProposalTemplate from "./job-proposal-tamplate"

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
              <Button onClick={() => window.print()}>
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
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Información Básica</TabsTrigger>
                <TabsTrigger value="scope">Alcance del Proyecto</TabsTrigger>
                <TabsTrigger value="deliverables">Entregables</TabsTrigger>
                <TabsTrigger value="timeline">Cronograma y Precio</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="yourName">Tu Nombre/Empresa</Label>
                    <Input
                      id="yourName"
                      value={proposalData.basicInfo.yourName}
                      onChange={(e) => updateBasicInfo("yourName", e.target.value)}
                      placeholder="Tu nombre o nombre de tu empresa"
                    />
                  </div>
                  <div>
                    <Label htmlFor="clientName">Nombre del Cliente</Label>
                    <Input
                      id="clientName"
                      value={proposalData.basicInfo.clientName}
                      onChange={(e) => updateBasicInfo("clientName", e.target.value)}
                      placeholder="Nombre del cliente o empresa"
                    />
                  </div>
                  <div>
                    <Label htmlFor="projectTitle">Título del Proyecto</Label>
                    <Input
                      id="projectTitle"
                      value={proposalData.basicInfo.projectTitle}
                      onChange={(e) => updateBasicInfo("projectTitle", e.target.value)}
                      placeholder="Ej: Desarrollo de Sitio Web E-commerce"
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Fecha</Label>
                    <Input
                      id="date"
                      type="date"
                      value={proposalData.basicInfo.date}
                      onChange={(e) => updateBasicInfo("date", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="introduction">Introducción</Label>
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
                  <Label htmlFor="description">Descripción del Proyecto</Label>
                  <Textarea
                    id="description"
                    value={proposalData.projectScope.description}
                    onChange={(e) => updateProjectScope("description", e.target.value)}
                    placeholder="Descripción detallada del proyecto..."
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="objectives">Objetivos</Label>
                  <Textarea
                    id="objectives"
                    value={proposalData.projectScope.objectives}
                    onChange={(e) => updateProjectScope("objectives", e.target.value)}
                    placeholder="Objetivos principales del proyecto..."
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="requirements">Requisitos</Label>
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
                          <Label>Nombre del Entregable</Label>
                          <Input
                            value={deliverable.name}
                            onChange={(e) => updateDeliverable(deliverable.id, "name", e.target.value)}
                            placeholder="Ej: Diseño de Interfaz de Usuario"
                          />
                        </div>
                        <div>
                          <Label>Descripción</Label>
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
                          <Label>Nombre del Hito</Label>
                          <Input
                            value={milestone.name}
                            onChange={(e) => updateMilestone(milestone.id, "name", e.target.value)}
                            placeholder="Ej: Fase de Diseño"
                          />
                        </div>
                        <div>
                          <Label>Fecha Límite</Label>
                          <Input
                            type="date"
                            value={milestone.deadline}
                            onChange={(e) => updateMilestone(milestone.id, "deadline", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Pago</Label>
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
                      <Label htmlFor="totalPrice">Precio Total</Label>
                      <Input
                        id="totalPrice"
                        value={proposalData.pricing.totalPrice}
                        onChange={(e) => updatePricing("totalPrice", e.target.value)}
                        placeholder="Ej: $5,000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="paymentTerms">Términos de Pago</Label>
                      <Input
                        id="paymentTerms"
                        value={proposalData.pricing.paymentTerms}
                        onChange={(e) => updatePricing("paymentTerms", e.target.value)}
                        placeholder="Ej: 50% adelantado, 50% al finalizar"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="additionalNotes">Notas Adicionales</Label>
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
