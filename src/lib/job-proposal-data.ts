export interface JobProposalData {
    basicInfo: {
      yourName: string
      clientName: string
      projectTitle: string
      date: string
      introduction: string
      logo: string // Add this new field for the logo
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
  }
  
  export const initialJobProposalData: JobProposalData = {
    basicInfo: {
      yourName: "",
      clientName: "",
      projectTitle: "",
      date: new Date().toISOString().split("T")[0],
      introduction: "",
      logo: "", // Add this new field
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
  }
  
  export const proposalTemplates = [
    { id: "standard", name: "Estándar", description: "Formato clásico y profesional" },
    { id: "business", name: "Empresarial", description: "Diseño corporativo con secciones bien definidas" },
    { id: "creative", name: "Creativo", description: "Diseño colorido con secciones destacadas" },
  ]
  