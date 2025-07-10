import type { CVData } from "@/lib/cv-data"
import type { CoverLetterData } from "@/lib/cover-letter-data"
import type { JobProposalData } from "@/lib/job-proposal-data"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export const printCV = (template: string, data: CVData) => {
  const printWindow = window.open("", "_blank")
  if (!printWindow) return

  const { basicInfo, experience, education, skills, customization } = data
  const layout = customization.layout || "traditional"

  let printContent = ""

  // Estilos base comunes
  const baseStyles = `
    * { 
      margin: 0; 
      padding: 0; 
      box-sizing: border-box; 
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    @page {
      size: A4;
      margin: 0.5in;
    }
    
    body { 
      font-family: Arial, sans-serif; 
      line-height: 1.6; 
      color: #333; 
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    .container { 
      max-width: 100%; 
      margin: 0 auto; 
      background: white; 
    }
    
    .sidebar-layout {
      display: flex;
      gap: 20px;
    }
    
    .sidebar {
      width: 250px;
      background-color: #f8fafc;
      padding: 20px;
      border-right: 2px solid #e2e8f0;
    }
    
    .main-content {
      flex: 1;
      padding: 20px;
    }
    
    .modern-layout {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 32px;
    }
    
    @media print {
      body { 
        margin: 0 !important; 
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      
      .container { 
        box-shadow: none !important; 
      }
      
      * {
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    }
  `

  if (template === "custom") {
    const headerStyle =
      customization.headerStyle === "gradient"
        ? `background: linear-gradient(135deg, ${customization.headerColor}, ${customization.accentColor}) !important;`
        : customization.headerStyle === "pattern"
          ? `background-color: ${customization.headerColor} !important; background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0) !important; background-size: 20px 20px !important;`
          : `background-color: ${customization.headerColor} !important;`

    const sidebarContent =
      layout === "sidebar"
        ? `
      <div class="sidebar" style="background-color: ${customization.backgroundColor}; border-right: 2px solid ${customization.accentColor};">
        <div style="margin-bottom: 32px;">
          <h3 style="color: ${customization.headerColor}; font-size: 18px; font-weight: bold; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid ${customization.accentColor};">
            Contacto
          </h3>
          <div style="font-size: 14px; line-height: 1.8;">
            ${basicInfo.email ? `<div style="margin-bottom: 8px;">${customization.showIcons ? "📧 " : ""}${basicInfo.email}</div>` : ""}
            ${basicInfo.phone ? `<div style="margin-bottom: 8px;">${customization.showIcons ? "📱 " : ""}${basicInfo.phone}</div>` : ""}
            ${basicInfo.location ? `<div style="margin-bottom: 8px;">${customization.showIcons ? "📍 " : ""}${basicInfo.location}</div>` : ""}
            ${basicInfo.website ? `<div style="margin-bottom: 8px;">${customization.showIcons ? "🌐 " : ""}${basicInfo.website}</div>` : ""}
          </div>
        </div>
        
        ${
          skills.length > 0
            ? `
          <div style="margin-bottom: 32px;">
            <h3 style="color: ${customization.headerColor}; font-size: 18px; font-weight: bold; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid ${customization.accentColor};">
              ${customization.showIcons ? "🏆 " : ""}Habilidades
            </h3>
            ${skills
              .map(
                (skill) => `
              <div style="margin-bottom: 12px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                  <span style="font-weight: 500; font-size: 14px;">${skill.name}</span>
                  <span style="font-size: 12px; color: #6b7280;">${skill.level}%</span>
                </div>
                <div style="width: 100%; height: 8px; background-color: #e5e7eb; border-radius: 4px;">
                  <div style="height: 100%; width: ${skill.level}%; background-color: ${customization.accentColor}; border-radius: 4px;"></div>
                </div>
              </div>
            `,
              )
              .join("")}
          </div>
        `
            : ""
        }
        
        ${
          basicInfo.summary && layout === "sidebar"
            ? `
          <div>
            <h3 style="color: ${customization.headerColor}; font-size: 18px; font-weight: bold; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid ${customization.accentColor};">
              ${customization.showIcons ? "👤 " : ""}Resumen
            </h3>
            <p style="font-size: 14px; line-height: 1.6;">${basicInfo.summary}</p>
          </div>
        `
            : ""
        }
      </div>
    `
        : ""

    printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>CV - ${basicInfo.fullName}</title>
          <meta charset="utf-8">
          <style>
            ${baseStyles}
            
            body { 
              font-family: ${customization.fontFamily}, Arial, sans-serif; 
              color: ${customization.textColor}; 
            }
            
            .header { 
              ${headerStyle}
              color: white !important; 
              padding: 32px; 
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            .header * { color: white !important; }
            
            .profile-section {
              display: flex;
              align-items: center;
              gap: 24px;
            }
            
            .profile-photo {
              width: 96px;
              height: 96px;
              border-radius: 50%;
              object-fit: cover;
              border: 4px solid rgba(255,255,255,0.2);
            }
            
            .header h1 { 
              font-size: 36px; 
              font-weight: bold; 
              margin-bottom: 8px; 
            }
            
            .header-subtitle {
              font-size: 20px;
              opacity: 0.9;
              margin-bottom: 16px;
            }
            
            .contact-info { 
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 8px;
              font-size: 14px; 
            }
            
            .content { 
              padding: 32px; 
            }
            
            .section { 
              margin-bottom: 32px; 
            }
            
            .section h2 { 
              font-size: 24px; 
              font-weight: bold; 
              color: ${customization.headerColor} !important; 
              margin-bottom: 16px; 
              padding-bottom: 8px; 
              border-bottom: 2px solid ${customization.accentColor}; 
              display: flex; 
              align-items: center; 
            }
            
            .experience-item, .education-item { 
              margin-bottom: 24px; 
            }
            
            .item-header { 
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              margin-bottom: 8px; 
            }
            
            .item-title { 
              font-size: 20px; 
              font-weight: 600; 
              color: ${customization.headerColor} !important; 
            }
            
            .item-company { 
              font-size: 18px; 
              font-weight: 500; 
              color: ${customization.accentColor} !important; 
            }
            
            .item-date { 
              background-color: ${customization.accentColor}20 !important; 
              color: ${customization.accentColor} !important; 
              padding: 4px 12px; 
              border-radius: 20px; 
              font-size: 12px; 
              white-space: nowrap;
            }
            
            .skills-grid { 
              display: grid;
              grid-template-columns: ${layout === "modern" ? "1fr" : "1fr 1fr"};
              gap: 16px;
            }
            
            .skill-item {
              margin-bottom: 12px;
            }
            
            .skill-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 4px;
            }
            
            .skill-bar {
              width: 100%;
              height: 8px;
              background-color: #e5e7eb;
              border-radius: 4px;
              overflow: hidden;
            }
            
            .skill-progress {
              height: 100%;
              background-color: ${customization.accentColor};
              transition: width 0.3s ease;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="profile-section">
                ${basicInfo.photo ? `<img src="${basicInfo.photo}" alt="Profile" class="profile-photo" />` : ""}
                <div style="flex: 1;">
                  <h1>${basicInfo.fullName || "Tu Nombre"}</h1>
                  ${basicInfo.title ? `<div class="header-subtitle">${basicInfo.title}</div>` : ""}
                  ${
                    layout !== "sidebar"
                      ? `
                    <div class="contact-info">
                      ${basicInfo.email ? `<div>${customization.showIcons ? "📧 " : ""}${basicInfo.email}</div>` : ""}
                      ${basicInfo.phone ? `<div>${customization.showIcons ? "📱 " : ""}${basicInfo.phone}</div>` : ""}
                      ${basicInfo.location ? `<div>${customization.showIcons ? "📍 " : ""}${basicInfo.location}</div>` : ""}
                      ${basicInfo.website ? `<div>${customization.showIcons ? "🌐 " : ""}${basicInfo.website}</div>` : ""}
                    </div>
                  `
                      : ""
                  }
                </div>
              </div>
            </div>
            
            ${
              layout === "sidebar"
                ? `
              <div class="sidebar-layout">
                ${sidebarContent}
                <div class="main-content">
            `
                : layout === "modern"
                  ? `
              <div class="content">
                ${
                  basicInfo.summary
                    ? `
                  <div class="section">
                    <h2>${customization.showIcons ? "👤 " : ""}Resumen Profesional</h2>
                    <p>${basicInfo.summary}</p>
                  </div>
                `
                    : ""
                }
                <div class="modern-layout">
                  <div>
            `
                  : `<div class="content">`
            }
            
            ${
              basicInfo.summary && layout !== "sidebar" && layout !== "modern"
                ? `
              <div class="section">
                <h2>${customization.showIcons ? "👤 " : ""}Resumen Profesional</h2>
                <p>${basicInfo.summary}</p>
              </div>
            `
                : ""
            }
            
            ${
              experience.length > 0
                ? `
              <div class="section">
                <h2>${customization.showIcons ? "💼 " : ""}Experiencia Laboral</h2>
                ${experience
                  .map(
                    (exp) => `
                  <div class="experience-item">
                    <div class="item-header">
                      <div>
                        <div class="item-title">${exp.position}</div>
                        <div class="item-company">${exp.company}</div>
                      </div>
                      <div class="item-date">${exp.startDate} - ${exp.endDate || "Presente"}</div>
                    </div>
                    ${exp.description ? `<div>${exp.description}</div>` : ""}
                  </div>
                `,
                  )
                  .join("")}
              </div>
            `
                : ""
            }
            
            ${
              education.length > 0
                ? `
              <div class="section">
                <h2>${customization.showIcons ? "🎓 " : ""}Educación</h2>
                ${education
                  .map(
                    (edu) => `
                  <div class="education-item">
                    <div class="item-header">
                      <div>
                        <div class="item-title">${edu.degree}</div>
                        <div class="item-company">${edu.institution}</div>
                      </div>
                      <div class="item-date">${edu.startDate} - ${edu.endDate}</div>
                    </div>
                    ${edu.description ? `<div>${edu.description}</div>` : ""}
                  </div>
                `,
                  )
                  .join("")}
              </div>
            `
                : ""
            }
            
            ${
              layout === "modern"
                ? `
                  </div>
                  <div>
                    ${
                      skills.length > 0
                        ? `
                      <div class="section">
                        <h2>${customization.showIcons ? "🚀 " : ""}Habilidades</h2>
                        <div class="skills-grid">
                          ${skills
                            .map(
                              (skill) => `
                            <div class="skill-item">
                              <div class="skill-header">
                                <span style="font-weight: 500;">${skill.name}</span>
                                <span style="font-size: 12px; color: #6b7280;">${skill.level}%</span>
                              </div>
                              <div class="skill-bar">
                                <div class="skill-progress" style="width: ${skill.level}%;"></div>
                              </div>
                            </div>
                          `,
                            )
                            .join("")}
                        </div>
                      </div>
                    `
                        : ""
                    }
                  </div>
                </div>
              </div>
            `
                : skills.length > 0 && layout !== "sidebar"
                  ? `
              <div class="section">
                <h2>${customization.showIcons ? "🚀 " : ""}Habilidades</h2>
                <div class="skills-grid">
                  ${skills
                    .map(
                      (skill) => `
                    <div class="skill-item">
                      <div class="skill-header">
                        <span style="font-weight: 500;">${skill.name}</span>
                        <span style="font-size: 12px; color: #6b7280;">${skill.level}%</span>
                      </div>
                      <div class="skill-bar">
                        <div class="skill-progress" style="width: ${skill.level}%;"></div>
                      </div>
                    </div>
                  `,
                    )
                    .join("")}
                </div>
              </div>
            `
                  : ""
            }
            
            ${
              layout === "sidebar"
                ? `
                </div>
              </div>
            `
                : layout !== "modern"
                  ? `</div>`
                  : ""
            }
          </div>
        </body>
      </html>
    `
  } else if (template === "modern") {
    printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>CV - ${basicInfo.fullName}</title>
          <meta charset="utf-8">
          <style>
            ${baseStyles}
            
            .header { 
              background-color: #1e293b !important; 
              color: white !important; 
              padding: 32px; 
              -webkit-print-color-adjust: exact !important;
            }
            
            .header * { color: white !important; }
            
            .profile-section {
              display: flex;
              align-items: center;
              gap: 24px;
            }
            
            .profile-photo {
              width: 96px;
              height: 96px;
              border-radius: 50%;
              object-fit: cover;
              border: 4px solid rgba(255,255,255,0.2);
            }
            
            .header h1 { font-size: 36px; font-weight: bold; margin-bottom: 8px; }
            .header-subtitle { font-size: 20px; opacity: 0.9; margin-bottom: 16px; }
            
            .contact-info { 
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 8px;
              font-size: 14px; 
            }
            
            .content { padding: 32px; }
            .section { margin-bottom: 32px; }
            
            .section h2 { 
              font-size: 24px; 
              font-weight: bold; 
              color: #1e293b !important; 
              margin-bottom: 16px; 
              padding-bottom: 8px; 
              border-bottom: 2px solid #e2e8f0; 
            }
            
            .item-header { 
              display: flex;
              justify-content: space-between;
              margin-bottom: 8px; 
            }
            
            .item-title { 
              font-size: 20px; 
              font-weight: 600; 
              color: #1e293b !important; 
            }
            
            .item-company { 
              font-size: 18px; 
              color: #64748b !important; 
            }
            
            .item-date { 
              background-color: #f1f5f9 !important; 
              color: #475569 !important; 
              padding: 4px 12px; 
              border-radius: 4px; 
              font-size: 12px; 
            }
            
            .skills-grid { 
              display: grid;
              grid-template-columns: ${layout === "modern" ? "1fr" : "1fr 1fr"};
              gap: 16px;
            }
            
            .skill-item { margin-bottom: 12px; }
            .skill-header { display: flex; justify-content: space-between; margin-bottom: 4px; }
            .skill-bar { width: 100%; height: 8px; background-color: #e2e8f0; border-radius: 4px; }
            .skill-progress { height: 100%; background-color: #3b82f6; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="profile-section">
                ${basicInfo.photo ? `<img src="${basicInfo.photo}" alt="Profile" class="profile-photo" />` : ""}
                <div style="flex: 1;">
                  <h1>${basicInfo.fullName || "Tu Nombre"}</h1>
                  ${basicInfo.title ? `<div class="header-subtitle">${basicInfo.title}</div>` : ""}
                  ${
                    layout !== "sidebar"
                      ? `
                    <div class="contact-info">
                      ${basicInfo.email ? `<div>📧 ${basicInfo.email}</div>` : ""}
                      ${basicInfo.phone ? `<div>📱 ${basicInfo.phone}</div>` : ""}
                      ${basicInfo.location ? `<div>📍 ${basicInfo.location}</div>` : ""}
                      ${basicInfo.website ? `<div>🌐 ${basicInfo.website}</div>` : ""}
                    </div>
                  `
                      : ""
                  }
                </div>
              </div>
            </div>
            
            ${
              layout === "sidebar"
                ? `
              <div class="sidebar-layout">
                <div class="sidebar">
                  <div style="margin-bottom: 32px;">
                    <h3 style="color: #1e293b; font-size: 18px; font-weight: bold; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #3b82f6;">
                      Contacto
                    </h3>
                    <div style="font-size: 14px; line-height: 1.8;">
                      ${basicInfo.email ? `<div style="margin-bottom: 8px;">📧 ${basicInfo.email}</div>` : ""}
                      ${basicInfo.phone ? `<div style="margin-bottom: 8px;">📱 ${basicInfo.phone}</div>` : ""}
                      ${basicInfo.location ? `<div style="margin-bottom: 8px;">📍 ${basicInfo.location}</div>` : ""}
                      ${basicInfo.website ? `<div style="margin-bottom: 8px;">🌐 ${basicInfo.website}</div>` : ""}
                    </div>
                  </div>
                  
                  ${
                    skills.length > 0
                      ? `
                    <div style="margin-bottom: 32px;">
                      <h3 style="color: #1e293b; font-size: 18px; font-weight: bold; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #3b82f6;">
                        🏆 Habilidades
                      </h3>
                      ${skills
                        .map(
                          (skill) => `
                        <div style="margin-bottom: 12px;">
                          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                            <span style="font-weight: 500; font-size: 14px;">${skill.name}</span>
                            <span style="font-size: 12px; color: #6b7280;">${skill.level}%</span>
                          </div>
                          <div style="width: 100%; height: 8px; background-color: #e2e8f0; border-radius: 4px;">
                            <div style="height: 100%; width: ${skill.level}%; background-color: #3b82f6; border-radius: 4px;"></div>
                          </div>
                        </div>
                      `,
                        )
                        .join("")}
                    </div>
                  `
                      : ""
                  }
                  
                  ${
                    basicInfo.summary && layout === "sidebar"
                      ? `
                    <div>
                      <h3 style="color: #1e293b; font-size: 18px; font-weight: bold; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #3b82f6;">
                        👤 Resumen
                      </h3>
                      <p style="font-size: 14px; line-height: 1.6;">${basicInfo.summary}</p>
                    </div>
                  `
                      : ""
                  }
                </div>
                <div class="main-content">
            `
                : layout === "modern"
                  ? `
              <div class="content">
                ${
                  basicInfo.summary
                    ? `
                  <div class="section">
                    <h2>Resumen Profesional</h2>
                    <p>${basicInfo.summary}</p>
                  </div>
                `
                    : ""
                }
                <div class="modern-layout">
                  <div>
            `
                  : `<div class="content">`
            }
            
            ${
              basicInfo.summary && layout !== "sidebar" && layout !== "modern"
                ? `
              <div class="section">
                <h2>Resumen Profesional</h2>
                <p>${basicInfo.summary}</p>
              </div>
            `
                : ""
            }
            
            ${
              experience.length > 0
                ? `
              <div class="section">
                <h2>Experiencia Laboral</h2>
                ${experience
                  .map(
                    (exp) => `
                  <div style="margin-bottom: 24px;">
                    <div class="item-header">
                      <div>
                        <div class="item-title">${exp.position}</div>
                        <div class="item-company">${exp.company}</div>
                      </div>
                      <div class="item-date">${exp.startDate} - ${exp.endDate || "Presente"}</div>
                    </div>
                    ${exp.description ? `<div>${exp.description}</div>` : ""}
                  </div>
                `,
                  )
                  .join("")}
              </div>
            `
                : ""
            }
            
            ${
              education.length > 0
                ? `
              <div class="section">
                <h2>Educación</h2>
                ${education
                  .map(
                    (edu) => `
                  <div style="margin-bottom: 16px;">
                    <div class="item-header">
                      <div>
                        <div class="item-title">${edu.degree}</div>
                        <div class="item-company">${edu.institution}</div>
                      </div>
                      <div class="item-date">${edu.startDate} - ${edu.endDate}</div>
                    </div>
                    ${edu.description ? `<div style="font-size: 14px; color: #64748b;">${edu.description}</div>` : ""}
                  </div>
                `,
                  )
                  .join("")}
              </div>
            `
                : ""
            }
            
            ${
              layout === "modern"
                ? `
                  </div>
                  <div>
                    ${
                      skills.length > 0
                        ? `
                      <div class="section">
                        <h2>Habilidades</h2>
                        <div class="skills-grid">
                          ${skills
                            .map(
                              (skill) => `
                            <div class="skill-item">
                              <div class="skill-header">
                                <span style="font-weight: 500;">${skill.name}</span>
                                <span style="font-size: 12px; color: #64748b;">${skill.level}%</span>
                              </div>
                              <div class="skill-bar">
                                <div class="skill-progress" style="width: ${skill.level}%;"></div>
                              </div>
                            </div>
                          `,
                            )
                            .join("")}
                        </div>
                      </div>
                    `
                        : ""
                    }
                  </div>
                </div>
              </div>
            `
                : skills.length > 0 && layout !== "sidebar"
                  ? `
              <div class="section">
                <h2>Habilidades</h2>
                <div class="skills-grid">
                  ${skills
                    .map(
                      (skill) => `
                    <div class="skill-item">
                      <div class="skill-header">
                        <span style="font-weight: 500;">${skill.name}</span>
                        <span style="font-size: 12px; color: #64748b;">${skill.level}%</span>
                      </div>
                      <div class="skill-bar">
                        <div class="skill-progress" style="width: ${skill.level}%;"></div>
                      </div>
                    </div>
                  `,
                    )
                    .join("")}
                </div>
              </div>
            `
                  : ""
            }
            
            ${
              layout === "sidebar"
                ? `
                </div>
              </div>
            `
                : layout !== "modern"
                  ? `</div>`
                  : ""
            }
          </div>
        </body>
      </html>
    `
  } else if (template === "classic") {
    printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>CV - ${basicInfo.fullName}</title>
          <meta charset="utf-8">
          <style>
            ${baseStyles}
            
            .header { 
              text-align: center; 
              margin-bottom: 32px; 
              padding-bottom: 24px; 
              border-bottom: 2px solid #d1d5db; 
            }
            
            .profile-photo {
              width: 128px;
              height: 128px;
              border-radius: 50%;
              object-fit: cover;
              margin: 0 auto 16px;
              border: 4px solid #d1d5db;
            }
            
            .header h1 { font-size: 32px; font-weight: bold; margin-bottom: 8px; }
            .header-subtitle { font-size: 20px; color: #6b7280; margin-bottom: 16px; }
            
            .contact-info { 
              font-size: 14px; 
              color: #6b7280; 
              line-height: 1.4;
            }
            
            .content { padding: 32px; }
            .section { margin-bottom: 32px; }
            
            .section h2 { 
              font-size: 20px; 
              font-weight: bold; 
              margin-bottom: 12px; 
              text-transform: uppercase; 
              letter-spacing: 0.05em; 
            }
            
            .item-header { 
              display: flex;
              justify-content: space-between;
              margin-bottom: 8px; 
            }
            
            .item-title { font-weight: 600; }
            .item-company { font-style: italic; }
            
            .skills-grid { 
              display: grid;
              grid-template-columns: ${layout === "modern" ? "1fr" : "1fr 1fr"};
              gap: 8px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            ${
              layout === "sidebar"
                ? `
              <div class="sidebar-layout">
                <div class="sidebar">
                  ${basicInfo.photo ? `<img src="${basicInfo.photo}" alt="Profile" class="profile-photo" style="width: 100px; height: 100px; margin-bottom: 16px;" />` : ""}
                  <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 8px; text-align: center;">${basicInfo.fullName || "Tu Nombre"}</h1>
                  ${basicInfo.title ? `<div style="font-size: 16px; color: #6b7280; margin-bottom: 16px; text-align: center;">${basicInfo.title}</div>` : ""}
                  
                  <div style="margin-bottom: 32px;">
                    <h3 style="font-size: 16px; font-weight: bold; margin-bottom: 12px; text-transform: uppercase;">Contacto</h3>
                    <div style="font-size: 14px; line-height: 1.8;">
                      ${basicInfo.email ? `<div style="margin-bottom: 8px;">${basicInfo.email}</div>` : ""}
                      ${basicInfo.phone ? `<div style="margin-bottom: 8px;">${basicInfo.phone}</div>` : ""}
                      ${basicInfo.location ? `<div style="margin-bottom: 8px;">${basicInfo.location}</div>` : ""}:""}
                      ${basicInfo.location ? `<div style="margin-bottom: 8px;">${basicInfo.location}</div>` : ""}
                      ${basicInfo.website ? `<div style="margin-bottom: 8px;">${basicInfo.website}</div>` : ""}
                    </div>
                  </div>
                  
                  ${
                    skills.length > 0
                      ? `
                    <div style="margin-bottom: 32px;">
                      <h3 style="font-size: 16px; font-weight: bold; margin-bottom: 12px; text-transform: uppercase;">Habilidades</h3>
                      ${skills
                        .map(
                          (skill) => `
                        <div style="margin-bottom: 8px; font-size: 14px;">
                          <span style="font-weight: 500;">${skill.name}</span> - ${skill.level}%
                        </div>
                      `,
                        )
                        .join("")}
                    </div>
                  `
                      : ""
                  }
                  
                  ${
                    basicInfo.summary && layout === "sidebar"
                      ? `
                    <div>
                      <h3 style="font-size: 16px; font-weight: bold; margin-bottom: 12px; text-transform: uppercase;">Objetivo Profesional</h3>
                      <p style="font-size: 14px; line-height: 1.6;">${basicInfo.summary}</p>
                    </div>
                  `
                      : ""
                  }
                </div>
                <div class="main-content">
            `
                : `
              <div class="content">
                <div class="header">
                  ${basicInfo.photo ? `<img src="${basicInfo.photo}" alt="Profile" class="profile-photo" />` : ""}
                  <h1>${basicInfo.fullName || "Tu Nombre"}</h1>
                  ${basicInfo.title ? `<div class="header-subtitle">${basicInfo.title}</div>` : ""}
                  <div class="contact-info">
                    ${basicInfo.email ? `<div>${basicInfo.email}</div>` : ""}
                    ${basicInfo.phone ? `<div>${basicInfo.phone}</div>` : ""}
                    ${basicInfo.location ? `<div>${basicInfo.location}</div>` : ""}
                    ${basicInfo.website ? `<div>${basicInfo.website}</div>` : ""}
                  </div>
                </div>
            `
            }
            
            ${
              basicInfo.summary && layout !== "sidebar"
                ? `
              <div class="section">
                <h2>Objetivo Profesional</h2>
                <p>${basicInfo.summary}</p>
              </div>
            `
                : ""
            }
            
            ${
              experience.length > 0
                ? `
              <div class="section">
                <h2>Experiencia Laboral</h2>
                ${experience
                  .map(
                    (exp) => `
                  <div style="margin-bottom: 24px;">
                    <div class="item-header">
                      <div>
                        <div class="item-title">${exp.position}</div>
                        <div class="item-company">${exp.company}</div>
                      </div>
                      <div style="font-size: 14px;">${exp.startDate} - ${exp.endDate || "Presente"}</div>
                    </div>
                    ${exp.description ? `<div style="font-size: 14px; line-height: 1.5;">${exp.description}</div>` : ""}
                  </div>
                `,
                  )
                  .join("")}
              </div>
            `
                : ""
            }
            
            ${
              education.length > 0
                ? `
              <div class="section">
                <h2>Educación</h2>
                ${education
                  .map(
                    (edu) => `
                  <div style="margin-bottom: 16px;">
                    <div class="item-header">
                      <div>
                        <div class="item-title">${edu.degree}</div>
                        <div class="item-company">${edu.institution}</div>
                      </div>
                      <div style="font-size: 14px;">${edu.startDate} - ${edu.endDate}</div>
                    </div>
                    ${edu.description ? `<div style="font-size: 14px;">${edu.description}</div>` : ""}
                  </div>
                `,
                  )
                  .join("")}
              </div>
            `
                : ""
            }
            
            ${
              skills.length > 0 && layout !== "sidebar"
                ? `
              <div class="section">
                <h2>Habilidades</h2>
                <div class="skills-grid">
                  ${skills
                    .map(
                      (skill) => `
                    <div style="font-size: 14px; margin-bottom: 4px;">
                      <span style="font-weight: 500;">${skill.name}</span> - ${skill.level}%
                    </div>
                  `,
                    )
                    .join("")}
                </div>
              </div>
            `
                : ""
            }
            
            ${
              layout === "sidebar"
                ? `
                </div>
              </div>
            `
                : `</div>`
            }
          </div>
        </body>
      </html>
    `
  } else if (template === "creative") {
    printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>CV - ${basicInfo.fullName}</title>
          <meta charset="utf-8">
          <style>
            ${baseStyles}
            
            .header { 
              background: linear-gradient(135deg, #9333ea, #2563eb) !important;
              color: white !important; 
              padding: 32px; 
              -webkit-print-color-adjust: exact !important;
            }
            
            .header * { color: white !important; }
            
            .profile-section {
              display: flex;
              align-items: center;
              gap: 24px;
            }
            
            .profile-photo {
              width: 96px;
              height: 96px;
              border-radius: 50%;
              object-fit: cover;
              border: 4px solid rgba(255,255,255,0.2);
            }
            
            .header h1 { font-size: 36px; font-weight: bold; margin-bottom: 8px; }
            .header-subtitle { font-size: 20px; opacity: 0.9; margin-bottom: 16px; }
            
            .contact-info { 
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 8px;
              font-size: 14px; 
            }
            
            .content { padding: 32px; }
            .section { margin-bottom: 32px; }
            
            .section h2 { 
              font-size: 24px; 
              font-weight: bold; 
              margin-bottom: 16px; 
              display: flex;
              align-items: center;
            }
            
            .section-icon {
              width: 32px;
              height: 32px;
              border-radius: 50%;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              margin-right: 12px;
              font-size: 16px;
            }
            
            .purple-section h2 { color: #9333ea !important; }
            .purple-section .section-icon { background-color: #f3e8ff !important; }
            .purple-section .item-bg { background-color: #f3e8ff !important; }
            
            .blue-section h2 { color: #2563eb !important; }
            .blue-section .section-icon { background-color: #dbeafe !important; }
            .blue-section .item-bg { background-color: #dbeafe !important; }
            
            .green-section h2 { color: #059669 !important; }
            .green-section .section-icon { background-color: #d1fae5 !important; }
            .green-section .item-bg { background-color: #d1fae5 !important; }
            
            .orange-section h2 { color: #ea580c !important; }
            .orange-section .section-icon { background-color: #fed7aa !important; }
            .orange-section .item-bg { background-color: #fed7aa !important; }
            
            .item-bg {
              padding: 16px;
              border-radius: 8px;
              margin-bottom: 16px;
            }
            
            .item-header { 
              display: flex;
              justify-content: space-between;
              margin-bottom: 8px; 
            }
            
            .item-title { font-size: 20px; font-weight: 600; }
            .item-company { font-size: 18px; font-weight: 500; }
            
            .item-date { 
              padding: 4px 12px; 
              border-radius: 20px; 
              font-size: 12px; 
              font-weight: 600;
            }
            
            .skills-grid { 
              display: grid;
              grid-template-columns: ${layout === "modern" ? "1fr" : "1fr 1fr"};
              gap: 16px;
            }
            
            .skill-item {
              padding: 12px;
              border-radius: 8px;
              margin-bottom: 8px;
            }
            
            .skill-header { display: flex; justify-content: space-between; margin-bottom: 8px; }
            .skill-bar { width: 100%; height: 8px; border-radius: 4px; }
            .skill-progress { height: 100%; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="profile-section">
                ${basicInfo.photo ? `<img src="${basicInfo.photo}" alt="Profile" class="profile-photo" />` : ""}
                <div style="flex: 1;">
                  <h1>${basicInfo.fullName || "Tu Nombre"}</h1>
                  ${basicInfo.title ? `<div class="header-subtitle">${basicInfo.title}</div>` : ""}
                  ${
                    layout !== "sidebar"
                      ? `
                    <div class="contact-info">
                      ${basicInfo.email ? `<div>📧 ${basicInfo.email}</div>` : ""}
                      ${basicInfo.phone ? `<div>📱 ${basicInfo.phone}</div>` : ""}
                      ${basicInfo.location ? `<div>📍 ${basicInfo.location}</div>` : ""}
                      ${basicInfo.website ? `<div>🌐 ${basicInfo.website}</div>` : ""}
                    </div>
                  `
                      : ""
                  }
                </div>
              </div>
            </div>
            
            ${
              layout === "sidebar"
                ? `
              <div class="sidebar-layout">
                <div class="sidebar" style="background: linear-gradient(135deg, #f3e8ff, #dbeafe);">
                  <div style="margin-bottom: 32px;">
                    <h3 style="color: #7c3aed; font-size: 18px; font-weight: bold; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #8b5cf6;">
                      📞 Contacto
                    </h3>
                    <div style="font-size: 14px; line-height: 1.8;">
                      ${basicInfo.email ? `<div style="margin-bottom: 8px;">📧 ${basicInfo.email}</div>` : ""}
                      ${basicInfo.phone ? `<div style="margin-bottom: 8px;">📱 ${basicInfo.phone}</div>` : ""}
                      ${basicInfo.location ? `<div style="margin-bottom: 8px;">📍 ${basicInfo.location}</div>` : ""}
                      ${basicInfo.website ? `<div style="margin-bottom: 8px;">🌐 ${basicInfo.website}</div>` : ""}
                    </div>
                  </div>
                  
                  ${
                    skills.length > 0
                      ? `
                    <div style="margin-bottom: 32px;">
                      <h3 style="color: #ea580c; font-size: 18px; font-weight: bold; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #f97316;">
                        🚀 Habilidades
                      </h3>
                      ${skills
                        .map(
                          (skill) => `
                        <div style="background-color: #fed7aa; padding: 12px; border-radius: 8px; margin-bottom: 8px;">
                          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span style="font-weight: 500; color: #9a3412;">${skill.name}</span>
                            <span style="background-color: #fdba74; color: #9a3412; padding: 2px 8px; border-radius: 12px; font-size: 12px;">${skill.level}%</span>
                          </div>
                          <div style="width: 100%; height: 8px; background-color: #fdba74; border-radius: 4px;">
                            <div style="height: 100%; width: ${skill.level}%; background-color: #ea580c; border-radius: 4px;"></div>
                          </div>
                        </div>
                      `,
                        )
                        .join("")}
                    </div>
                  `
                      : ""
                  }
                  
                  ${
                    basicInfo.summary && layout === "sidebar"
                      ? `
                    <div>
                      <h3 style="color: #9333ea; font-size: 18px; font-weight: bold; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #8b5cf6;">
                        ✨ Sobre Mí
                      </h3>
                      <div style="background-color: #f3e8ff; padding: 16px; border-radius: 8px;">
                        <p style="font-size: 14px; line-height: 1.6;">${basicInfo.summary}</p>
                      </div>
                    </div>
                  `
                      : ""
                  }
                </div>
                <div class="main-content">
            `
                : layout === "modern"
                  ? `
              <div class="content">
                ${
                  basicInfo.summary
                    ? `
                  <div class="section purple-section">
                    <h2><span class="section-icon">✨</span>Sobre Mí</h2>
                    <div class="item-bg">
                      <p>${basicInfo.summary}</p>
                    </div>
                  </div>
                `
                    : ""
                }
                <div class="modern-layout">
                  <div>
            `
                  : `<div class="content">`
            }
            
            ${
              basicInfo.summary && layout !== "sidebar" && layout !== "modern"
                ? `
              <div class="section purple-section">
                <h2><span class="section-icon">✨</span>Sobre Mí</h2>
                <div class="item-bg">
                  <p>${basicInfo.summary}</p>
                </div>
              </div>
            `
                : ""
            }
            
            ${
              experience.length > 0
                ? `
              <div class="section blue-section">
                <h2><span class="section-icon">💼</span>Experiencia</h2>
                ${experience
                  .map(
                    (exp) => `
                  <div class="item-bg">
                    <div class="item-header">
                      <div>
                        <div class="item-title" style="color: #1e40af;">${exp.position}</div>
                        <div class="item-company" style="color: #2563eb;">${exp.company}</div>
                      </div>
                      <div class="item-date" style="background-color: #bfdbfe; color: #1e40af;">
                        ${exp.startDate} - ${exp.endDate || "Presente"}
                      </div>
                    </div>
                    ${exp.description ? `<div>${exp.description}</div>` : ""}
                  </div>
                `,
                  )
                  .join("")}
              </div>
            `
                : ""
            }
            
            ${
              education.length > 0
                ? `
              <div class="section green-section">
                <h2><span class="section-icon">🎓</span>Educación</h2>
                ${education
                  .map(
                    (edu) => `
                  <div class="item-bg">
                    <div class="item-header">
                      <div>
                        <div class="item-title" style="color: #047857;">${edu.degree}</div>
                        <div class="item-company" style="color: #059669;">${edu.institution}</div>
                      </div>
                      <div class="item-date" style="background-color: #a7f3d0; color: #047857;">
                        ${edu.startDate} - ${edu.endDate}
                      </div>
                    </div>
                    ${edu.description ? `<div style="font-size: 14px; color: #374151;">${edu.description}</div>` : ""}
                  </div>
                `,
                  )
                  .join("")}
              </div>
            `
                : ""
            }
            
            ${
              layout === "modern"
                ? `
                  </div>
                  <div>
                    ${
                      skills.length > 0
                        ? `
                      <div class="section orange-section">
                        <h2><span class="section-icon">🚀</span>Habilidades</h2>
                        <div class="skills-grid">
                          ${skills
                            .map(
                              (skill) => `
                            <div class="skill-item" style="background-color: #fed7aa;">
                              <div class="skill-header">
                                <span style="font-weight: 500; color: #9a3412;">${skill.name}</span>
                                <span style="background-color: #fdba74; color: #9a3412; padding: 2px 8px; border-radius: 12px; font-size: 12px;">${skill.level}%</span>
                              </div>
                              <div class="skill-bar" style="background-color: #fdba74;">
                                <div class="skill-progress" style="width: ${skill.level}%; background-color: #ea580c;"></div>
                              </div>
                            </div>
                          `,
                            )
                            .join("")}
                        </div>
                      </div>
                    `
                        : ""
                    }
                  </div>
                </div>
              </div>
            `
                : skills.length > 0 && layout !== "sidebar"
                  ? `
              <div class="section orange-section">
                <h2><span class="section-icon">🚀</span>Habilidades</h2>
                <div class="skills-grid">
                  ${skills
                    .map(
                      (skill) => `
                    <div class="skill-item" style="background-color: #fed7aa;">
                      <div class="skill-header">
                        <span style="font-weight: 500; color: #9a3412;">${skill.name}</span>
                        <span style="background-color: #fdba74; color: #9a3412; padding: 2px 8px; border-radius: 12px; font-size: 12px;">${skill.level}%</span>
                      </div>
                      <div class="skill-bar" style="background-color: #fdba74;">
                        <div class="skill-progress" style="width: ${skill.level}%; background-color: #ea580c;"></div>
                      </div>
                    </div>
                  `,
                    )
                    .join("")}
                </div>
              </div>
            `
                  : ""
            }
            
            ${
              layout === "sidebar"
                ? `
                </div>
              </div>
            `
                : layout !== "modern"
                  ? `</div>`
                  : ""
            }
          </div>
        </body>
      </html>
    `
  }

  printWindow.document.write(printContent)
  printWindow.document.close()

  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print()
    }, 500)
  }
}

export const printCoverLetter = (template: string, data: CoverLetterData) => {
  const printWindow = window.open("", "_blank")
  if (!printWindow) return

  const formattedDate = data.date ? format(new Date(data.date), "d 'de' MMMM 'de' yyyy", { locale: es }) : ""

  let printContent = ""

  if (template === "custom") {
    const headerStyle =
      data.customization.headerStyle === "gradient"
        ? `background: linear-gradient(135deg, ${data.customization.headerColor}, ${data.customization.accentColor}) !important;`
        : data.customization.headerStyle === "pattern"
          ? `background-color: ${data.customization.headerColor} !important; background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0) !important; background-size: 20px 20px !important;`
          : `background-color: ${data.customization.headerColor} !important;`

    printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Carta de Presentación - ${data.fullName}</title>
          <meta charset="utf-8">
          <style>
            * { 
              margin: 0; 
              padding: 0; 
              box-sizing: border-box; 
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            @page {
              size: A4;
              margin: 0.5in;
            }
            
            body { 
              font-family: ${data.customization.fontFamily}, Arial, sans-serif; 
              color: ${data.customization.textColor}; 
              background-color: ${data.customization.backgroundColor};
              line-height: 1.6;
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            .container { 
              max-width: 100%; 
              margin: 0 auto; 
              background: white; 
              border-radius: ${data.customization.borderRadius}px;
              overflow: hidden;
            }
            
            .header { 
              ${headerStyle}
              color: white !important; 
              padding: 32px; 
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            .header * {
              color: white !important;
            }
            
            .header h1 { 
              font-size: 32px; 
              font-weight: bold; 
              margin-bottom: 16px; 
              color: white !important;
            }
            
            .header-subtitle { 
              font-size: 18px; 
              margin-bottom: 16px; 
              color: white !important;
            }
            
            .header-info { 
              display: table;
              width: 100%;
              table-layout: fixed;
              font-size: 14px; 
            }
            
            .header-info-col {
              display: table-cell;
              width: 50%;
              vertical-align: top;
              padding-right: 16px;
            }
            
            .header-info-col:last-child {
              padding-right: 0;
              padding-left: 16px;
            }
            
            .header-info div { 
              margin-bottom: 8px; 
              color: white !important;
            }
            
            .content { 
              padding: 32px; 
            }
            
            .recipient { 
              margin-bottom: 24px; 
            }
            
            .recipient h3 { 
              font-weight: 600; 
              color: ${data.customization.headerColor} !important; 
            }
            
            .recipient p { 
              font-weight: 600; 
              color: ${data.customization.accentColor} !important; 
            }
            
            .letter-content { 
              margin-bottom: 24px; 
            }
            
            .greeting { 
              font-size: 18px; 
              font-weight: 500; 
              margin-bottom: 16px; 
            }
            
            .paragraph { 
              padding: 16px; 
              margin-bottom: 16px; 
              border-radius: ${data.customization.borderRadius}px; 
              text-align: justify; 
              line-height: 1.6; 
              page-break-inside: avoid;
            }
            
            .intro { 
              background-color: ${data.customization.accentColor}20 !important; 
              border-left: 4px solid ${data.customization.accentColor}; 
            }
            
            .body { 
              background-color: ${data.customization.headerColor}15 !important; 
            }
            
            .closing-para { 
              background-color: ${data.customization.accentColor}20 !important; 
              border-left: 4px solid ${data.customization.accentColor}; 
            }
            
            .signature { 
              margin-top: 32px; 
              padding-top: 16px; 
              border-top: 2px solid ${data.customization.accentColor}; 
            }
            
            .signature-name { 
              margin-top: 16px; 
              font-weight: 600; 
              font-size: 18px; 
              color: ${data.customization.headerColor} !important; 
            }
            
            @media print {
              body { 
                margin: 0 !important; 
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              
              .container { 
                box-shadow: none !important; 
                border-radius: 0 !important;
              }
              
              .header {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              
              * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${data.fullName}</h1>
              <div class="header-subtitle">Candidato para ${data.position}</div>
              <div class="header-info">
                <div class="header-info-col">
                  ${data.email ? `<div>${data.customization.showIcons ? "📧 " : ""}${data.email}</div>` : ""}
                  ${data.phone ? `<div>${data.customization.showIcons ? "📱 " : ""}${data.phone}</div>` : ""}
                </div>
                <div class="header-info-col">
                  ${data.city ? `<div>${data.customization.showIcons ? "📍 " : ""}${data.city}</div>` : ""}
                  ${formattedDate ? `<div>${data.customization.showIcons ? "📅 " : ""}${formattedDate}</div>` : ""}
                </div>
              </div>
            </div>
            
            <div class="content">
              <div class="recipient">
                <h3>${data.hiringManager || "Responsable de Contratación"}</h3>
                <p>${data.company}</p>
              </div>
              
              <div class="letter-content">
                <div class="greeting">${data.greeting || "Estimado/a Responsable de Contratación,"}</div>
                
                ${data.introduction ? `<div class="paragraph intro">${data.introduction}</div>` : ""}
                ${data.body ? `<div class="paragraph body">${data.body}</div>` : ""}
                ${data.closing ? `<div class="paragraph closing-para">${data.closing}</div>` : ""}
                
                <div class="signature">
                  <div>${data.signature || "Atentamente,"}</div>
                  <div class="signature-name">${data.fullName}</div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `
  } else {
    // Template básico mejorado
    printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Carta de Presentación - ${data.fullName}</title>
          <meta charset="utf-8">
          <style>
            * { 
              margin: 0; 
              padding: 0; 
              box-sizing: border-box; 
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            @page {
              size: A4;
              margin: 0.5in;
            }
            
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            .container { 
              max-width: 100%; 
              margin: 0 auto; 
              background: white; 
              padding: 32px; 
            }
            
            .header { 
              display: table;
              width: 100%;
              margin-bottom: 32px; 
            }
            
            .header-left {
              display: table-cell;
              width: 60%;
              vertical-align: top;
            }
            
            .header-right {
              display: table-cell;
              width: 40%;
              vertical-align: top;
              text-align: right;
            }
            
            .header h1 { 
              font-size: 24px; 
              font-weight: bold; 
            }
            
            .recipient { 
              margin-bottom: 24px; 
            }
            
            .recipient h3 { 
              font-weight: 600; 
            }
            
            .letter-content p { 
              margin-bottom: 16px; 
              text-align: justify; 
            }
            
            .signature { 
              margin-top: 32px; 
            }
            
            .signature-name { 
              margin-top: 16px; 
              font-weight: 600; 
            }
            
            @media print { 
              body { 
                margin: 0 !important; 
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
                print-color-adjust: exact !important;
              } 
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="header-left">
                <h1>${data.fullName}</h1>
                <p>${data.email}</p>
                <p>${data.phone}</p>
              </div>
              <div class="header-right">
                <p>${formattedDate}</p>
                <p>${data.city}</p>
              </div>
            </div>
            
            <div class="recipient">
              <h3>${data.hiringManager || "Responsable de Contratación"}</h3>
              <p>${data.company}</p>
            </div>
            
            <div class="letter-content">
              <p>${data.greeting || "Estimado/a Responsable de Contratación,"}</p>
              ${data.introduction ? `<p>${data.introduction}</p>` : ""}
              ${data.body ? `<p>${data.body}</p>` : ""}
              ${data.closing ? `<p>${data.closing}</p>` : ""}
              
              <div class="signature">
                <p>${data.signature || "Atentamente,"}</p>
                <p class="signature-name">${data.fullName}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `
  }

  printWindow.document.write(printContent)
  printWindow.document.close()

  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print()
    }, 500)
  }
}

export const printJobProposal = (template: string, data: JobProposalData) => {
  const printWindow = window.open("", "_blank")
  if (!printWindow) return

  const { basicInfo, projectScope, deliverables, timeline, pricing, customization } = data
  const formattedDate = basicInfo.date ? format(new Date(basicInfo.date), "d 'de' MMMM 'de' yyyy", { locale: es }) : ""

  let printContent = ""

  if (template === "custom") {
    const headerStyle =
      customization.headerStyle === "gradient"
        ? `background: linear-gradient(135deg, ${customization.headerColor}, ${customization.accentColor}) !important;`
        : customization.headerStyle === "pattern"
          ? `background-color: ${customization.headerColor} !important; background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0) !important; background-size: 20px 20px !important;`
          : `background-color: ${customization.headerColor} !important;`

    const logoHtml = basicInfo.logo
      ? `
      <div style="display: table-cell; width: 30%; vertical-align: middle; text-align: ${customization.logoPosition === "center" ? "center" : customization.logoPosition === "left" ? "left" : "right"};">
        <img src="${basicInfo.logo}" alt="Logo" style="height: 80px; width: auto; object-fit: contain; background: rgba(255,255,255,0.1); backdrop-filter: blur(4px); padding: 12px; border-radius: ${customization.borderRadius}px;" />
      </div>
    `
      : ""

    printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Propuesta - ${basicInfo.projectTitle}</title>
          <meta charset="utf-8">
          <style>
            * { 
              margin: 0; 
              padding: 0; 
              box-sizing: border-box; 
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            @page {
              size: A4;
              margin: 0.5in;
            }
            
            body { 
              font-family: ${customization.fontFamily}, Arial, sans-serif; 
              color: ${customization.textColor}; 
              background-color: ${customization.backgroundColor};
              line-height: 1.6;
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            .container { 
              max-width: 100%; 
              margin: 0 auto; 
              background: white; 
              border-radius: ${customization.borderRadius}px;
              overflow: hidden;
            }
            
            .header { 
              ${headerStyle}
              color: white !important; 
              padding: 32px; 
              display: table;
              width: 100%;
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            .header * {
              color: white !important;
            }
            
            .header-content {
              display: table-cell;
              width: ${basicInfo.logo ? "70%" : "100%"};
              vertical-align: middle;
            }
            
            .header-content h1 { 
              font-size: 36px; 
              font-weight: bold; 
              margin-bottom: 8px; 
              color: white !important;
            }
            
            .header-subtitle { 
              font-size: 18px; 
              margin-bottom: 24px; 
              color: white !important;
            }
            
            .header-info { 
              display: table;
              width: 100%;
              font-size: 14px; 
            }
            
            .header-info > div { 
              display: table-cell;
              width: 50%;
              vertical-align: top;
              padding-right: 32px;
            }
            
            .header-info > div:last-child {
              padding-right: 0;
            }
            
            .content { 
              padding: 32px; 
            }
            
            .section { 
              margin-bottom: 32px; 
              page-break-inside: avoid;
            }
            
            .section h2 { 
              font-size: 24px; 
              font-weight: bold; 
              color: ${customization.headerColor} !important; 
              margin-bottom: 16px; 
              padding-bottom: 8px; 
              border-bottom: 2px solid ${customization.accentColor}; 
              display: flex; 
              align-items: center; 
            }
            
            .section h2 .icon { 
              margin-right: 8px; 
            }
            
            .section-content { 
              background-color: ${customization.accentColor}15 !important; 
              padding: 16px; 
              border-radius: ${customization.borderRadius}px; 
              margin-bottom: 16px; 
            }
            
            .deliverable-item { 
              background-color: ${customization.headerColor}15 !important; 
              padding: 16px; 
              border-radius: ${customization.borderRadius}px; 
              margin-bottom: 16px; 
              page-break-inside: avoid;
            }
            
            .deliverable-title { 
              font-size: 18px; 
              font-weight: 600; 
              color: ${customization.headerColor} !important; 
              margin-bottom: 8px; 
            }
            
            .timeline-table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-bottom: 16px; 
            }
            
            .timeline-table th, .timeline-table td { 
              border: 1px solid ${customization.accentColor}60; 
              padding: 12px; 
              text-align: left; 
            }
            
            .timeline-table th { 
              background-color: ${customization.accentColor}30 !important; 
              font-weight: 600; 
              color: ${customization.headerColor} !important; 
            }
            
            .pricing-section { 
              background-color: ${customization.accentColor}20 !important; 
              padding: 24px; 
              border-radius: ${customization.borderRadius}px; 
            }
            
            .total-price { 
              display: table;
              width: 100%;
              margin-bottom: 16px; 
            }
            
            .total-price-left {
              display: table-cell;
              width: 70%;
              vertical-align: middle;
            }
            
            .total-price-right {
              display: table-cell;
              width: 30%;
              vertical-align: middle;
              text-align: right;
            }
            
            .total-amount { 
              font-size: 24px; 
              font-weight: bold; 
              color: ${customization.headerColor} !important; 
            }
            
            .footer { 
              margin-top: 48px; 
              padding-top: 24px; 
              border-top: 2px solid ${customization.accentColor}; 
              text-align: center; 
              color: #6b7280; 
            }
            
            @media print {
              body { 
                margin: 0 !important; 
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              
              .container { 
                box-shadow: none !important; 
                border-radius: 0 !important;
              }
              
              .header {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              
              * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="header-content">
                <h1>${basicInfo.projectTitle}</h1>
                <div class="header-subtitle">Una propuesta para ${basicInfo.clientName}</div>
                <div class="header-info">
                  <div>
                    <div style="opacity: 0.8;">Por:</div>
                    <div style="font-weight: 600;">${basicInfo.yourName}</div>
                  </div>
                  <div>
                    <div style="opacity: 0.8;">Fecha:</div>
                    <div style="font-weight: 600;">${formattedDate}</div>
                  </div>
                </div>
              </div>
              ${logoHtml}
            </div>
            
            <div class="content">
              ${
                basicInfo.introduction
                  ? `
                <div class="section">
                  <h2>${customization.showIcons ? "✨ " : ""}Introducción</h2>
                  <div class="section-content">${basicInfo.introduction}</div>
                </div>
              `
                  : ""
              }
              
              <div class="section">
                <h2>${customization.showIcons ? "🎯 " : ""}Alcance del Proyecto</h2>
                ${
                  projectScope.description
                    ? `
                  <div class="section-content">
                    <h3 style="color: ${customization.headerColor}; margin-bottom: 8px;">Descripción</h3>
                    <p>${projectScope.description}</p>
                  </div>
                `
                    : ""
                }
                ${
                  projectScope.objectives
                    ? `
                  <div class="section-content">
                    <h3 style="color: ${customization.headerColor}; margin-bottom: 8px;">Objetivos</h3>
                    <p>${projectScope.objectives}</p>
                  </div>
                `
                    : ""
                }
                ${
                  projectScope.requirements
                    ? `
                  <div class="section-content">
                    <h3 style="color: ${customization.headerColor}; margin-bottom: 8px;">Requisitos</h3>
                    <p>${projectScope.requirements}</p>
                  </div>
                `
                    : ""
                }
              </div>
              
              ${
                deliverables.length > 0
                  ? `
                <div class="section">
                  <h2>${customization.showIcons ? "📦 " : ""}Entregables</h2>
                  ${deliverables
                    .map(
                      (deliverable) => `
                    <div class="deliverable-item">
                      <div class="deliverable-title">${deliverable.name}</div>
                      <p>${deliverable.description}</p>
                    </div>
                  `,
                    )
                    .join("")}
                </div>
              `
                  : ""
              }
              
              ${
                timeline.length > 0
                  ? `
                <div class="section">
                  <h2>${customization.showIcons ? "📅 " : ""}Cronograma</h2>
                  <table class="timeline-table">
                    <thead>
                      <tr>
                        <th>Hito</th>
                        <th>Fecha Límite</th>
                        <th>Pago</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${timeline
                        .map(
                          (milestone) => `
                        <tr>
                          <td>${milestone.name}</td>
                          <td>${milestone.deadline ? format(new Date(milestone.deadline), "dd/MM/yyyy") : ""}</td>
                          <td style="font-weight: 600;">${milestone.payment}</td>
                        </tr>
                      `,
                        )
                        .join("")}
                    </tbody>
                  </table>
                </div>
              `
                  : ""
              }
              
              <div class="section">
                <h2>${customization.showIcons ? "💰 " : ""}Inversión</h2>
                <div class="pricing-section">
                  <div class="total-price">
                    <div class="total-price-left">
                      <h3 style="color: ${customization.headerColor};">Precio Total:</h3>
                    </div>
                    <div class="total-price-right">
                      <div class="total-amount">${pricing.totalPrice}</div>
                    </div>
                  </div>
                  ${
                    pricing.paymentTerms
                      ? `
                    <div style="margin-bottom: 16px;">
                      <h3 style="color: ${customization.headerColor}; margin-bottom: 8px;">Términos de Pago</h3>
                      <p>${pricing.paymentTerms}</p>
                    </div>
                  `
                      : ""
                  }
                  ${
                    pricing.additionalNotes
                      ? `
                    <div>
                      <h3 style="color: ${customization.headerColor}; margin-bottom: 8px;">Notas Adicionales</h3>
                      <p>${pricing.additionalNotes}</p>
                    </div>
                  `
                      : ""
                  }
                </div>
              </div>
              
              <div class="footer">
                <p>Esta propuesta es válida por 30 días a partir de la fecha indicada.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `
  } else {
    // Template básico mejorado
    printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Propuesta - ${basicInfo.projectTitle}</title>
          <meta charset="utf-8">
          <style>
            * { 
              margin: 0; 
              padding: 0; 
              box-sizing: border-box; 
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            @page {
              size: A4;
              margin: 0.5in;
            }
            
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            .container { 
              max-width: 100%; 
              margin: 0 auto; 
              background: white; 
              padding: 32px; 
            }
            
            .header { 
              text-align: center; 
              margin-bottom: 32px; 
              padding-bottom: 24px; 
              border-bottom: 2px solid #e2e8f0; 
            }
            
            .header h1 { 
              font-size: 32px; 
              font-weight: bold; 
              margin-bottom: 8px; 
            }
            
            .header h2 { 
              font-size: 20px; 
              color: #64748b; 
              margin-bottom: 16px; 
            }
            
            .section { 
              margin-bottom: 32px; 
              page-break-inside: avoid;
            }
            
            .section h2 { 
              font-size: 24px; 
              font-weight: bold; 
              margin-bottom: 16px; 
            }
            
            .timeline-table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-bottom: 16px; 
            }
            
            .timeline-table th, .timeline-table td { 
              border: 1px solid #ddd; 
              padding: 8px; 
              text-align: left; 
            }
            
            .timeline-table th { 
              background-color: #f2f2f2 !important; 
            }
            
            .total { 
              text-align: right; 
              font-weight: bold; 
              font-size: 18px; 
            }
            
            .footer { 
              margin-top: 48px; 
              text-align: center; 
              font-size: 12px; 
              color: #6b7280; 
            }
            
            @media print { 
              body { 
                margin: 0 !important; 
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
                print-color-adjust: exact !important;
              } 
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              ${basicInfo.logo ? `<img src="${basicInfo.logo}" alt="Logo" style="height: 64px; width: auto; margin-bottom: 16px;" />` : ""}
              <h1>Propuesta de Proyecto</h1>
              <h2>${basicInfo.projectTitle}</h2>
              <p>Preparado por ${basicInfo.yourName} para ${basicInfo.clientName}</p>
              <p>${formattedDate}</p>
            </div>
            
            ${
              basicInfo.introduction
                ? `
              <div class="section">
                <h2>Introducción</h2>
                <p>${basicInfo.introduction}</p>
              </div>
            `
                : ""
            }
            
            <div class="section">
              <h2>Alcance del Proyecto</h2>
              ${projectScope.description ? `<div><h3>Descripción</h3><p>${projectScope.description}</p></div>` : ""}
              ${projectScope.objectives ? `<div><h3>Objetivos</h3><p>${projectScope.objectives}</p></div>` : ""}
              ${projectScope.requirements ? `<div><h3>Requisitos</h3><p>${projectScope.requirements}</p></div>` : ""}
            </div>
            
            ${
              deliverables.length > 0
                ? `
              <div class="section">
                <h2>Entregables</h2>
                ${deliverables
                  .map(
                    (deliverable) => `
                  <div style="margin-bottom: 16px; border-bottom: 1px solid #eee; padding-bottom: 16px;">
                    <h3>${deliverable.name}</h3>
                    <p>${deliverable.description}</p>
                  </div>
                `,
                  )
                  .join("")}
              </div>
            `
                : ""
            }
            
            ${
              timeline.length > 0
                ? `
              <div class="section">
                <h2>Cronograma</h2>
                <table class="timeline-table">
                  <thead>
                    <tr>
                      <th>Hito</th>
                      <th>Fecha Límite</th>
                      <th>Pago</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${timeline
                      .map(
                        (milestone) => `
                      <tr>
                        <td>${milestone.name}</td>
                        <td>${milestone.deadline ? format(new Date(milestone.deadline), "dd/MM/yyyy") : ""}</td>
                        <td>${milestone.payment}</td>
                      </tr>
                    `,
                      )
                      .join("")}
                  </tbody>
                </table>
              </div>
            `
                : ""
            }
            
            <div class="section">
              <h2>Precios y Pagos</h2>
              <div class="total">
                <p>Precio Total: ${pricing.totalPrice}</p>
              </div>
              ${pricing.paymentTerms ? `<p><strong>Términos de Pago:</strong> ${pricing.paymentTerms}</p>` : ""}
              ${pricing.additionalNotes ? `<p><strong>Notas Adicionales:</strong> ${pricing.additionalNotes}</p>` : ""}
            </div>
            
            <div class="footer">
              <p>Esta propuesta es válida por 30 días a partir de la fecha indicada.</p>
            </div>
          </div>
        </body>
      </html>
    `
  }

  printWindow.document.write(printContent)
  printWindow.document.close()

  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print()
    }, 500)
  }
}
