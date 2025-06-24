export interface CoverLetterData {
    fullName: string
    position: string
    company: string
    hiringManager: string
    email: string
    phone: string
    date: string
    city: string
    greeting: string
    introduction: string
    body: string
    closing: string
    signature: string
    customization: {
      headerColor: string
      accentColor: string
      textColor: string
      backgroundColor: string
      fontFamily: string
      headerStyle: "gradient" | "solid" | "pattern"
      sectionSpacing: "compact" | "normal" | "spacious"
      borderRadius: number
      showIcons: boolean
    }
  }
  
  export const initialCoverLetterData: CoverLetterData = {
    fullName: "",
    position: "",
    company: "",
    hiringManager: "",
    email: "",
    phone: "",
    date: new Date().toISOString().split("T")[0],
    city: "",
    greeting: "",
    introduction: "",
    body: "",
    closing: "",
    signature: "Atentamente,",
    customization: {
      headerColor: "#1e293b",
      accentColor: "#3b82f6",
      textColor: "#374151",
      backgroundColor: "#ffffff",
      fontFamily: "Inter",
      headerStyle: "gradient",
      sectionSpacing: "normal",
      borderRadius: 8,
      showIcons: true,
    },
  }
  
  export const coverLetterTemplates = [
    { id: "professional", name: "Profesional", description: "Formato tradicional y formal" },
    { id: "modern", name: "Moderno", description: "Diseño contemporáneo con encabezado destacado" },
    { id: "creative", name: "Creativo", description: "Diseño colorido y visualmente atractivo" },
    { id: "custom", name: "Personalizado", description: "Totalmente personalizable" },
  ]
  