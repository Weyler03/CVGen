"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import CVGenerator from "@/components/cv-generator"
import CoverLetterGenerator from "@/components/cover-letter-generator"
import JobProposalGenerator from "@/components/job-proposal-generator"
import Link from "next/link"
import { ArrowLeft, FileText, Mail, Briefcase } from "lucide-react"

function Home() {
  const [activeSection, setActiveSection] = useState("cv")

  const sections = [
    {
      id: "cv",
      name: "CV",
      fullName: "Curriculum Vitae",
      icon: <FileText className="w-4 h-4 sm:w-5 sm:h-5" />,
      description: "Crea tu currículum profesional",
    },
    {
      id: "cover-letter",
      name: "Carta",
      fullName: "Carta de Presentación",
      icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5" />,
      description: "Redacta cartas convincentes",
    },
    {
      id: "job-proposal",
      name: "Propuesta",
      fullName: "Propuesta de Empleo",
      icon: <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />,
      description: "Genera propuestas ganadoras",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 sm:py-4">
            {/* <Link href="/landing">
              <Button variant="outline" size="sm" className="text-xs sm:text-sm bg-transparent">
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Ver Landing Page</span>
                <span className="sm:hidden">Landing</span>
              </Button>
            </Link> */}
            <div className="text-center flex-1 mx-4">
              <h1 className="text-lg sm:text-2xl lg:text-4xl font-bold text-gray-900">
                <span className="hidden sm:inline">Generador de Documentos Profesionales</span>
                <span className="sm:hidden">DocuPro</span>
              </h1>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1 hidden sm:block">
                Crea tu CV, carta de presentación y propuestas de empleo con facilidad
              </p>
            </div>
            <div className="w-20 sm:w-24"></div> {/* Spacer for balance */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Section Cards - Mobile Only */}
        <div className="grid grid-cols-1 gap-4 mb-6 sm:hidden">
          {sections.map((section) => (
            <Card
              key={section.id}
              className={`cursor-pointer transition-all duration-200 ${
                activeSection === section.id
                  ? "ring-2 ring-blue-500 bg-blue-50 border-blue-200"
                  : "hover:shadow-md border-gray-200"
              }`}
              onClick={() => setActiveSection(section.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg ${
                      activeSection === section.id ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{section.fullName}</h3>
                    <p className="text-sm text-gray-600">{section.description}</p>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      activeSection === section.id ? "border-blue-500 bg-blue-500" : "border-gray-300"
                    }`}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs - Desktop and Tablet */}
        <div className="hidden sm:block">
          <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
            <div className="flex justify-center mb-6 lg:mb-8">
              <TabsList className="grid w-full max-w-2xl grid-cols-3 h-auto p-1">
                {sections.map((section) => (
                  <TabsTrigger
                    key={section.id}
                    value={section.id}
                    className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 py-3 px-2 sm:px-4 text-xs sm:text-sm data-[state=active]:bg-white"
                  >
                    {section.icon}
                    <div className="text-center sm:text-left">
                      <div className="font-medium">{section.name}</div>
                      <div className="text-xs text-gray-500 hidden lg:block">{section.description}</div>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="cv" className="mt-0">
              <CVGenerator />
            </TabsContent>

            <TabsContent value="cover-letter" className="mt-0">
              <CoverLetterGenerator />
            </TabsContent>

            <TabsContent value="job-proposal" className="mt-0">
              <JobProposalGenerator />
            </TabsContent>
          </Tabs>
        </div>

        {/* Mobile Content */}
        <div className="sm:hidden">
          {activeSection === "cv" && <CVGenerator />}
          {activeSection === "cover-letter" && <CoverLetterGenerator />}
          {activeSection === "job-proposal" && <JobProposalGenerator />}
        </div>
      </div>
    </div>
  )
}

export default Home
