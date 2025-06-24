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
  
  export interface CustomizationOptions {
    headerColor: string
    accentColor: string
    textColor: string
    backgroundColor: string
    fontFamily: string
    showSkillBars: boolean
    skillBarStyle: "bars" | "circles" | "dots"
    headerStyle: "gradient" | "solid" | "pattern"
    sectionSpacing: "compact" | "normal" | "spacious"
    borderRadius: number
    showIcons: boolean
    layout: "traditional" | "sidebar" | "modern"
  }
  
  export interface CVData {
    personalInfo: PersonalInfo
    experience: Experience[]
    education: Education[]
    skills: Skill[]
    customization: CustomizationOptions
  }
  
  export const initialCustomizationOptions: CustomizationOptions = {
    headerColor: "#1e293b",
    accentColor: "#3b82f6",
    textColor: "#374151",
    backgroundColor: "#ffffff",
    fontFamily: "Inter",
    showSkillBars: true,
    skillBarStyle: "bars",
    headerStyle: "gradient",
    sectionSpacing: "normal",
    borderRadius: 8,
    showIcons: true,
    layout: "traditional",
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
    customization: initialCustomizationOptions,
  }
  
  export const templates = [
    { id: "modern", name: "Moderno", description: "Diseño limpio y profesional" },
    { id: "classic", name: "Clásico", description: "Formato tradicional" },
    { id: "creative", name: "Creativo", description: "Diseño colorido y dinámico" },
    { id: "custom", name: "Personalizado", description: "Totalmente personalizable" },
  ]
  
  export const layoutOptions = [
    {
      id: "traditional",
      name: "Tradicional",
      description: "Layout clásico con cabecera completa y contenido en una columna",
      preview: "Cabecera → Resumen → Experiencia → Educación → Habilidades",
    },
    {
      id: "sidebar",
      name: "Barra Lateral",
      description: "Información personal y habilidades en barra lateral izquierda",
      preview: "Sidebar (Info + Habilidades) | Contenido Principal (Experiencia + Educación)",
    },
    {
      id: "modern",
      name: "Moderno",
      description: "Layout en dos columnas con distribución equilibrada",
      preview: "Cabecera → [Experiencia + Educación] | [Resumen + Habilidades]",
    },
  ]
  
  export const fontOptions = [
    { value: "Inter", label: "Inter (Moderno)" },
    { value: "Georgia", label: "Georgia (Clásico)" },
    { value: "Arial", label: "Arial (Limpio)" },
    { value: "Times New Roman", label: "Times New Roman (Tradicional)" },
    { value: "Roboto", label: "Roboto (Tecnológico)" },
  ]
  
  export const colorPresets = [
    { name: "Azul Profesional", header: "#1e40af", accent: "#3b82f6" },
    { name: "Verde Corporativo", header: "#166534", accent: "#22c55e" },
    { name: "Púrpura Creativo", header: "#7c3aed", accent: "#a855f7" },
    { name: "Rojo Dinámico", header: "#dc2626", accent: "#ef4444" },
    { name: "Naranja Energético", header: "#ea580c", accent: "#f97316" },
    { name: "Gris Elegante", header: "#374151", accent: "#6b7280" },
  ]
  