"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import CVGenerator from "@/components/cv-generator"
import CoverLetterGenerator from "@/components/cover-letter-generator"
import JobProposalGenerator from "@/components/job-proposal-generator"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

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

function Home() {
  const [activeSection, setActiveSection] = useState("cv")

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/landing">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Ver Landing Page
              </Button>
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Generador de Documentos Profesionales</h1>
            <p className="text-gray-600">Crea tu CV, carta de presentación y propuestas de empleo con facilidad</p>
          </div>
        </div>

        <div className="mb-8">
          <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="cv">Curriculum Vitae</TabsTrigger>
              <TabsTrigger value="cover-letter">Carta de Presentación</TabsTrigger>
              <TabsTrigger value="job-proposal">Propuesta de Empleo</TabsTrigger>
            </TabsList>

            <TabsContent value="cv">
              <CVGenerator />
            </TabsContent>

            <TabsContent value="cover-letter">
              <CoverLetterGenerator />
            </TabsContent>

            <TabsContent value="job-proposal">
              <JobProposalGenerator />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Home
