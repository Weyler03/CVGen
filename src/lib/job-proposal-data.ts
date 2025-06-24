export interface JobProposalData {
    basicInfo: {
      yourName: string
      clientName: string
      projectTitle: string
      date: string
      introduction: string
      logo: string
    }
    projectScope: {
      description: string
      objectives: string
      requirements: string
    }
    deliverables: {
      id: string
      name: string
      description: string
    }[]
    timeline: {
      id: string
      name: string
      deadline: string
      payment: string
    }[]
    pricing: {
      totalPrice: string
      paymentTerms: string
      additionalNotes: string
    }
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
      logoPosition: "left" | "right" | "center"
    }
  }
  
  export const initialJobProposalData: JobProposalData = {
    basicInfo: {
      yourName: "",
      clientName: "",
      projectTitle: "",
      date: new Date().toISOString().split("T")[0],
      introduction: "",
      logo: "",
    },
    projectScope: {
      description: "",
      objectives: "",
      requirements: "",
    },
    deliverables: [],
    timeline: [],
    pricing: {
      totalPrice: "",
      paymentTerms: "",
      additionalNotes: "",
    },
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
      logoPosition: "right",
    },
  }
  
  export const proposalTemplates = [
    { id: "standard", name: "Estándar", description: "Formato clásico y profesional" },
    { id: "business", name: "Empresarial", description: "Diseño corporativo con secciones bien definidas" },
    { id: "creative", name: "Creativo", description: "Diseño colorido con secciones destacadas" },
    { id: "custom", name: "Personalizado", description: "Totalmente personalizable" },
  ]
  