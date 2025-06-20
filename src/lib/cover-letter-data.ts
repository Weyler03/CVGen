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
  }
  
  export const coverLetterTemplates = [
    { id: "professional", name: "Profesional", description: "Formato tradicional y formal" },
    { id: "modern", name: "Moderno", description: "Diseño contemporáneo con encabezado destacado" },
    { id: "creative", name: "Creativo", description: "Diseño colorido y visualmente atractivo" },
  ]
  