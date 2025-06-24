import type { CVData } from "@/lib/cv-data"
import { Mail, Phone, MapPin, Linkedin, Globe, Briefcase, GraduationCap, Award } from "lucide-react"

interface CVTemplateProps {
  template: string
  data: CVData
}

export default function CVTemplate({ template, data }: CVTemplateProps) {
  const { personalInfo, experience, education, skills, customization } = data

  const getSkillPercentage = (level: string) => {
    switch (level) {
      case "Básico":
        return 25
      case "Intermedio":
        return 50
      case "Avanzado":
        return 75
      case "Experto":
        return 100
      default:
        return 50
    }
  }

  const SkillBar = ({ skill }: { skill: (typeof skills)[0] }) => {
    const percentage = getSkillPercentage(skill.level)

    if (customization.skillBarStyle === "circles") {
      return (
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium">{skill.name}</span>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((dot) => (
              <div
                key={dot}
                className={`w-3 h-3 rounded-full ${
                  dot <= percentage / 20 ? `bg-[${customization.accentColor}]` : "bg-gray-200"
                }`}
                style={{
                  backgroundColor: dot <= percentage / 20 ? customization.accentColor : "#e5e7eb",
                }}
              />
            ))}
          </div>
        </div>
      )
    }

    if (customization.skillBarStyle === "dots") {
      return (
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium">{skill.name}</span>
          <div className="flex space-x-1">
            {[1, 2, 3, 4].map((dot) => (
              <div
                key={dot}
                className={`w-2 h-2 rounded-full ${
                  dot <= percentage / 25 ? `bg-[${customization.accentColor}]` : "bg-gray-200"
                }`}
                style={{
                  backgroundColor: dot <= percentage / 25 ? customization.accentColor : "#e5e7eb",
                }}
              />
            ))}
          </div>
        </div>
      )
    }

    // Default bars
    return (
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="font-medium">{skill.name}</span>
          <span className="text-sm text-gray-600">{skill.level}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: `${percentage}%`,
              backgroundColor: customization.accentColor,
            }}
          />
        </div>
      </div>
    )
  }

  // Componentes reutilizables para las secciones
  const PersonalInfoSection = ({ compact = false }: { compact?: boolean }) => (
    <div className={compact ? "space-y-2" : "space-y-3"}>
      {personalInfo.email && (
        <div className="flex items-center">
          {customization.showIcons && <Mail className="w-4 h-4 mr-2 flex-shrink-0" />}
          <span className={compact ? "text-sm" : ""}>{personalInfo.email}</span>
        </div>
      )}
      {personalInfo.phone && (
        <div className="flex items-center">
          {customization.showIcons && <Phone className="w-4 h-4 mr-2 flex-shrink-0" />}
          <span className={compact ? "text-sm" : ""}>{personalInfo.phone}</span>
        </div>
      )}
      {personalInfo.address && (
        <div className="flex items-center">
          {customization.showIcons && <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />}
          <span className={compact ? "text-sm" : ""}>{personalInfo.address}</span>
        </div>
      )}
      {personalInfo.linkedin && (
        <div className="flex items-center">
          {customization.showIcons && <Linkedin className="w-4 h-4 mr-2 flex-shrink-0" />}
          <span className={compact ? "text-sm" : ""}>{personalInfo.linkedin}</span>
        </div>
      )}
      {personalInfo.website && (
        <div className="flex items-center">
          {customization.showIcons && <Globe className="w-4 h-4 mr-2 flex-shrink-0" />}
          <span className={compact ? "text-sm" : ""}>{personalInfo.website}</span>
        </div>
      )}
    </div>
  )

  const SummarySection = ({ compact = false }: { compact?: boolean }) =>
    personalInfo.summary ? (
      <div>
        <h2
          className={`${compact ? "text-lg" : "text-2xl"} font-bold mb-4 pb-2 border-b-2 flex items-center`}
          style={{
            color: customization.headerColor,
            borderColor: customization.accentColor,
          }}
        >
          {customization.showIcons && <Award className={`${compact ? "w-5 h-5" : "w-6 h-6"} mr-2`} />}
          Resumen Profesional
        </h2>
        <p className={`leading-relaxed ${compact ? "text-sm" : ""}`}>{personalInfo.summary}</p>
      </div>
    ) : null

  const ExperienceSection = ({ compact = false }: { compact?: boolean }) =>
    experience.length > 0 ? (
      <div>
        <h2
          className={`${compact ? "text-lg" : "text-2xl"} font-bold mb-4 pb-2 border-b-2 flex items-center`}
          style={{
            color: customization.headerColor,
            borderColor: customization.accentColor,
          }}
        >
          {customization.showIcons && <Briefcase className={`${compact ? "w-5 h-5" : "w-6 h-6"} mr-2`} />}
          Experiencia Laboral
        </h2>
        {experience.map((exp) => (
          <div key={exp.id} className="mb-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3
                  className={`${compact ? "text-lg" : "text-xl"} font-semibold`}
                  style={{ color: customization.headerColor }}
                >
                  {exp.position}
                </h3>
                <p
                  className={`${compact ? "text-base" : "text-lg"} font-medium`}
                  style={{ color: customization.accentColor }}
                >
                  {exp.company}
                </p>
              </div>
              <span
                className={`${compact ? "text-xs" : "text-sm"} px-3 py-1 rounded-full`}
                style={{
                  backgroundColor: `${customization.accentColor}20`,
                  color: customization.accentColor,
                  borderRadius: `${customization.borderRadius}px`,
                }}
              >
                {exp.startDate} - {exp.current ? "Presente" : exp.endDate}
              </span>
            </div>
            {exp.description && <p className={`leading-relaxed ${compact ? "text-sm" : ""}`}>{exp.description}</p>}
          </div>
        ))}
      </div>
    ) : null

  const EducationSection = ({ compact = false }: { compact?: boolean }) =>
    education.length > 0 ? (
      <div>
        <h2
          className={`${compact ? "text-lg" : "text-2xl"} font-bold mb-4 pb-2 border-b-2 flex items-center`}
          style={{
            color: customization.headerColor,
            borderColor: customization.accentColor,
          }}
        >
          {customization.showIcons && <GraduationCap className={`${compact ? "w-5 h-5" : "w-6 h-6"} mr-2`} />}
          Educación
        </h2>
        {education.map((edu) => (
          <div key={edu.id} className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3
                  className={`${compact ? "text-base" : "text-lg"} font-semibold`}
                  style={{ color: customization.headerColor }}
                >
                  {edu.degree} en {edu.field}
                </h3>
                <p style={{ color: customization.accentColor }}>{edu.institution}</p>
                {edu.gpa && <p className={`${compact ? "text-xs" : "text-sm"} opacity-75`}>Promedio: {edu.gpa}</p>}
              </div>
              <span
                className={`${compact ? "text-xs" : "text-sm"} px-3 py-1 rounded-full`}
                style={{
                  backgroundColor: `${customization.accentColor}20`,
                  color: customization.accentColor,
                  borderRadius: `${customization.borderRadius}px`,
                }}
              >
                {edu.startDate} - {edu.endDate}
              </span>
            </div>
          </div>
        ))}
      </div>
    ) : null

  const SkillsSection = ({ compact = false }: { compact?: boolean }) =>
    skills.length > 0 ? (
      <div>
        <h2
          className={`${compact ? "text-lg" : "text-2xl"} font-bold mb-4 pb-2 border-b-2 flex items-center`}
          style={{
            color: customization.headerColor,
            borderColor: customization.accentColor,
          }}
        >
          {customization.showIcons && <Award className={`${compact ? "w-5 h-5" : "w-6 h-6"} mr-2`} />}
          Habilidades
        </h2>
        <div className={compact ? "space-y-2" : "space-y-3"}>
          {skills.map((skill) => (
            <div key={skill.id}>
              {customization.showSkillBars ? (
                <SkillBar skill={skill} />
              ) : (
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span
                    className={`${compact ? "text-xs" : "text-sm"} px-2 py-1 rounded`}
                    style={{
                      backgroundColor: `${customization.accentColor}20`,
                      color: customization.accentColor,
                      borderRadius: `${customization.borderRadius}px`,
                    }}
                  >
                    {skill.level}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    ) : null

  if (template === "custom") {
    const spacingClass = {
      compact: "space-y-4",
      normal: "space-y-6",
      spacious: "space-y-8",
    }[customization.sectionSpacing]

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

    // Layout Tradicional
    if (customization.layout === "traditional") {
      return (
        <div
          className="bg-white shadow-lg max-w-4xl mx-auto print:shadow-none print-preserve-bg"
          style={{
            fontFamily: customization.fontFamily,
            color: customization.textColor,
            backgroundColor: customization.backgroundColor,
            borderRadius: `${customization.borderRadius}px`,
          }}
        >
          <div className="text-white p-8 print-preserve-bg" style={headerStyle}>
            <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName || "Tu Nombre"}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <PersonalInfoSection />
            </div>
          </div>

          <div className={`p-8 ${spacingClass}`}>
            <SummarySection />
            <ExperienceSection />
            <EducationSection />
            <SkillsSection />
          </div>
        </div>
      )
    }

    // Layout Sidebar
    if (customization.layout === "sidebar") {
      return (
        <div
          className="bg-white shadow-lg max-w-4xl mx-auto print:shadow-none print-preserve-bg flex"
          style={{
            fontFamily: customization.fontFamily,
            color: customization.textColor,
            backgroundColor: customization.backgroundColor,
            borderRadius: `${customization.borderRadius}px`,
            minHeight: "800px",
          }}
        >
          {/* Sidebar */}
          <div className="w-1/3 text-white p-6 print-preserve-bg" style={headerStyle}>
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-4">{personalInfo.fullName || "Tu Nombre"}</h1>
              <PersonalInfoSection compact />
            </div>

            {personalInfo.summary && (
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-3 flex items-center">
                  {customization.showIcons && <Award className="w-5 h-5 mr-2" />}
                  Resumen
                </h2>
                <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
              </div>
            )}

            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 flex items-center">
                {customization.showIcons && <Award className="w-5 h-5 mr-2" />}
                Habilidades
              </h2>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    {customization.showSkillBars ? (
                      <div className="mb-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-sm">{skill.name}</span>
                          <span className="text-xs opacity-75">{skill.level}</span>
                        </div>
                        <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-white transition-all duration-300"
                            style={{ width: `${getSkillPercentage(skill.level)}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-sm">{skill.name}</span>
                        <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">{skill.level}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className={`flex-1 p-8 ${spacingClass}`}>
            <ExperienceSection />
            <EducationSection />
          </div>
        </div>
      )
    }

    // Layout Moderno
    if (customization.layout === "modern") {
      return (
        <div
          className="bg-white shadow-lg max-w-4xl mx-auto print:shadow-none print-preserve-bg"
          style={{
            fontFamily: customization.fontFamily,
            color: customization.textColor,
            backgroundColor: customization.backgroundColor,
            borderRadius: `${customization.borderRadius}px`,
          }}
        >
          <div className="text-white p-8 print-preserve-bg" style={headerStyle}>
            <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName || "Tu Nombre"}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <PersonalInfoSection />
            </div>
          </div>

          <div className={`p-8 ${spacingClass}`}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Columna Principal (2/3) */}
              <div className="lg:col-span-2 space-y-6">
                <ExperienceSection />
                <EducationSection />
              </div>

              {/* Columna Lateral (1/3) */}
              <div className="space-y-6">
                <SummarySection compact />
                <SkillsSection compact />
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  // Existing templates (modern, classic, creative) remain the same
  if (template === "modern") {
    return (
      <div className="bg-white shadow-lg max-w-4xl mx-auto print:shadow-none print-preserve-bg">
        <div className="bg-slate-800 text-white p-8 print-preserve-bg">
          <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName || "Tu Nombre"}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              {personalInfo.email && <p>📧 {personalInfo.email}</p>}
              {personalInfo.phone && <p>📱 {personalInfo.phone}</p>}
            </div>
            <div>
              {personalInfo.address && <p>📍 {personalInfo.address}</p>}
              {personalInfo.linkedin && <p>💼 {personalInfo.linkedin}</p>}
            </div>
          </div>
        </div>

        <div className="p-8">
          {personalInfo.summary && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">
                Resumen Profesional
              </h2>
              <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">
                Experiencia Laboral
              </h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800">{exp.position}</h3>
                      <p className="text-lg text-slate-600">{exp.company}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {exp.startDate} - {exp.current ? "Presente" : exp.endDate}
                    </p>
                  </div>
                  {exp.description && <p className="text-gray-700 leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">Educación</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">
                        {edu.degree} en {edu.field}
                      </h3>
                      <p className="text-slate-600">{edu.institution}</p>
                      {edu.gpa && <p className="text-sm text-gray-500">Promedio: {edu.gpa}</p>}
                    </div>
                    <p className="text-sm text-gray-500">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">Habilidades</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex justify-between items-center">
                    <span className="text-slate-700">{skill.name}</span>
                    <span className="text-sm bg-slate-100 px-2 py-1 rounded">{skill.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (template === "classic") {
    return (
      <div className="bg-white shadow-lg max-w-4xl mx-auto p-8 print:shadow-none">
        <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
          <h1 className="text-3xl font-bold mb-4">{personalInfo.fullName || "Tu Nombre"}</h1>
          <div className="text-sm text-gray-600 space-y-1">
            {personalInfo.email && <p>{personalInfo.email}</p>}
            {personalInfo.phone && <p>{personalInfo.phone}</p>}
            {personalInfo.address && <p>{personalInfo.address}</p>}
            {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}
          </div>
        </div>

        {personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3 uppercase tracking-wide">Objetivo Profesional</h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3 uppercase tracking-wide">Experiencia Laboral</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{exp.position}</h3>
                    <p className="italic">{exp.company}</p>
                  </div>
                  <p className="text-sm">
                    {exp.startDate} - {exp.current ? "Presente" : exp.endDate}
                  </p>
                </div>
                {exp.description && <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3 uppercase tracking-wide">Educación</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">
                      {edu.degree} en {edu.field}
                    </h3>
                    <p className="italic">{edu.institution}</p>
                    {edu.gpa && <p className="text-sm">Promedio: {edu.gpa}</p>}
                  </div>
                  <p className="text-sm">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {skills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-3 uppercase tracking-wide">Habilidades</h2>
            <div className="grid grid-cols-2 gap-2">
              {skills.map((skill) => (
                <div key={skill.id} className="text-sm">
                  <span className="font-medium">{skill.name}</span> - {skill.level}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  if (template === "creative") {
    return (
      <div className="bg-white shadow-lg max-w-4xl mx-auto print:shadow-none print-preserve-bg">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 print-preserve-bg">
          <h1 className="text-4xl font-bold mb-4">{personalInfo.fullName || "Tu Nombre"}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              {personalInfo.email && <p className="flex items-center">📧 {personalInfo.email}</p>}
              {personalInfo.phone && <p className="flex items-center">📱 {personalInfo.phone}</p>}
            </div>
            <div className="space-y-2">
              {personalInfo.address && <p className="flex items-center">📍 {personalInfo.address}</p>}
              {personalInfo.linkedin && <p className="flex items-center">💼 {personalInfo.linkedin}</p>}
            </div>
          </div>
        </div>

        <div className="p-8">
          {personalInfo.summary && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">✨</div>
                Sobre Mí
              </h2>
              <p className="text-gray-700 leading-relaxed bg-purple-50 p-4 rounded-lg">{personalInfo.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">💼</div>
                Experiencia
              </h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-6 bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-blue-800">{exp.position}</h3>
                      <p className="text-lg text-blue-600">{exp.company}</p>
                    </div>
                    <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {exp.startDate} - {exp.current ? "Presente" : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p className="text-gray-700 leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-green-600 mb-4 flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">🎓</div>
                Educación
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-4 bg-green-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-green-800">
                        {edu.degree} en {edu.field}
                      </h3>
                      <p className="text-green-600">{edu.institution}</p>
                      {edu.gpa && <p className="text-sm text-gray-600">Promedio: {edu.gpa}</p>}
                    </div>
                    <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">🚀</div>
                Habilidades
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="bg-orange-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-orange-800">{skill.name}</span>
                      <span className="bg-orange-200 text-orange-800 px-2 py-1 rounded text-sm">{skill.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return null
}
