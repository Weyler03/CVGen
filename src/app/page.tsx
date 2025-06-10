"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Download, Eye } from "lucide-react"

interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  address: string
  linkedin: string
  website: string
  summary: string
}

interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
  current: boolean
}

interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa?: string
}

interface Skill {
  id: string
  name: string
  level: string
}

interface CVData {
  personalInfo: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: Skill[]
}

const initialData: CVData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    website: "",
    summary: "",
  },
  experience: [],
  education: [],
  skills: [],
}

const templates = [
  { id: "modern", name: "Moderno", description: "Diseño limpio y profesional" },
  { id: "classic", name: "Clásico", description: "Formato tradicional" },
  { id: "creative", name: "Creativo", description: "Diseño colorido y dinámico" },
]

export default function CVGenerator() {
  const [cvData, setCvData] = useState<CVData>(initialData)
  const [selectedTemplate, setSelectedTemplate] = useState("modern")
  const [activeTab, setActiveTab] = useState("personal")
  const [showPreview, setShowPreview] = useState(false)

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setCvData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }))
  }

  const addExperience = () => {
    const newExp: Experience = {
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

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
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
    const newEdu: Education = {
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

  const updateEducation = (id: string, field: keyof Education, value: string) => {
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
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: "",
      level: "Intermedio",
    }
    setCvData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }))
  }

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
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
              <Button onClick={() => window.print()}>
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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Generador de CV</h1>
          <Button onClick={() => setShowPreview(true)}>
            <Eye className="w-4 h-4 mr-2" />
            Vista Previa
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulario */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Información del CV</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="experience">Experiencia</TabsTrigger>
                    <TabsTrigger value="education">Educación</TabsTrigger>
                    <TabsTrigger value="skills">Habilidades</TabsTrigger>
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
                              <Select
                                value={skill.level}
                                onValueChange={(value) => updateSkill(skill.id, "level", value)}
                              >
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
          </div>
        </div>
      </div>
    </div>
  )
}

function CVTemplate({ template, data }: { template: string; data: CVData }) {
  const { personalInfo, experience, education, skills } = data

  if (template === "modern") {
    return (
      <div className="bg-white shadow-lg max-w-4xl mx-auto print:shadow-none">
        <div className="bg-slate-800 text-white p-8">
          <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName || "Tu Nombre"}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              {personalInfo.email && <p>📧 {personalInfo.email}</p>}
              {personalInfo.phone && <p>📱 {personalInfo.phone}</p>}
            </div>
            <div>
              {personalInfo.address && <p>📍 {personalInfo.address}</p>}
              {personalInfo.linkedin && <p>💼 {personalInfo.linkedin}</p>}
            </div>
          </div>
        </div>

        <div className="p-8">
          {personalInfo.summary && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">
                Resumen Profesional
              </h2>
              <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">
                Experiencia Laboral
              </h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800">{exp.position}</h3>
                      <p className="text-lg text-slate-600">{exp.company}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {exp.startDate} - {exp.current ? "Presente" : exp.endDate}
                    </p>
                  </div>
                  {exp.description && <p className="text-gray-700 leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">Educación</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">
                        {edu.degree} en {edu.field}
                      </h3>
                      <p className="text-slate-600">{edu.institution}</p>
                      {edu.gpa && <p className="text-sm text-gray-500">Promedio: {edu.gpa}</p>}
                    </div>
                    <p className="text-sm text-gray-500">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">Habilidades</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex justify-between items-center">
                    <span className="text-slate-700">{skill.name}</span>
                    <span className="text-sm bg-slate-100 px-2 py-1 rounded">{skill.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (template === "classic") {
    return (
      <div className="bg-white shadow-lg max-w-4xl mx-auto p-8 print:shadow-none">
        <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
          <h1 className="text-3xl font-bold mb-4">{personalInfo.fullName || "Tu Nombre"}</h1>
          <div className="text-sm text-gray-600 space-y-1">
            {personalInfo.email && <p>{personalInfo.email}</p>}
            {personalInfo.phone && <p>{personalInfo.phone}</p>}
            {personalInfo.address && <p>{personalInfo.address}</p>}
            {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}
          </div>
        </div>

        {personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3 uppercase tracking-wide">Objetivo Profesional</h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3 uppercase tracking-wide">Experiencia Laboral</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{exp.position}</h3>
                    <p className="italic">{exp.company}</p>
                  </div>
                  <p className="text-sm">
                    {exp.startDate} - {exp.current ? "Presente" : exp.endDate}
                  </p>
                </div>
                {exp.description && <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3 uppercase tracking-wide">Educación</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">
                      {edu.degree} en {edu.field}
                    </h3>
                    <p className="italic">{edu.institution}</p>
                    {edu.gpa && <p className="text-sm">Promedio: {edu.gpa}</p>}
                  </div>
                  <p className="text-sm">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {skills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-3 uppercase tracking-wide">Habilidades</h2>
            <div className="grid grid-cols-2 gap-2">
              {skills.map((skill) => (
                <div key={skill.id} className="text-sm">
                  <span className="font-medium">{skill.name}</span> - {skill.level}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  if (template === "creative") {
    return (
      <div className="bg-white shadow-lg max-w-4xl mx-auto print:shadow-none">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8">
          <h1 className="text-4xl font-bold mb-4">{personalInfo.fullName || "Tu Nombre"}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              {personalInfo.email && <p className="flex items-center">📧 {personalInfo.email}</p>}
              {personalInfo.phone && <p className="flex items-center">📱 {personalInfo.phone}</p>}
            </div>
            <div className="space-y-2">
              {personalInfo.address && <p className="flex items-center">📍 {personalInfo.address}</p>}
              {personalInfo.linkedin && <p className="flex items-center">💼 {personalInfo.linkedin}</p>}
            </div>
          </div>
        </div>

        <div className="p-8">
          {personalInfo.summary && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">✨</div>
                Sobre Mí
              </h2>
              <p className="text-gray-700 leading-relaxed bg-purple-50 p-4 rounded-lg">{personalInfo.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">💼</div>
                Experiencia
              </h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-6 bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-blue-800">{exp.position}</h3>
                      <p className="text-lg text-blue-600">{exp.company}</p>
                    </div>
                    <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {exp.startDate} - {exp.current ? "Presente" : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p className="text-gray-700 leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-green-600 mb-4 flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">🎓</div>
                Educación
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-4 bg-green-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-green-800">
                        {edu.degree} en {edu.field}
                      </h3>
                      <p className="text-green-600">{edu.institution}</p>
                      {edu.gpa && <p className="text-sm text-gray-600">Promedio: {edu.gpa}</p>}
                    </div>
                    <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">🚀</div>
                Habilidades
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="bg-orange-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-orange-800">{skill.name}</span>
                      <span className="bg-orange-200 text-orange-800 px-2 py-1 rounded text-sm">{skill.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return null
}
