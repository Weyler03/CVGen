export interface PersonalInfo {
    fullName: string
    email: string
    phone: string
    address: string
    linkedin: string
    website: string
    summary: string
  }
  
  export interface Experience {
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    description: string
    current: boolean
  }
  
  export interface Education {
    id: string
    institution: string
    degree: string
    field: string
    startDate: string
    endDate: string
    gpa?: string
  }
  
  export interface Skill {
    id: string
    name: string
    level: string
  }
  
  export interface CVData {
    personalInfo: PersonalInfo
    experience: Experience[]
    education: Education[]
    skills: Skill[]
  }
  
  export const initialCVData: CVData = {
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
  
  export const templates = [
    { id: "modern", name: "Moderno", description: "Diseño limpio y profesional" },
    { id: "classic", name: "Clásico", description: "Formato tradicional" },
    { id: "creative", name: "Creativo", description: "Diseño colorido y dinámico" },
  ]
  