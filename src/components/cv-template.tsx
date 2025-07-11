import type { CVData } from "@/lib/cv-data"
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Award, User } from "lucide-react"
import Image from "next/image"

interface CVTemplateProps {
  template: string
  data: CVData
}

export default function CVTemplate({ template, data }: CVTemplateProps) {
  const { basicInfo, experience, education, skills, customization } = data
  const layout = customization.layout || "traditional"

  const SkillBar = ({ skill }: { skill: (typeof skills)[0] }) => {
    return (
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="font-medium text-sm">{skill.name}</span>
          <span className="text-xs text-gray-600">{skill.level}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: `${skill.level}%`,
              backgroundColor: template === "custom" ? customization.accentColor : getTemplateAccentColor(template),
            }}
          />
        </div>
      </div>
    )
  }

  const getTemplateAccentColor = (template: string) => {
    switch (template) {
      case "modern":
        return "#3b82f6"
      case "classic":
        return "#374151"
      case "creative":
        return "#8b5cf6"
      default:
        return "#3b82f6"
    }
  }

  const getTemplateHeaderColor = (template: string) => {
    switch (template) {
      case "modern":
        return "#1e293b"
      case "classic":
        return "#111827"
      case "creative":
        return "#7c3aed"
      default:
        return "#1e293b"
    }
  }

  const renderContactInfo = () => (
    <div className="flex flex-wrap gap-4 text-sm">
      {basicInfo.email && (
        <div className="flex items-center gap-1">
          {customization.showIcons && <Mail className="w-4 h-4" />}
          <span>{basicInfo.email}</span>
        </div>
      )}
      {basicInfo.phone && (
        <div className="flex items-center gap-1">
          {customization.showIcons && <Phone className="w-4 h-4" />}
          <span>{basicInfo.phone}</span>
        </div>
      )}
      {basicInfo.location && (
        <div className="flex items-center gap-1">
          {customization.showIcons && <MapPin className="w-4 h-4" />}
          <span>{basicInfo.location}</span>
        </div>
      )}
      {basicInfo.website && (
        <div className="flex items-center gap-1">
          {customization.showIcons && <Globe className="w-4 h-4" />}
          <span>{basicInfo.website}</span>
        </div>
      )}
    </div>
  )

  const renderHeader = () => {
    if (template === "custom") {
      const headerStyle =
        customization.headerStyle === "gradient"
          ? { background: `linear-gradient(135deg, ${customization.headerColor}, ${customization.accentColor})` }
          : customization.headerStyle === "pattern"
            ? {
                backgroundColor: customization.headerColor,
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                backgroundSize: "20px 20px",
              }
            : { backgroundColor: customization.headerColor }

      return (
        <div className="text-white p-8 print-preserve-bg" style={headerStyle}>
          <div className="flex items-center space-x-6">
            {basicInfo.photo && (
              <Image
                src={basicInfo.photo || "/placeholder.svg"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
              />
            )}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{basicInfo.fullName || "Tu Nombre"}</h1>
              {basicInfo.title && <p className="text-xl opacity-90 mb-4">{basicInfo.title}</p>}
              {layout !== "sidebar" && renderContactInfo()}
            </div>
          </div>
        </div>
      )
    }

    if (template === "modern") {
      return (
        <div className="bg-slate-800 text-white p-8 print-preserve-bg">
          <div className="flex items-center space-x-6">
            {basicInfo.photo && (
              <Image
                src={basicInfo.photo || "/placeholder.svg"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
              />
            )}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{basicInfo.fullName || "Tu Nombre"}</h1>
              {basicInfo.title && <p className="text-xl opacity-90 mb-4">{basicInfo.title}</p>}
              {layout !== "sidebar" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {basicInfo.email && <p>📧 {basicInfo.email}</p>}
                  {basicInfo.phone && <p>📱 {basicInfo.phone}</p>}
                  {basicInfo.location && <p>📍 {basicInfo.location}</p>}
                  {basicInfo.website && <p>🌐 {basicInfo.website}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }

    if (template === "classic") {
      return (
        <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
          {basicInfo.photo && (
            <Image
              src={basicInfo.photo || "/placeholder.svg"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-gray-200"
            />
          )}
          <h1 className="text-3xl font-bold mb-2">{basicInfo.fullName || "Tu Nombre"}</h1>
          {basicInfo.title && <p className="text-xl text-gray-600 mb-4">{basicInfo.title}</p>}
          {layout !== "sidebar" && (
            <div className="text-sm text-gray-600 space-y-1">
              {basicInfo.email && <p>{basicInfo.email}</p>}
              {basicInfo.phone && <p>{basicInfo.phone}</p>}
              {basicInfo.location && <p>{basicInfo.location}</p>}
              {basicInfo.website && <p>{basicInfo.website}</p>}
            </div>
          )}
        </div>
      )
    }

    if (template === "creative") {
      return (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 print-preserve-bg">
          <div className="flex items-center space-x-6">
            {basicInfo.photo && (
              <Image
                src={basicInfo.photo || "/placeholder.svg"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
              />
            )}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{basicInfo.fullName || "Tu Nombre"}</h1>
              {basicInfo.title && <p className="text-xl opacity-90 mb-4">{basicInfo.title}</p>}
              {layout !== "sidebar" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {basicInfo.email && <p className="flex items-center">📧 {basicInfo.email}</p>}
                  {basicInfo.phone && <p className="flex items-center">📱 {basicInfo.phone}</p>}
                  {basicInfo.location && <p className="flex items-center">📍 {basicInfo.location}</p>}
                  {basicInfo.website && <p className="flex items-center">🌐 {basicInfo.website}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }

    return null
  }

  const renderSidebar = () => {
    if (layout !== "sidebar") return null

    const sidebarBg = template === "custom" ? customization.backgroundColor : "#f8fafc"
    const sidebarTextColor = template === "custom" ? customization.textColor : "#374151"

    return (
      <div
        className="w-full lg:w-80 p-6 print-preserve-bg"
        style={{
          backgroundColor: sidebarBg,
          color: sidebarTextColor,
          borderRight: template === "custom" ? `2px solid ${customization.accentColor}` : "2px solid #e2e8f0",
        }}
      >
        {/* Contact Info in Sidebar */}
        <div className="mb-8">
          <h3
            className="text-lg font-bold mb-4 pb-2 border-b-2"
            style={{
              color: template === "custom" ? customization.headerColor : getTemplateHeaderColor(template),
              borderColor: template === "custom" ? customization.accentColor : getTemplateAccentColor(template),
            }}
          >
            Contacto
          </h3>
          <div className="space-y-3 text-sm">
            {basicInfo.email && (
              <div className="flex items-center gap-2">
                {customization.showIcons && <Mail className="w-4 h-4" />}
                <span>{basicInfo.email}</span>
              </div>
            )}
            {basicInfo.phone && (
              <div className="flex items-center gap-2">
                {customization.showIcons && <Phone className="w-4 h-4" />}
                <span>{basicInfo.phone}</span>
              </div>
            )}
            {basicInfo.location && (
              <div className="flex items-center gap-2">
                {customization.showIcons && <MapPin className="w-4 h-4" />}
                <span>{basicInfo.location}</span>
              </div>
            )}
            {basicInfo.website && (
              <div className="flex items-center gap-2">
                {customization.showIcons && <Globe className="w-4 h-4" />}
                <span>{basicInfo.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills in Sidebar */}
        {skills.length > 0 && (
          <div className="mb-8">
            <h3
              className="text-lg font-bold mb-4 pb-2 border-b-2"
              style={{
                color: template === "custom" ? customization.headerColor : getTemplateHeaderColor(template),
                borderColor: template === "custom" ? customization.accentColor : getTemplateAccentColor(template),
              }}
            >
              {customization.showIcons && <Award className="w-5 h-5 inline mr-2" />}
              Habilidades
            </h3>
            <div className="space-y-4">
              {skills.map((skill) => (
                <SkillBar key={skill.id} skill={skill} />
              ))}
            </div>
          </div>
        )}

        {/* Summary in Sidebar for some layouts */}
        {basicInfo.summary && layout === "sidebar" && (
          <div>
            <h3
              className="text-lg font-bold mb-4 pb-2 border-b-2"
              style={{
                color: template === "custom" ? customization.headerColor : getTemplateHeaderColor(template),
                borderColor: template === "custom" ? customization.accentColor : getTemplateAccentColor(template),
              }}
            >
              {customization.showIcons && <User className="w-5 h-5 inline mr-2" />}
              Resumen
            </h3>
            <p className="text-sm leading-relaxed">{basicInfo.summary}</p>
          </div>
        )}
      </div>
    )
  }

  const renderMainContent = () => {
    const headerColor = template === "custom" ? customization.headerColor : getTemplateHeaderColor(template)
    const accentColor = template === "custom" ? customization.accentColor : getTemplateAccentColor(template)

    return (
      <div className="flex-1 p-8 space-y-8">
        {/* Summary (not in sidebar layout) */}
        {basicInfo.summary && layout !== "sidebar" && (
          <div>
            <h2
              className="text-2xl font-bold mb-4 pb-2 border-b-2 flex items-center"
              style={{ color: headerColor, borderColor: accentColor }}
            >
              {customization.showIcons && <User className="w-6 h-6 mr-2" />}
              Resumen Profesional
            </h2>
            <p className="leading-relaxed">{basicInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2
              className="text-2xl font-bold mb-4 pb-2 border-b-2 flex items-center"
              style={{ color: headerColor, borderColor: accentColor }}
            >
              {customization.showIcons && <Briefcase className="w-6 h-6 mr-2" />}
              Experiencia Laboral
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold" style={{ color: headerColor }}>
                      {exp.position}
                    </h3>
                    <p className="text-lg font-medium" style={{ color: accentColor }}>
                      {exp.company}
                    </p>
                  </div>
                  <span
                    className="text-sm px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: `${accentColor}20`,
                      color: accentColor,
                    }}
                  >
                    {exp.startDate} - {exp.endDate || "Presente"}
                  </span>
                </div>
                {exp.description && <p className="leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2
              className="text-2xl font-bold mb-4 pb-2 border-b-2 flex items-center"
              style={{ color: headerColor, borderColor: accentColor }}
            >
              {customization.showIcons && <GraduationCap className="w-6 h-6 mr-2" />}
              Educación
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: headerColor }}>
                      {edu.degree}
                    </h3>
                    <p style={{ color: accentColor }}>{edu.institution}</p>
                  </div>
                  <span
                    className="text-sm px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: `${accentColor}20`,
                      color: accentColor,
                    }}
                  >
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                {edu.description && <p className="text-sm mt-2 leading-relaxed">{edu.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Skills (not in sidebar layout) */}
        {skills.length > 0 && layout !== "sidebar" && (
          <div>
            <h2
              className="text-2xl font-bold mb-4 pb-2 border-b-2 flex items-center"
              style={{ color: headerColor, borderColor: accentColor }}
            >
              {customization.showIcons && <Award className="w-6 h-6 mr-2" />}
              Habilidades
            </h2>
            <div className={`grid gap-4 ${layout === "modern" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
              {skills.map((skill) => (
                <SkillBar key={skill.id} skill={skill} />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Layout rendering logic
  const containerClass =
    template === "custom"
      ? "bg-white shadow-lg max-w-6xl mx-auto print:shadow-none print-preserve-bg"
      : "bg-white shadow-lg max-w-6xl mx-auto print:shadow-none"

  const containerStyle =
    template === "custom"
      ? {
          fontFamily: customization.fontFamily,
          color: customization.textColor,
          backgroundColor: customization.backgroundColor,
          borderRadius: `${customization.borderRadius}px`,
        }
      : {}

  if (layout === "sidebar") {
    return (
      <div className={containerClass} style={containerStyle}>
        {template !== "classic" && renderHeader()}
        {template === "classic" && <div className="p-8">{renderHeader()}</div>}
        <div className="flex flex-col lg:flex-row">
          {renderSidebar()}
          {renderMainContent()}
        </div>
      </div>
    )
  }

  if (layout === "modern") {
    return (
      <div className={containerClass} style={containerStyle}>
        {renderHeader()}
        <div className="p-8">
          {basicInfo.summary && (
            <div className="mb-8">
              <h2
                className="text-2xl font-bold mb-4 pb-2 border-b-2 flex items-center"
                style={{
                  color: template === "custom" ? customization.headerColor : getTemplateHeaderColor(template),
                  borderColor: template === "custom" ? customization.accentColor : getTemplateAccentColor(template),
                }}
              >
                {customization.showIcons && <User className="w-6 h-6 mr-2" />}
                Resumen Profesional
              </h2>
              <p className="leading-relaxed">{basicInfo.summary}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Experience and Education */}
              {experience.length > 0 && (
                <div className="mb-8">
                  <h2
                    className="text-2xl font-bold mb-4 pb-2 border-b-2 flex items-center"
                    style={{
                      color: template === "custom" ? customization.headerColor : getTemplateHeaderColor(template),
                      borderColor: template === "custom" ? customization.accentColor : getTemplateAccentColor(template),
                    }}
                  >
                    {customization.showIcons && <Briefcase className="w-6 h-6 mr-2" />}
                    Experiencia Laboral
                  </h2>
                  {experience.map((exp) => (
                    <div key={exp.id} className="mb-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3
                            className="text-xl font-semibold"
                            style={{
                              color:
                                template === "custom" ? customization.headerColor : getTemplateHeaderColor(template),
                            }}
                          >
                            {exp.position}
                          </h3>
                          <p
                            className="text-lg font-medium"
                            style={{
                              color:
                                template === "custom" ? customization.accentColor : getTemplateAccentColor(template),
                            }}
                          >
                            {exp.company}
                          </p>
                        </div>
                        <span
                          className="text-sm px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: `${template === "custom" ? customization.accentColor : getTemplateAccentColor(template)}20`,
                            color: template === "custom" ? customization.accentColor : getTemplateAccentColor(template),
                          }}
                        >
                          {exp.startDate} - {exp.endDate || "Presente"}
                        </span>
                      </div>
                      {exp.description && <p className="leading-relaxed">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              )}

              {education.length > 0 && (
                <div>
                  <h2
                    className="text-2xl font-bold mb-4 pb-2 border-b-2 flex items-center"
                    style={{
                      color: template === "custom" ? customization.headerColor : getTemplateHeaderColor(template),
                      borderColor: template === "custom" ? customization.accentColor : getTemplateAccentColor(template),
                    }}
                  >
                    {customization.showIcons && <GraduationCap className="w-6 h-6 mr-2" />}
                    Educación
                  </h2>
                  {education.map((edu) => (
                    <div key={edu.id} className="mb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3
                            className="text-lg font-semibold"
                            style={{
                              color:
                                template === "custom" ? customization.headerColor : getTemplateHeaderColor(template),
                            }}
                          >
                            {edu.degree}
                          </h3>
                          <p
                            style={{
                              color:
                                template === "custom" ? customization.accentColor : getTemplateAccentColor(template),
                            }}
                          >
                            {edu.institution}
                          </p>
                        </div>
                        <span
                          className="text-sm px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: `${template === "custom" ? customization.accentColor : getTemplateAccentColor(template)}20`,
                            color: template === "custom" ? customization.accentColor : getTemplateAccentColor(template),
                          }}
                        >
                          {edu.startDate} - {edu.endDate}
                        </span>
                      </div>
                      {edu.description && <p className="text-sm mt-2 leading-relaxed">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              {/* Skills */}
              {skills.length > 0 && (
                <div>
                  <h2
                    className="text-xl font-bold mb-4 pb-2 border-b-2 flex items-center"
                    style={{
                      color: template === "custom" ? customization.headerColor : getTemplateHeaderColor(template),
                      borderColor: template === "custom" ? customization.accentColor : getTemplateAccentColor(template),
                    }}
                  >
                    {customization.showIcons && <Award className="w-5 h-5 mr-2" />}
                    Habilidades
                  </h2>
                  <div className="space-y-4">
                    {skills.map((skill) => (
                      <SkillBar key={skill.id} skill={skill} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Traditional layout (default)
  return (
    <div className={containerClass} style={containerStyle}>
      {template !== "classic" && renderHeader()}
      {template === "classic" && <div className="p-8">{renderHeader()}</div>}
      {renderMainContent()}
    </div>
  )
}
