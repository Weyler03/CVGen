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
import { Plus, Trash2, Download, Eye, Palette, Layout } from "lucide-react"
import { type CVData, initialCVData, templates, fontOptions, colorPresets, layoutOptions } from "@/lib/cv-data"
import CVTemplate from "@/components/cv-template"
import { printCV } from "@/components/print-utils"

export default function CVGenerator() {
  const [cvData, setCvData] = useState<CVData>(initialCVData)
  const [selectedTemplate, setSelectedTemplate] = useState("modern")
  const [activeTab, setActiveTab] = useState("personal")
  const [showPreview, setShowPreview] = useState(false)

  const updatePersonalInfo = (field: keyof typeof cvData.personalInfo, value: string) => {
    setCvData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }))
  }

  const updateCustomization = (field: keyof typeof cvData.customization, value: any) => {
    setCvData((prev) => ({
      ...prev,
      customization: { ...prev.customization, [field]: value },
    }))
  }

  const applyColorPreset = (preset: (typeof colorPresets)[0]) => {
    setCvData((prev) => ({
      ...prev,
      customization: {
        ...prev.customization,
        headerColor: preset.header,
        accentColor: preset.accent,
      },
    }))
  }

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    }
    setCvData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }))
  }

  const updateExperience = (id: string, field: string, value: string | boolean) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }))
  }

  const removeExperience = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }))
  }

  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: "",
    }
    setCvData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }))
  }

  const updateEducation = (id: string, field: string, value: string) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }))
  }

  const removeEducation = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }))
  }

  const addSkill = () => {
    const newSkill = {
      id: Date.now().toString(),
      name: "",
      level: "Intermedio",
    }
    setCvData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }))
  }

  const updateSkill = (id: string, field: string, value: string) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) => (skill.id === id ? { ...skill, [field]: value } : skill)),
    }))
  }

  const removeSkill = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }))
  }

  const handlePrint = () => {
    printCV(selectedTemplate, cvData)
  }

  if (showPreview) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Vista Previa del CV</h1>
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
          <CVTemplate template={selectedTemplate} data={cvData} />
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
            <CardTitle>Información del CV</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="experience">Experiencia</TabsTrigger>
                <TabsTrigger value="education">Educación</TabsTrigger>
                <TabsTrigger value="skills">Habilidades</TabsTrigger>
                {selectedTemplate === "custom" && (
                  <TabsTrigger value="customization">
                    <Palette className="w-4 h-4" />
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="personal" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Nombre Completo</Label>
                    <Input
                      id="fullName"
                      value={cvData.personalInfo.fullName}
                      onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                      placeholder="Juan Pérez"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={cvData.personalInfo.email}
                      onChange={(e) => updatePersonalInfo("email", e.target.value)}
                      placeholder="juan@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      value={cvData.personalInfo.phone}
                      onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Dirección</Label>
                    <Input
                      id="address"
                      value={cvData.personalInfo.address}
                      onChange={(e) => updatePersonalInfo("address", e.target.value)}
                      placeholder="Ciudad, País"
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={cvData.personalInfo.linkedin}
                      onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                      placeholder="linkedin.com/in/usuario"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Sitio Web</Label>
                    <Input
                      id="website"
                      value={cvData.personalInfo.website}
                      onChange={(e) => updatePersonalInfo("website", e.target.value)}
                      placeholder="www.miweb.com"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="summary">Resumen Profesional</Label>
                  <Textarea
                    id="summary"
                    value={cvData.personalInfo.summary}
                    onChange={(e) => updatePersonalInfo("summary", e.target.value)}
                    placeholder="Breve descripción de tu perfil profesional..."
                    rows={4}
                  />
                </div>
              </TabsContent>

              <TabsContent value="experience" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Experiencia Laboral</h3>
                  <Button onClick={addExperience} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar
                  </Button>
                </div>
                {cvData.experience.map((exp) => (
                  <Card key={exp.id}>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label>Empresa</Label>
                          <Input
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                            placeholder="Nombre de la empresa"
                          />
                        </div>
                        <div>
                          <Label>Cargo</Label>
                          <Input
                            value={exp.position}
                            onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                            placeholder="Tu posición"
                          />
                        </div>
                        <div>
                          <Label>Fecha de Inicio</Label>
                          <Input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Fecha de Fin</Label>
                          <Input
                            type="month"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                            disabled={exp.current}
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <Label>Descripción</Label>
                        <Textarea
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                          placeholder="Describe tus responsabilidades y logros..."
                          rows={3}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={exp.current}
                            onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                          />
                          <span>Trabajo actual</span>
                        </label>
                        <Button onClick={() => removeExperience(exp.id)} variant="destructive" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="education" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Educación</h3>
                  <Button onClick={addEducation} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar
                  </Button>
                </div>
                {cvData.education.map((edu) => (
                  <Card key={edu.id}>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label>Institución</Label>
                          <Input
                            value={edu.institution}
                            onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                            placeholder="Universidad o instituto"
                          />
                        </div>
                        <div>
                          <Label>Título</Label>
                          <Input
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                            placeholder="Licenciatura, Maestría, etc."
                          />
                        </div>
                        <div>
                          <Label>Campo de Estudio</Label>
                          <Input
                            value={edu.field}
                            onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                            placeholder="Ingeniería, Administración, etc."
                          />
                        </div>
                        <div>
                          <Label>Promedio (opcional)</Label>
                          <Input
                            value={edu.gpa || ""}
                            onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                            placeholder="9.5, 4.0, etc."
                          />
                        </div>
                        <div>
                          <Label>Fecha de Inicio</Label>
                          <Input
                            type="month"
                            value={edu.startDate}
                            onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Fecha de Graduación</Label>
                          <Input
                            type="month"
                            value={edu.endDate}
                            onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button onClick={() => removeEducation(edu.id)} variant="destructive" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="skills" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Habilidades</h3>
                  <Button onClick={addSkill} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar
                  </Button>
                </div>
                {cvData.skills.map((skill) => (
                  <Card key={skill.id}>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Habilidad</Label>
                          <Input
                            value={skill.name}
                            onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                            placeholder="JavaScript, Photoshop, etc."
                          />
                        </div>
                        <div>
                          <Label>Nivel</Label>
                          <Select value={skill.level} onValueChange={(value) => updateSkill(skill.id, "level", value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Básico">Básico</SelectItem>
                              <SelectItem value="Intermedio">Intermedio</SelectItem>
                              <SelectItem value="Avanzado">Avanzado</SelectItem>
                              <SelectItem value="Experto">Experto</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button onClick={() => removeSkill(skill.id)} variant="destructive" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {selectedTemplate === "custom" && (
                <TabsContent value="customization" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Personalización</h3>

                    {/* Layout Selection */}
                    <div className="mb-6">
                      <Label className="text-base font-medium mb-3 block">
                        <Layout className="w-4 h-4 inline mr-2" />
                        Diseño del CV
                      </Label>
                      <div className="grid grid-cols-1 gap-3">
                        {layoutOptions.map((layout) => (
                          <div
                            key={layout.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                              cvData.customization.layout === layout.id
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => updateCustomization("layout", layout.id)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold">{layout.name}</h4>
                                <p className="text-sm text-gray-600 mb-2">{layout.description}</p>
                                <p className="text-xs text-gray-500 italic">{layout.preview}</p>
                              </div>
                              <div
                                className={`w-4 h-4 rounded-full border-2 ${
                                  cvData.customization.layout === layout.id
                                    ? "border-blue-500 bg-blue-500"
                                    : "border-gray-300"
                                }`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

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
                            value={cvData.customization.headerColor}
                            onChange={(e) => updateCustomization("headerColor", e.target.value)}
                            className="w-16 h-10"
                          />
                          <Input
                            value={cvData.customization.headerColor}
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
                            value={cvData.customization.accentColor}
                            onChange={(e) => updateCustomization("accentColor", e.target.value)}
                            className="w-16 h-10"
                          />
                          <Input
                            value={cvData.customization.accentColor}
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
                        value={cvData.customization.fontFamily}
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

                    {/* Skills Display Options */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <Label>Mostrar Barras de Habilidades</Label>
                        <Switch
                          checked={cvData.customization.showSkillBars}
                          onCheckedChange={(checked) => updateCustomization("showSkillBars", checked)}
                        />
                      </div>

                      {cvData.customization.showSkillBars && (
                        <div>
                          <Label>Estilo de Habilidades</Label>
                          <Select
                            value={cvData.customization.skillBarStyle}
                            onValueChange={(value) => updateCustomization("skillBarStyle", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bars">Barras</SelectItem>
                              <SelectItem value="circles">Círculos</SelectItem>
                              <SelectItem value="dots">Puntos</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>

                    {/* Header Style */}
                    <div className="mb-6">
                      <Label>Estilo de Cabecera</Label>
                      <Select
                        value={cvData.customization.headerStyle}
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
                        value={cvData.customization.sectionSpacing}
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
                      <Label>Redondez de Bordes: {cvData.customization.borderRadius}px</Label>
                      <Slider
                        value={[cvData.customization.borderRadius]}
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
                        checked={cvData.customization.showIcons}
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
            {templates.map((template) => (
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
