"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Plus,
  Trash2,
  Download,
  Upload,
  Eye,
  Palette,
  Type,
  Layout,
  Settings,
  User,
  Briefcase,
  GraduationCap,
  Award,
  ImageIcon,
} from "lucide-react"
import CVTemplate from "./cv-template"
import { printCV } from "./print-utils"
import { initialCVData, cvTemplates, layoutOptions, fontOptions, colorPresets, type CVData } from "@/lib/cv-data"
import Image from "next/image"

export default function CVGenerator() {
  const [cvData, setCVData] = useState<CVData>(initialCVData)
  const [selectedTemplate, setSelectedTemplate] = useState("modern")
  const [activeTab, setActiveTab] = useState("basic")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const updateBasicInfo = (field: string, value: string) => {
    setCVData((prev) => ({
      ...prev,
      basicInfo: { ...prev.basicInfo, [field]: value },
    }))
  }

  const updateCustomization = (field: string, value: unknown) => {
    setCVData((prev) => ({
      ...prev,
      customization: { ...prev.customization, [field]: value },
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
    }
    setCVData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }))
  }

  const updateExperience = (id: string, field: string, value: string) => {
    setCVData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }))
  }

  const removeExperience = (id: string) => {
    setCVData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }))
  }

  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
      description: "",
    }
    setCVData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }))
  }

  const updateEducation = (id: string, field: string, value: string) => {
    setCVData((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }))
  }

  const removeEducation = (id: string) => {
    setCVData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }))
  }

  const addSkill = () => {
    const newSkill = {
      id: Date.now().toString(),
      name: "",
      level: 50,
    }
    setCVData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }))
  }

  const updateSkill = (id: string, field: string, value: string | number) => {
    setCVData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) => (skill.id === id ? { ...skill, [field]: value } : skill)),
    }))
  }

  const removeSkill = (id: string) => {
    setCVData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }))
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        updateBasicInfo("photo", e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const applyColorPreset = (preset: (typeof colorPresets)[0]) => {
    updateCustomization("headerColor", preset.header)
    updateCustomization("accentColor", preset.accent)
  }

  const handlePrint = () => {
    printCV(selectedTemplate, cvData)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Generador de CV Profesional</h1>
          <p className="text-gray-600">Crea tu currículum perfecto con nuestras plantillas personalizables</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6">
            {/* Template Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layout className="w-5 h-5" />
                  Seleccionar Plantilla
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {cvTemplates.map((template) => (
                    <div
                      key={template.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
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
                </div>
              </CardContent>
            </Card>

            {/* Layout Selection */}
            {selectedTemplate === "custom" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layout className="w-5 h-5" />
                    Diseño de Layout
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {layoutOptions.map((layout) => (
                      <div
                        key={layout.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          cvData.customization.layout === layout.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => updateCustomization("layout", layout.id)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{layout.name}</h3>
                          {cvData.customization.layout === layout.id && <Badge variant="default">Seleccionado</Badge>}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{layout.description}</p>
                        <p className="text-xs text-gray-500 font-mono">{layout.preview}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Form Tabs */}
            <Card>
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="basic" className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span className="hidden sm:inline">Básico</span>
                    </TabsTrigger>
                    <TabsTrigger value="experience" className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      <span className="hidden sm:inline">Experiencia</span>
                    </TabsTrigger>
                    <TabsTrigger value="education" className="flex items-center gap-1">
                      <GraduationCap className="w-4 h-4" />
                      <span className="hidden sm:inline">Educación</span>
                    </TabsTrigger>
                    <TabsTrigger value="skills" className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      <span className="hidden sm:inline">Habilidades</span>
                    </TabsTrigger>
                    <TabsTrigger value="design" className="flex items-center gap-1">
                      <Palette className="w-4 h-4" />
                      <span className="hidden sm:inline">Diseño</span>
                    </TabsTrigger>
                  </TabsList>

                  <div className="p-6">
                    <TabsContent value="basic" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="fullName" className="mb-2">Nombre Completo</Label>
                          <Input
                            id="fullName"
                            value={cvData.basicInfo.fullName}
                            onChange={(e) => updateBasicInfo("fullName", e.target.value)}
                            placeholder="Tu nombre completo"
                          />
                        </div>
                        <div>
                          <Label htmlFor="title" className="mb-2">Título Profesional</Label>
                          <Input
                            id="title"
                            value={cvData.basicInfo.title}
                            onChange={(e) => updateBasicInfo("title", e.target.value)}
                            placeholder="Ej: Desarrollador Full Stack"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="mb-2">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={cvData.basicInfo.email}
                            onChange={(e) => updateBasicInfo("email", e.target.value)}
                            placeholder="tu@email.com"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="mb-2">Teléfono</Label>
                          <Input
                            id="phone"
                            value={cvData.basicInfo.phone}
                            onChange={(e) => updateBasicInfo("phone", e.target.value)}
                            placeholder="+1 234 567 8900"
                          />
                        </div>
                        <div>
                          <Label htmlFor="location" className="mb-2">Ubicación</Label>
                          <Input
                            id="location"
                            value={cvData.basicInfo.location}
                            onChange={(e) => updateBasicInfo("location", e.target.value)}
                            placeholder="Ciudad, País"
                          />
                        </div>
                        <div>
                          <Label htmlFor="website" className="mb-2">Sitio Web</Label>
                          <Input
                            id="website"
                            value={cvData.basicInfo.website}
                            onChange={(e) => updateBasicInfo("website", e.target.value)}
                            placeholder="www.tusitio.com"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="photo" className="mb-2">Foto de Perfil</Label>
                        <div className="flex items-center gap-4 mt-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-2"
                          >
                            <ImageIcon className="w-4 h-4" />
                            Subir Foto
                          </Button>
                          {cvData.basicInfo.photo && (
                            <Image
                              src={cvData.basicInfo.photo || "/placeholder.svg"}
                              alt="Preview"
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          )}
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </div>

                      <div>
                        <Label htmlFor="summary" className="mb-2">Resumen Profesional</Label>
                        <Textarea
                          id="summary"
                          value={cvData.basicInfo.summary}
                          onChange={(e) => updateBasicInfo("summary", e.target.value)}
                          placeholder="Describe brevemente tu experiencia y objetivos profesionales..."
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

                      {cvData.experience.map((exp, index) => (
                        <Card key={exp.id}>
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-base">Experiencia {index + 1}</CardTitle>
                              <Button variant="ghost" size="sm" onClick={() => removeExperience(exp.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label className="mb-2">Empresa</Label>
                                <Input
                                  value={exp.company}
                                  onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                                  placeholder="Nombre de la empresa"
                                />
                              </div>
                              <div>
                                <Label className="mb-2">Cargo</Label>
                                <Input
                                  value={exp.position}
                                  onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                                  placeholder="Tu cargo"
                                />
                              </div>
                              <div>
                                <Label className="mb-2">Fecha de Inicio</Label>
                                <Input
                                  type="date"
                                  value={exp.startDate}
                                  onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                                  placeholder="Ej: Enero 2020"
                                />
                              </div>
                              <div>
                                <Label className="mb-2">Fecha de Fin</Label>
                                <Input
                                type="date"
                                  value={exp.endDate}
                                  onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                                  placeholder="Ej: Presente"
                                />
                              </div>
                            </div>
                            <div>
                              <Label className="mb-2">Descripción</Label>
                              <Textarea
                                value={exp.description}
                                onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                                placeholder="Describe tus responsabilidades y logros..."
                                rows={3}
                              />
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

                      {cvData.education.map((edu, index) => (
                        <Card key={edu.id}>
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-base">Educación {index + 1}</CardTitle>
                              <Button variant="ghost" size="sm" onClick={() => removeEducation(edu.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label className="mb-2">Institución</Label>
                                <Input
                                  value={edu.institution}
                                  onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                                  placeholder="Universidad o institución"
                                />
                              </div>
                              <div>
                                <Label className="mb-2">Título</Label>
                                <Input
                                  value={edu.degree}
                                  onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                                  placeholder="Título obtenido"
                                />
                              </div>
                              <div>
                                <Label className="mb-2">Fecha de Inicio</Label>
                                <Input
                                type="date"
                                  value={edu.startDate}
                                  onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                                  placeholder="Ej: 2016"
                                />
                              </div>
                              <div>
                                <Label className="mb-2">Fecha de Fin</Label>
                                <Input
                                type="date"
                                  value={edu.endDate}
                                  onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                                  placeholder="Ej: 2020"
                                />
                              </div>
                            </div>
                            <div>
                              <Label className="mb-2">Descripción</Label>
                              <Textarea
                                value={edu.description}
                                onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
                                placeholder="Menciones, proyectos destacados, etc."
                                rows={2}
                              />
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
                            <div className="flex items-center gap-4">
                              <div className="flex-1">
                                <Label className="mb-2">Habilidad</Label>
                                <Input
                                  value={skill.name}
                                  onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                                  placeholder="Ej: JavaScript, Photoshop, etc."
                                />
                              </div>
                              <div className="w-32">
                                <Label className="mb-2">Nivel ({skill.level}%)</Label>
                                <Slider
                                  value={[skill.level]}
                                  onValueChange={(value) => updateSkill(skill.id, "level", value[0])}
                                  max={100}
                                  step={5}
                                  className="mt-2"
                                />
                              </div>
                              <Button variant="ghost" size="sm" onClick={() => removeSkill(skill.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>

                    <TabsContent value="design" className="space-y-6">
                      {selectedTemplate === "custom" && (
                        <>
                          {/* Color Presets */}
                          <div>
                            <Label className="text-base font-semibold">Combinaciones de Colores</Label>
                            <div className="grid grid-cols-2 gap-3 mt-3">
                              {colorPresets.map((preset, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  className="h-auto p-3 justify-start bg-transparent overflow-auto"
                                  onClick={() => applyColorPreset(preset)}
                                  
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="flex gap-1">
                                      <div
                                        className="w-4 h-4 rounded-full"
                                        style={{ backgroundColor: preset.header }}
                                      />
                                      <div
                                        className="w-4 h-4 rounded-full"
                                        style={{ backgroundColor: preset.accent }}
                                      />
                                    </div>
                                    <span className="text-sm">{preset.name}</span>
                                  </div>
                                </Button>
                              ))}
                            </div>
                          </div>

                          <Separator />

                          {/* Custom Colors */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <Label htmlFor="headerColor">Color de Encabezado</Label>
                              <div className="flex items-center gap-2 mt-2">
                                <Input
                                  id="headerColor"
                                  type="color"
                                  value={cvData.customization.headerColor}
                                  onChange={(e) => updateCustomization("headerColor", e.target.value)}
                                  className="w-16 h-10 p-1 border rounded"
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
                              <div className="flex items-center gap-2 mt-2">
                                <Input
                                  id="accentColor"
                                  type="color"
                                  value={cvData.customization.accentColor}
                                  onChange={(e) => updateCustomization("accentColor", e.target.value)}
                                  className="w-16 h-10 p-1 border rounded"
                                />
                                <Input
                                  value={cvData.customization.accentColor}
                                  onChange={(e) => updateCustomization("accentColor", e.target.value)}
                                  placeholder="#3b82f6"
                                />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="textColor">Color de Texto</Label>
                              <div className="flex items-center gap-2 mt-2">
                                <Input
                                  id="textColor"
                                  type="color"
                                  value={cvData.customization.textColor}
                                  onChange={(e) => updateCustomization("textColor", e.target.value)}
                                  className="w-16 h-10 p-1 border rounded"
                                />
                                <Input
                                  value={cvData.customization.textColor}
                                  onChange={(e) => updateCustomization("textColor", e.target.value)}
                                  placeholder="#374151"
                                />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="backgroundColor">Color de Fondo</Label>
                              <div className="flex items-center gap-2 mt-2">
                                <Input
                                  id="backgroundColor"
                                  type="color"
                                  value={cvData.customization.backgroundColor}
                                  onChange={(e) => updateCustomization("backgroundColor", e.target.value)}
                                  className="w-16 h-10 p-1 border rounded"
                                />
                                <Input
                                  value={cvData.customization.backgroundColor}
                                  onChange={(e) => updateCustomization("backgroundColor", e.target.value)}
                                  placeholder="#ffffff"
                                />
                              </div>
                            </div>
                          </div>

                          <Separator />

                          {/* Typography */}
                          <div>
                            <Label className="text-base font-semibold flex items-center gap-2">
                              <Type className="w-4 h-4" />
                              Tipografía
                            </Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                              <div>
                                <Label htmlFor="fontFamily" className="mb-2">Fuente</Label>
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
                              <div>
                                <Label htmlFor="headerStyle" className="mb-2">Estilo de Encabezado</Label>
                                <Select
                                  value={cvData.customization.headerStyle}
                                  onValueChange={(value) => updateCustomization("headerStyle", value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="solid">Sólido</SelectItem>
                                    <SelectItem value="gradient">Degradado</SelectItem>
                                    <SelectItem value="pattern">Patrón</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>

                          <Separator />

                          {/* Layout Options */}
                          <div>
                            <Label className="text-base font-semibold flex items-center gap-2">
                              <Settings className="w-4 h-4" />
                              Opciones de Diseño
                            </Label>
                            <div className="space-y-4 mt-3">
                              <div>
                                <Label htmlFor="borderRadius">
                                  Radio de Bordes ({cvData.customization.borderRadius}px)
                                </Label>
                                <Slider
                                  value={[cvData.customization.borderRadius]}
                                  onValueChange={(value) => updateCustomization("borderRadius", value[0])}
                                  max={20}
                                  step={1}
                                  className="mt-2"
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <Label htmlFor="showIcons">Mostrar Iconos</Label>
                                <Switch
                                  id="showIcons"
                                  checked={cvData.customization.showIcons}
                                  onCheckedChange={(checked) => updateCustomization("showIcons", checked)}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {selectedTemplate !== "custom" && (
                        <div className="text-center py-8">
                          <p className="text-gray-500">
                            Las opciones de diseño están disponibles solo para la plantilla personalizada. Selecciona
                            &quot;Personalizado&quot; para acceder a todas las opciones de personalización.
                          </p>
                        </div>
                      )}
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button onClick={handlePrint} className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Imprimir CV
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Upload className="w-4 h-4 mr-2" />
                Guardar
              </Button>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Vista Previa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden bg-white">
                  <div className="transform scale-50 origin-top-left w-[200%] h-[200%] overflow-hidden">
                    <CVTemplate template={selectedTemplate} data={cvData} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
