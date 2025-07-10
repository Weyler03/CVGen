export interface CVData {
  basicInfo: {
    fullName: string
    title: string
    email: string
    phone: string
    location: string
    website: string
    photo: string
    summary: string
  }
  experience: Array<{
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    description: string
  }>
  education: Array<{
    id: string
    institution: string
    degree: string
    startDate: string
    endDate: string
    description: string
  }>
  skills: Array<{
    id: string
    name: string
    level: number
  }>
  customization: {
    headerColor: string
    accentColor: string
    textColor: string
    backgroundColor: string
    fontFamily: string
    headerStyle: string
    sectionSpacing: string
    borderRadius: number
    showIcons: boolean
    layout: string
  }
}

export const initialCVData: CVData = {
  basicInfo: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    photo: "",
    summary: "",
  },
  experience: [],
  education: [],
  skills: [],
  customization: {
    headerColor: "#1e293b",
    accentColor: "#3b82f6",
    textColor: "#374151",
    backgroundColor: "#ffffff",
    fontFamily: "Inter",
    headerStyle: "solid",
    sectionSpacing: "normal",
    borderRadius: 8,
    showIcons: true,
    layout: "traditional",
  },
}

export const cvTemplates = [
  {
    id: "modern",
    name: "Moderno",
    description: "Diseño limpio y profesional",
  },
  {
    id: "classic",
    name: "Clásico",
    description: "Estilo tradicional y elegante",
  },
  {
    id: "creative",
    name: "Creativo",
    description: "Diseño colorido y dinámico",
  },
  {
    id: "custom",
    name: "Personalizado",
    description: "Totalmente personalizable",
  },
]

// Alias for backward compatibility
export const templates = cvTemplates

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
  { label: "Inter", value: "Inter" },
  { label: "Arial", value: "Arial" },
  { label: "Helvetica", value: "Helvetica" },
  { label: "Times New Roman", value: "Times New Roman" },
  { label: "Georgia", value: "Georgia" },
  { label: "Roboto", value: "Roboto" },
  { label: "Open Sans", value: "Open Sans" },
  { label: "Lato", value: "Lato" },
]

export const colorPresets = [
  { name: "Azul Profesional", header: "#1e293b", accent: "#3b82f6" },
  { name: "Verde Corporativo", header: "#065f46", accent: "#10b981" },
  { name: "Púrpura Moderno", header: "#581c87", accent: "#8b5cf6" },
  { name: "Rojo Dinámico", header: "#991b1b", accent: "#ef4444" },
  { name: "Naranja Creativo", header: "#9a3412", accent: "#f97316" },
  { name: "Gris Elegante", header: "#374151", accent: "#6b7280" },
]
